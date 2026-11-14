    (() => {
      "use strict";

      const fallbackProblems = [
        ["\\(x^2\\) の微分は？", "\\(2x\\)"],
        ["\\(\\int_0^1 x\\,dx\\) は？", "\\(\\frac{1}{2}\\)"],
        ["\\(\\sin^2 x + \\cos^2 x\\) は？", "\\(1\\)"],
      ];
      const question = document.getElementById("problemQuestion");
      const answer = document.getElementById("problemAnswer");

      function normalizeNewlines(value) {
        return String(value ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      }

      function hasDelimitedMath(value) {
        const source = normalizeNewlines(value);
        return [
          /\\\([\s\S]*?\\\)/,
          /\\\[[\s\S]*?\\\]/,
          /\$\$[\s\S]*?\$\$/,
          /(^|[^\\$])\$(?!\$)(?:\\.|[^$\n])+\$(?!\$)/
        ].some((pattern) => pattern.test(source));
      }

      function toMathJaxSource(value, implicitMath) {
        const source = normalizeNewlines(value);
        if (!source.trim()) return "\\(\\vphantom{x}\\)";
        return !implicitMath || hasDelimitedMath(source) ? source : `\\(${source}\\)`;
      }

      function setMathJaxContent(element, value, implicitMath) {
        element.replaceChildren();
        normalizeNewlines(value).split("\n").forEach((sourceLine) => {
          const line = document.createElement("div");
          line.className = "tex-card-line";
          line.textContent = sourceLine
            ? toMathJaxSource(sourceLine, implicitMath)
            : "\\(\\vphantom{x}\\)";
          element.append(line);
        });
      }

      function setCardText(questionValue, answerValue, typesetMath = false, implicitMath = true) {
        if (window.MathJax?.typesetClear) {
          window.MathJax.typesetClear([question, answer]);
        }
        if (typesetMath) {
          setMathJaxContent(question, questionValue, implicitMath);
          setMathJaxContent(answer, answerValue, implicitMath);
          return;
        }
        question.textContent = normalizeNewlines(questionValue);
        answer.textContent = normalizeNewlines(answerValue);
      }

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      async function waitForMathJax(maxMs = 5000) {
        const startedAt = performance.now();
        while (performance.now() - startedAt < maxMs) {
          if (window.MathJax?.typesetPromise && window.MathJax?.startup?.promise) {
            await window.MathJax.startup.promise;
            return window.MathJax;
          }
          await delay(25);
        }
        return null;
      }

      async function typeset(elements) {
        const mathJax = await waitForMathJax();
        if (!mathJax) return;
        await mathJax.typesetPromise(elements);
      }

      let questionLayoutKey;
      FlashcardCore.create({        onComplete: ExamView.complete,
        rewardIcon: "📖",
        reward: {
          exp: 1,
          dropChance: 1 / 3,
          rankWeights: [1],
        },
        getFiles() {
          if (typeof files_qaMathTree !== "undefined"
              && Array.isArray(files_qaMathTree)
              && typeof flattenQaFiles === "function") {
            return flattenQaFiles(files_qaMathTree);
          }
          return typeof files_qaMath !== "undefined" && Array.isArray(files_qaMath)
            ? files_qaMath
            : [];
        },
        async loadCategory(name, helpers) {
          if (name === "stub") throw new Error("qa_tex/files.js にカテゴリがありません");
          const base = String(name).replace(/\.js$/i, "");
          const variableBase = base.split(/[\\/]/).pop();
          await helpers.injectScript(encodeURI(`../qa_tex/${base}.js`));
          const items = helpers.readGlobal(`qa_${variableBase}`);
          if (!Array.isArray(items) || !items.length) {
            throw new Error(`qa_tex/${base}.js にカードがありません`);
          }
          return { category: base, items };
        },
        getFallback(error) {
          console.warn(error);
          return { category: "stub", items: fallbackProblems };
        },
        getRevealTotal: () => 1,
        renderLoading() {
          setCardText("loading…", "");
          answer.classList.add("is-hidden");
        },
        renderEmpty() {
          setCardText("…", "");
          answer.classList.add("is-hidden");
        },
        async renderItem({ item, revealStep, state }) {
          // 英文は通常の文章として扱い、区切りのある数式だけを描画する。
          setCardText(item?.[0], item?.[1], true, !String(state.category).startsWith("英語/"));
          answer.classList.toggle("is-hidden", revealStep < 1);
          await typeset([question, answer]);
          if (revealStep === 0) questionLayoutKey = {};
          ExamView.fitQuestion(document.getElementById("flashcard"), questionLayoutKey, ".tex-card-content");
        },
      });
    })();
  
