// menu-data.ts

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  badge?: string;
  imageUrl?: string;
  isSoldOut: boolean;
};

export const menuItems: MenuItem[] = [
  // パスタ
  { 
    id: 1, 
    name: "Osaki Dining名物！溶岩パスタ", 
    price: 1480, 
    category: "パスタ", 
    description: "チーズとミートソースが溢れ出す！", 
    badge: "人気No.1", 
    // ▼ ここに指定された画像ファイル名を設定しました ▼
    imageUrl: "/images/lava-pasta.png", 
    isSoldOut: false 
  },
  { id: 2, name: "濃厚ウニクリームのスパゲティ", price: 1680, category: "パスタ", description: "磯の香りと濃厚なクリームが絶品。", imageUrl: "/images/ebi_pasta.png",  isSoldOut: false },
  { id: 3, name: "自家製ベーコンのアマトリチャーナ", price: 1280, category: "パスタ", description: "玉ねぎの甘みとベーコンの旨味が特徴です。", imageUrl: "/images/3.png", isSoldOut: false },

  // 冷菜
  { id: 4, name: "熟成プロシュートとサラミの盛合せ", price: 1280, category: "冷菜", description: "ワインのお供に最適です。", imageUrl: "/images/4.png", isSoldOut: false },
  { id: 5, name: "丸ごとブッラータチーズとトマトのカプレーゼ", price: 1580, category: "冷菜", description: "新鮮なトマトと濃厚チーズの相性抜群。", badge: "おすすめ", imageUrl: "/images/5.png", isSoldOut: false },
  { id: 6, name: "真鯛とカラスミのカルパッチョ", price: 1100, category: "冷菜", description: "さっぱりとした白身魚にカラスミの塩気を。", imageUrl: "/images/6.png", isSoldOut: false },

  // 食事 (Pizza / Riso)
  { id: 7, name: "王道マルゲリータピッツァ", price: 1380, category: "食事", description: "モッツァレラとバジルのシンプルなピザ。", imageUrl: "/images/7.png", isSoldOut: false },
  { id: 8, name: "ポルチーニ茸とトリュフのクリームリゾット", price: 1780, category: "食事", description: "芳醇な香りが広がる贅沢なリゾット。", badge: "シェフのイチオシ", imageUrl: "/images/8.png", isSoldOut: true },

  // サラダ
  { id: 9, name: "ルッコラとパルミジャーノのサラダ", price: 980, category: "サラダ", description: "生ハムや温玉のトッピングを追加できます。", badge: "ヘルシー", imageUrl: "/images/9.png", isSoldOut: false },
  { id: 10, name: "ロメインレタスのクラシックシーザーサラダ", price: 1080, category: "サラダ", description: "特製ドレッシングとクルトンの食感。", imageUrl: "/images/10.png", isSoldOut: false },

  // 温菜
  { id: 11, name: "海老とマッシュルームのアヒージョ", price: 980, category: "温菜", description: "辛さレベル（普通・辛口・激辛）が選べます。", imageUrl: "/images/11.png", isSoldOut: false },
  { id: 12, name: "トリッパ（牛ハチノス）のトマト煮込み", price: 880, category: "温菜", description: "じっくり煮込んだイタリアのモツ煮。", imageUrl: "/images/12.png", isSoldOut: false },

  // メイン
  { id: 13, name: "厳選牛ハラミのビステッカ", price: 1850, category: "メイン", description: "肉の焼き加減（ミディアムレア/ミディアム）を選べます。", badge: "おすすめ", imageUrl: "/images/13.png", isSoldOut: false },
  { id: 14, name: "大山鶏のパリパリ岩塩焼き", price: 1200, category: "メイン", description: "皮はパリッと、中はジューシーに。", imageUrl: "/images/14.png", isSoldOut: false },

  // デザート
  { id: 15, name: "自家製クラシックティラミス", price: 680, category: "デザート", description: "食後提供または食事と同時提供を選べます。", imageUrl: "/images/15.png", isSoldOut: false },

  // お酒
  { id: 16, name: "ハウスワイン（赤・グラス）", price: 600, category: "お酒", description: "お肉の旨味を引き立てる重口の赤ワイン。", badge: "ペアリング推奨", imageUrl: "/images/16.png", isSoldOut: false },
  { id: 17, name: "自家製サングリア（赤）", price: 650, category: "お酒", description: "フルーツたっぷりの甘口ワイン。", imageUrl: "/images/17.png", isSoldOut: false },
  { id: 18, name: "生ビール（プレミアムモルツ）", price: 650, category: "お酒", description: "冷えたグラスでご提供します。", imageUrl: "/images/18.png", isSoldOut: false },
];

export const categories = [
  "パスタ", "冷菜", "食事", "サラダ", "温菜", "メイン", "デザート", "お酒"
];