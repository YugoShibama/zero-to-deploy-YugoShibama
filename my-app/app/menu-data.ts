// menu-data.ts
// このファイルはメニューのデータだけを管理します。

// メニュー1件あたりの「型（データの構造）」を定義（TypeScriptの強みです）
export type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;     // パスタ、メインなどのカテゴリ名
  description: string;
  badge?: string;       // ? は「無くても良い（任意）」という意味です
  imageUrl?: string;    // 画像URL（今回は仮のプレースホルダー文字列として使用）
  isSoldOut: boolean;   // 売り切れフラグ
};

// 実際のメニューデータ配列
export const menuItems: MenuItem[] = [
  // パスタ
  {
    id: 1,
    name: "Osaki Dining名物！溶岩パスタ",
    price: 1480,
    category: "パスタ",
    description: "チーズとミートソースが溢れ出す！麺の量や変更が可能です。",
    badge: "名物！人気No.1",
    imageUrl: "[シズル感のある溶岩パスタの写真]",
    isSoldOut: false,
  },
  {
    id: 2,
    name: "濃厚ウニクリームのスパゲティ",
    price: 1680,
    category: "パスタ",
    description: "磯の香りと濃厚なクリームが絶品です。",
    imageUrl: "[ウニクリームパスタの写真]",
    isSoldOut: false,
  },
  // メイン
  {
    id: 3,
    name: "厳選牛ハラミのビステッカ",
    price: 1850,
    category: "メイン",
    description: "肉の焼き加減（ミディアムレア/ミディアム）やソースをお選びいただけます。",
    badge: "おすすめ",
    imageUrl: "[ビステッカのシズル感ある写真]",
    isSoldOut: false,
  },
  {
    id: 4,
    name: "大山鶏のパリパリ岩塩焼き",
    price: 1200,
    category: "メイン",
    description: "皮はパリッと、中はジューシーに焼き上げました。",
    imageUrl: "[鶏の岩塩焼きの写真]",
    isSoldOut: true, // テスト用：売り切れ設定
  },
  // 冷菜
  {
    id: 5,
    name: "熟成プロシュートとサラミの盛合せ",
    price: 1280,
    category: "冷菜",
    description: "ハーフサイズ/レギュラーサイズの選択が可能です。",
    imageUrl: "[プロシュートの写真]",
    isSoldOut: false,
  },
  // サラダ
  {
    id: 6,
    name: "ルッコラとパルミジャーノのグリーンサラダ",
    price: 980,
    category: "サラダ",
    description: "生ハムや温玉のトッピングを追加できます。",
    badge: "ヘルシー",
    imageUrl: "[グリーンサラダの写真]",
    isSoldOut: false,
  },
  // デザート
  {
    id: 7,
    name: "自家製クラシックティラミス",
    price: 680,
    category: "デザート",
    description: "食後提供または食事と同時提供のタイミングを選択できます。",
    imageUrl: "[ティラミスの写真]",
    isSoldOut: false,
  },
  // お酒
  {
    id: 8,
    name: "ハウスワイン（赤・グラス）",
    price: 600,
    category: "お酒",
    description: "お肉の旨味を引き立てる重口の赤ワインです。",
    badge: "ペアリング推奨",
    imageUrl: "[赤ワイングラスの写真]",
    isSoldOut: false,
  },
];

// 表示するカテゴリーの順番を定義
export const categories = [
  "パスタ", "冷菜", "食事", "サラダ", "温菜", "メイン", "デザート", "お酒"
];