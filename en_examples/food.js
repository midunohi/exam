// Food / Drinks / Meals (exam-level) vocabulary (keyed by English term)
// Format: { ja, cat, examples:[{en, ja}...] }  (EN↔JA one-to-one, short chunks)

const enExamples_food = {
  // --- Fruits ---------------------------------------------------------
  "apple": {
    ja: "りんご",
    cat: "fruits",
    examples: [
      { en: "a crisp apple", ja: "歯ごたえのあるりんご" },
      { en: "apple pie", ja: "アップルパイ" },
      { en: "pick apples in the orchard", ja: "果樹園でりんごを収穫する" },
    ],
  },
  "banana": {
    ja: "バナナ",
    cat: "fruits",
    examples: [
      { en: "a ripe banana", ja: "熟したバナナ" },
      { en: "peel a banana", ja: "バナナの皮をむく" },
      { en: "bananas grow in clusters", ja: "バナナは房で育つ" },
    ],
  },
  "orange": {
    ja: "オレンジ",
    cat: "fruits",
    examples: [
      { en: "freshly squeezed orange juice", ja: "しぼりたてのオレンジジュース" },
      { en: "peel an orange", ja: "オレンジの皮をむく" },
      { en: "an orange tree", ja: "オレンジの木" },
    ],
  },
  "grape": {
    ja: "ぶどう",
    cat: "fruits",
    examples: [
      { en: "a bunch of grapes", ja: "一房のぶどう" },
      { en: "a grape vineyard", ja: "ぶどう畑" },
      { en: "make wine from grapes", ja: "ぶどうからワインを作る" },
    ],
  },
  "strawberry": {
    ja: "いちご",
    cat: "fruits",
    examples: [
      { en: "strawberry jam", ja: "いちごジャム" },
      { en: "a strawberry shortcake", ja: "いちごのショートケーキ" },
      { en: "pick strawberries", ja: "いちごを摘む" },
    ],
  },
  "peach": {
    ja: "もも",
    cat: "fruits",
    examples: [
      { en: "a juicy peach", ja: "みずみずしいもも" },
      { en: "a peach orchard", ja: "ももの果樹園" },
      { en: "peel / slice / serve", ja: "皮をむく／切る／盛りつける" },
    ],
  },
  "pear": {
    ja: "なし",
    cat: "fruits",
    examples: [
      { en: "a sweet pear", ja: "甘いなし" },
      { en: "slice a pear", ja: "なしを薄切りにする" },
      { en: "a delicate aroma", ja: "上品な香り" },
    ],
  },
  "cherry": {
    ja: "さくらんぼ",
    cat: "fruits",
    examples: [
      { en: "a bowl of cherries", ja: "さくらんぼ一皿" },
      { en: "pit a cherry", ja: "さくらんぼの種を取る" },
      { en: "cherry blossoms", ja: "桜の花" },
    ],
  },
  "pineapple": {
    ja: "パイナップル",
    cat: "fruits",
    examples: [
      { en: "fresh pineapple", ja: "新鮮なパイナップル" },
      { en: "peel a pineapple", ja: "パイナップルの皮をむく" },
      { en: "pineapple juice", ja: "パイナップルジュース" },
    ],
  },
  "watermelon": {
    ja: "すいか",
    cat: "fruits",
    examples: [
      { en: "slice a watermelon", ja: "すいかを切る" },
      { en: "seedless watermelon", ja: "種なしすいか" },
      { en: "a refreshing snack", ja: "さっぱりした軽食" },
    ],
  },
  "blueberry": {
    ja: "ブルーベリー",
    cat: "fruits",
    examples: [
      { en: "pick blueberries", ja: "ブルーベリーを摘む" },
      { en: "blueberry jam", ja: "ブルーベリージャム" },
      { en: "blueberry muffin", ja: "ブルーベリーマフィン" },
    ],
  },
  "lemon": {
    ja: "レモン",
    cat: "fruits",
    examples: [
      { en: "a slice of lemon", ja: "レモンのスライス" },
      { en: "add a dash of lemon", ja: "レモンを少し加える" },
      { en: "a sharp sourness", ja: "きりっとした酸味" },
    ],
  },
  "mango": {
    ja: "マンゴー",
    cat: "fruits",
    examples: [
      { en: "a ripe mango", ja: "熟したマンゴー" },
      { en: "mango smoothie", ja: "マンゴースムージー" },
      { en: "peel a mango", ja: "マンゴーの皮をむく" },
    ],
  },
  "kiwi": {
    ja: "キウイ",
    cat: "fruits",
    examples: [
      { en: "kiwi fruit", ja: "キウイフルーツ" },
      { en: "peel a kiwi", ja: "キウイの皮をむく" },
      { en: "thin kiwi slices", ja: "薄いキウイの輪切り" },
    ],
  },

  // --- Vegetables -----------------------------------------------------
  "carrot": {
    ja: "にんじん",
    cat: "vegetables",
    examples: [
      { en: "grated carrot", ja: "すりおろしにんじん" },
      { en: "carrot sticks", ja: "にんじんスティック" },
      { en: "harvest carrots", ja: "にんじんを収穫する" },
    ],
  },
  "potato": {
    ja: "じゃがいも",
    cat: "vegetables",
    examples: [
      { en: "mashed potatoes", ja: "マッシュポテト" },
      { en: "a baked potato", ja: "ベイクドポテト" },
      { en: "potato chips", ja: "ポテトチップス" },
    ],
  },
  "onion": {
    ja: "たまねぎ",
    cat: "vegetables",
    examples: [
      { en: "chop an onion", ja: "玉ねぎを刻む" },
      { en: "caramelized onions", ja: "飴色の玉ねぎ" },
      { en: "onion soup", ja: "オニオンスープ" },
    ],
  },
  "tomato": {
    ja: "トマト",
    cat: "vegetables",
    examples: [
      { en: "slice a tomato", ja: "トマトをスライスする" },
      { en: "tomato soup", ja: "トマトスープ" },
      { en: "tomato ketchup", ja: "トマトケチャップ" },
    ],
  },
  "cucumber": {
    ja: "きゅうり",
    cat: "vegetables",
    examples: [
      { en: "fresh cucumber", ja: "新鮮なきゅうり" },
      { en: "peel a cucumber", ja: "きゅうりの皮をむく" },
      { en: "cucumber salad", ja: "きゅうりのサラダ" },
    ],
  },
  "eggplant": {
    ja: "なす",
    cat: "vegetables",
    examples: [
      { en: "grilled eggplant", ja: "焼きナス" },
      { en: "fried eggplant", ja: "揚げナス" },
      { en: "peel an eggplant", ja: "ナスの皮をむく" },
    ],
  },
  "spinach": {
    ja: "ほうれん草",
    cat: "vegetables",
    examples: [
      { en: "boil spinach", ja: "ほうれん草をゆでる" },
      { en: "spinach salad", ja: "ほうれん草サラダ" },
      { en: "rich in iron", ja: "鉄分が豊富だ" },
    ],
  },
  "cabbage": {
    ja: "キャベツ",
    cat: "vegetables",
    examples: [
      { en: "shredded cabbage", ja: "千切りキャベツ" },
      { en: "cabbage rolls", ja: "ロールキャベツ" },
      { en: "cabbage soup", ja: "キャベツスープ" },
    ],
  },
  "broccoli": {
    ja: "ブロッコリー",
    cat: "vegetables",
    examples: [
      { en: "steam broccoli", ja: "ブロッコリーを蒸す" },
      { en: "boil broccoli", ja: "ブロッコリーをゆでる" },
      { en: "broccoli salad", ja: "ブロッコリーサラダ" },
    ],
  },
  "cauliflower": {
    ja: "カリフラワー",
    cat: "vegetables",
    examples: [
      { en: "steam cauliflower", ja: "カリフラワーを蒸す" },
      { en: "roast cauliflower", ja: "カリフラワーを焼く" },
      { en: "cauliflower rice", ja: "カリフラワーライス" },
    ],
  },
  "lettuce": {
    ja: "レタス",
    cat: "vegetables",
    examples: [
      { en: "wash lettuce", ja: "レタスを洗う" },
      { en: "lettuce leaves", ja: "レタスの葉" },
      { en: "lettuce salad", ja: "レタスサラダ" },
    ],
  },
  "mushroom": {
    ja: "きのこ",
    cat: "vegetables",
    examples: [
      { en: "wild mushrooms", ja: "野生のきのこ" },
      { en: "slice mushrooms", ja: "きのこを薄切りにする" },
      { en: "mushroom soup", ja: "きのこスープ" },
    ],
  },
  "sweet potato": {
    ja: "さつまいも",
    cat: "vegetables",
    examples: [
      { en: "roasted sweet potato", ja: "焼きいも" },
      { en: "sweet potato fries", ja: "さつまいもフライ" },
      { en: "steam sweet potatoes", ja: "さつまいもを蒸す" },
    ],
  },
  "green pepper": {
    ja: "ピーマン",
    cat: "vegetables",
    examples: [
      { en: "chop green peppers", ja: "ピーマンを刻む" },
      { en: "green pepper slices", ja: "ピーマンの薄切り" },
      { en: "stuffed green peppers", ja: "ピーマンの肉詰め" },
    ],
  },

  // --- Drinks ---------------------------------------------------------
  "water": {
    ja: "水",
    cat: "drinks",
    examples: [
      { en: "a glass of water", ja: "一杯の水" },
      { en: "stay hydrated", ja: "水分補給をする" },
      { en: "boil water", ja: "水を沸かす" },
    ],
  },
  "tea": {
    ja: "お茶",
    cat: "drinks",
    examples: [
      { en: "tea leaves", ja: "茶葉" },
      { en: "brew tea", ja: "お茶を淹れる" },
      { en: "iced tea", ja: "アイスティー" },
    ],
  },
  "coffee": {
    ja: "コーヒー",
    cat: "drinks",
    examples: [
      { en: "black coffee", ja: "ブラックコーヒー" },
      { en: "instant coffee", ja: "インスタントコーヒー" },
      { en: "a strong aroma", ja: "強い香り" },
    ],
  },
  "milk": {
    ja: "牛乳",
    cat: "drinks",
    examples: [
      { en: "a glass of milk", ja: "一杯の牛乳" },
      { en: "warm milk", ja: "温かい牛乳" },
      { en: "soy milk", ja: "豆乳" },
    ],
  },
  "juice": {
    ja: "ジュース",
    cat: "drinks",
    examples: [
      { en: "fruit juice", ja: "フルーツジュース" },
      { en: "fresh-squeezed juice", ja: "しぼりたてジュース" },
      { en: "grape juice", ja: "ぶどうジュース" },
    ],
  },
  "soda": {
    ja: "炭酸飲料",
    cat: "drinks",
    examples: [
      { en: "a bottle of soda", ja: "炭酸飲料のボトル" },
      { en: "soda with ice", ja: "氷入りのソーダ" },
      { en: "cut down on soda", ja: "炭酸飲料を控える" },
    ],
  },
  "sports drink": {
    ja: "スポーツドリンク",
    cat: "drinks",
    examples: [
      { en: "rehydrate with a sports drink", ja: "スポーツドリンクで水分補給する" },
      { en: "an isotonic drink", ja: "アイソトニック飲料" },
      { en: "restore electrolytes", ja: "電解質を補う" },
    ],
  },
  "green tea": {
    ja: "緑茶",
    cat: "drinks",
    examples: [
      { en: "brew green tea", ja: "緑茶を淹れる" },
      { en: "hot green tea", ja: "温かい緑茶" },
      { en: "a slightly bitter taste", ja: "やや渋い味" },
    ],
  },
  "black tea": {
    ja: "紅茶",
    cat: "drinks",
    examples: [
      { en: "brew black tea", ja: "紅茶を淹れる" },
      { en: "black tea with milk", ja: "ミルクティー" },
      { en: "iced black tea", ja: "アイスティー（紅茶）" },
    ],
  },
  "smoothie": {
    ja: "スムージー",
    cat: "drinks",
    examples: [
      { en: "blend a smoothie", ja: "スムージーを作る" },
      { en: "a fruit smoothie", ja: "フルーツスムージー" },
      { en: "a green smoothie", ja: "グリーンスムージー" },
    ],
  },

  // --- Meals ----------------------------------------------------------
  "breakfast": {
    ja: "朝食",
    cat: "meals",
    examples: [
      { en: "skip breakfast", ja: "朝食を抜く" },
      { en: "have breakfast", ja: "朝食をとる" },
      { en: "a well-balanced breakfast", ja: "バランスのよい朝食" },
    ],
  },
  "lunch": {
    ja: "昼食",
    cat: "meals",
    examples: [
      { en: "have lunch", ja: "昼食をとる" },
      { en: "a lunch break", ja: "昼休み" },
      { en: "pack lunch", ja: "弁当を作る" },
    ],
  },
  "dinner": {
    ja: "夕食",
    cat: "meals",
    examples: [
      { en: "make dinner", ja: "夕食を作る" },
      { en: "eat dinner", ja: "夕食を食べる" },
      { en: "sit down to dinner", ja: "夕食につく" },
    ],
  },
  "salad": {
    ja: "サラダ",
    cat: "meals",
    examples: [
      { en: "a fresh salad", ja: "新鮮なサラダ" },
      { en: "salad dressing", ja: "サラダドレッシング" },
      { en: "toss the salad", ja: "サラダを和える" },
    ],
  },
  "sandwich": {
    ja: "サンドイッチ",
    cat: "meals",
    examples: [
      { en: "make a sandwich", ja: "サンドイッチを作る" },
      { en: "a ham sandwich", ja: "ハムサンド" },
      { en: "grab a quick sandwich", ja: "さっとサンドイッチを買って済ませる" },
    ],
  },
  "soup": {
    ja: "スープ",
    cat: "meals",
    examples: [
      { en: "hot soup", ja: "温かいスープ" },
      { en: "vegetable soup", ja: "野菜スープ" },
      { en: "a hearty soup", ja: "食べごたえのあるスープ" },
    ],
  },
  "rice": {
    ja: "ご飯",
    cat: "meals",
    examples: [
      { en: "steamed rice", ja: "白ご飯" },
      { en: "fried rice", ja: "チャーハン" },
      { en: "a rice ball", ja: "おにぎり" },
    ],
  },
  "noodles": {
    ja: "麺類",
    cat: "meals",
    examples: [
      { en: "instant noodles", ja: "インスタントラーメン" },
      { en: "noodle soup", ja: "麺のスープ" },
      { en: "cold noodles", ja: "冷やし麺" },
    ],
  },
  "curry": {
    ja: "カレー",
    cat: "meals",
    examples: [
      { en: "curry rice", ja: "カレーライス" },
      { en: "spicy curry", ja: "辛いカレー" },
      { en: "a rich flavor", ja: "こくのある味" },
    ],
  },
  "grilled fish": {
    ja: "焼き魚",
    cat: "meals",
    examples: [
      { en: "grill the fish", ja: "魚を焼く" },
      { en: "grilled mackerel", ja: "サバの塩焼き" },
      { en: "seasoned grilled fish", ja: "味付けした焼き魚" },
    ],
  },
  "fried chicken": {
    ja: "から揚げ",
    cat: "meals",
    examples: [
      { en: "crispy fried chicken", ja: "カリッとしたから揚げ" },
      { en: "marinate the chicken", ja: "鶏肉を下味に漬け込む" },
      { en: "bite-sized pieces", ja: "一口サイズ" },
    ],
  },
  "tofu": {
    ja: "豆腐",
    cat: "meals",
    examples: [
      { en: "chilled tofu", ja: "冷ややっこ" },
      { en: "tofu soup", ja: "豆腐のスープ" },
      { en: "stir-fry tofu", ja: "豆腐を炒める" },
    ],
  },
  "omelet": {
    ja: "オムレツ",
    cat: "meals",
    examples: [
      { en: "make an omelet", ja: "オムレツを作る" },
      { en: "a fluffy omelet", ja: "ふわふわのオムレツ" },
      { en: "a cheese omelet", ja: "チーズオムレツ" },
    ],
  },
};
