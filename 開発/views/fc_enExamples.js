    (() => {
      "use strict";

      const fallbackExamples = [
        [
          ["planet", "惑星"],
          ["a rocky planet", "岩石惑星"],
          ["clear its orbital neighborhood", "軌道近傍を一掃する"],
          ["in the habitable zone", "ハビタブルゾーン内で"],
        ],
      ];
      const term = document.getElementById("term");
      const meaning = document.getElementById("meaning");
      const phrases = document.getElementById("phrases");

      function ensureMinPhrases(items, minimum = 3) {
        const result = Array.isArray(items) ? items.slice() : [];
        while (result.length < minimum) result.push({ en: "", ja: "" });
        return result;
      }

      function toDataset(raw) {
        if (Array.isArray(raw)) {
          return raw.map((row) => {
            if (!Array.isArray(row) || !row.length) return null;
            const pairs = row.filter((pair) => Array.isArray(pair) && pair.length >= 1);
            const head = pairs[0] || [];
            return {
              en: String(head[0] ?? ""),
              ja: String(head[1] ?? ""),
              phrases: ensureMinPhrases(pairs.slice(1).map((pair) => ({
                en: String(pair?.[0] ?? ""),
                ja: String(pair?.[1] ?? ""),
              }))),
            };
          }).filter((item) => item && item.en
            && (item.ja || item.phrases.some((phrase) => phrase.en || phrase.ja)));
        }

        if (raw && typeof raw === "object") {
          return Object.entries(raw).map(([en, value]) => ({
            en,
            ja: String(value?.ja ?? ""),
            phrases: ensureMinPhrases(
              (value?.examples ?? value?.phrases ?? value?.ex ?? []).map((phrase) => ({
                en: String(phrase?.en ?? ""),
                ja: String(phrase?.ja ?? ""),
              }))
            ),
          })).filter((item) => item.en
            && (item.ja || item.phrases.some((phrase) => phrase.en || phrase.ja)));
        }
        return [];
      }

      function normalizeBaseName(name) {
        const base = String(name).replace(/\.(json|js)$/i, "");
        return base === "quantity_degrees" ? "quantity_degree" : base;
      }

      function getRevealTotal(item) {
        let total = item?.ja ? 1 : 0;
        (item?.phrases || []).forEach((phrase) => {
          if (phrase.ja) total += 1;
        });
        return total;
      }

      FlashcardCore.create({
        onComplete: ExamView.complete,
        rewardIcon: "📚",
        reward: {
          exp: 1,
          dropChance: 1 / 3,
          rankWeights: [1],
        },
        getFiles() {
          return typeof files_enExamples !== "undefined" && Array.isArray(files_enExamples)
            ? files_enExamples
            : ["astronomy"];
        },
        async loadCategory(name, helpers) {
          const base = normalizeBaseName(name);
          await helpers.injectScript(encodeURI(`../qa_en_examples/${base}.js`));
          const raw = helpers.readGlobal(`enExamples_${helpers.toVariableSuffix(base)}`);
          const items = toDataset(raw);
          if (!items.length) throw new Error(`qa_en_examples/${base}.js にカードがありません`);
          return { category: base, items };
        },
        getFallback(error, context) {
          console.warn(error);
          return {
            category: context.name === "stub" ? "stub" : normalizeBaseName(context.name),
            items: toDataset(fallbackExamples),
          };
        },
        getRevealTotal,
        renderLoading() {
          term.textContent = "loading…";
          meaning.textContent = "";
          meaning.classList.add("is-hidden");
          phrases.replaceChildren();
        },
        renderEmpty() {
          term.textContent = "…";
          meaning.textContent = "";
          meaning.classList.add("is-hidden");
          phrases.replaceChildren();
        },
        renderItem({ item, revealStep }) {
          term.textContent = item.en;
          meaning.textContent = item.ja;
          meaning.classList.toggle("is-hidden", !item.ja || revealStep < 1);
          phrases.replaceChildren();

          let step = item.ja ? 1 : 0;
          const questionElements = [term];
          (item.phrases || []).forEach((phrase) => {
            if (!phrase.en && !phrase.ja) return;

            const line = document.createElement("div");
            line.className = "english-phrase-line";
            const english = document.createElement("div");
            english.className = "english-question";
            english.textContent = phrase.en;
            const japanese = document.createElement("div");
            japanese.className = "english-answer";
            japanese.textContent = phrase.ja;

            let answerVisible = false;
            if (phrase.ja) {
              step += 1;
              answerVisible = revealStep >= step;
            }
            japanese.classList.toggle("is-hidden", !answerVisible);
            line.append(english, japanese);
            phrases.appendChild(line);
            questionElements.push(english);
          });

          const total = getRevealTotal(item);
          if (total === 0 || revealStep >= total) {
            questionElements.forEach((element) => element.classList.add("is-active"));
            return;
          }
          questionElements.forEach((element) => element.classList.remove("is-active"));
          questionElements[Math.min(revealStep, questionElements.length - 1)]?.classList.add("is-active");
        },
      });
    })();
  
