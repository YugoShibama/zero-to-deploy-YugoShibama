import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    // ダークテーマ（bg-zinc-950/text-zinc-50）を基調とし、スマホサイズ（max-w-[375px]）に固定
    <div className="mx-auto w-full max-w-[375px] min-h-screen bg-zinc-950 text-zinc-50 flex flex-col relative sm:border sm:border-zinc-800 sm:shadow-2xl font-sans">

      {/* 【要件1】ヘッダー：店舗情報・受取方法選択 */}
      <header className="bg-zinc-900 px-4 pt-4 pb-2 sticky top-0 z-20 border-b border-zinc-800 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-lg font-bold tracking-wider">Italian Bar Attachment</h1>
          {/* 営業状態の視覚的なバッジ */}
          <span className="bg-emerald-900/50 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-800">
            ただいま受付中
          </span>
        </div>

        {/* 利用シーン選択トグル（ダーク仕様） */}
        <div className="flex bg-zinc-950 p-1 rounded-lg mb-3 border border-zinc-800">
          <button className="flex-1 bg-zinc-800 text-rose-500 text-xs font-bold py-2 rounded shadow-sm">テイクアウト</button>
          <button className="flex-1 text-zinc-500 text-xs font-bold py-2 rounded">デリバリー</button>
          <button className="flex-1 text-zinc-500 text-xs font-bold py-2 rounded">店内注文</button>
        </div>

        {/* 【要件2】メニューカテゴリ・ナビゲーション（8カテゴリ） */}
        <div className="flex space-x-5 overflow-x-auto pb-2 text-sm font-medium [&::-webkit-scrollbar]:hidden">
          <span className="border-b-2 border-rose-600 pb-1 whitespace-nowrap text-rose-500">パスタ</span>
          <span className="text-zinc-400 whitespace-nowrap cursor-pointer">冷菜</span>
          <span className="text-zinc-400 whitespace-nowrap cursor-pointer">食事</span>
          <span className="text-zinc-400 whitespace-nowrap cursor-pointer">サラダ</span>
          <span className="text-zinc-400 whitespace-nowrap cursor-pointer">温菜</span>
          <span className="text-zinc-400 whitespace-nowrap cursor-pointer">メイン</span>
          <span className="text-zinc-400 whitespace-nowrap cursor-pointer">デザート</span>
          <span className="text-zinc-400 whitespace-nowrap cursor-pointer">お酒</span>
        </div>
      </header>

      {/* メイン：メニュー閲覧 */}
      <main className="flex-1 p-4 space-y-5 pb-24">
        
        {/* メニュー1: パスタ */}
        <Card className="overflow-hidden border-zinc-800 bg-zinc-900 shadow-xl border-0">
          <div className="h-36 bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs relative">
            [シズル感のある溶岩パスタの写真]
            {/* 強調ラベル */}
            <span className="absolute top-2 left-2 bg-rose-700 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow">
              名物！人気No.1
            </span>
          </div>
          <CardContent className="p-4">
            <div className="mb-2">
              <h3 className="font-bold text-base text-zinc-100">attachment名物！溶岩パスタ</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                チーズとミートソースが溢れ出す！麺の量（普通/大盛り）や低糖質ロカボ麺への変更が可能です。
              </p>
            </div>
            {/* 【要件3】商品カスタマイズへの導線 */}
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-lg text-white">¥1,480</span>
              <Button size="sm" className="bg-rose-700 hover:bg-rose-600 text-white font-bold px-4">
                オプション選択
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* メニュー2: メイン（ペアリング提案付き） */}
        <Card className="overflow-hidden border-zinc-800 bg-zinc-900 shadow-xl border-0">
          <div className="h-36 bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs relative">
            [ビステッカのシズル感ある写真]
          </div>
          <CardContent className="p-4">
            <div className="mb-2">
              <h3 className="font-bold text-base text-zinc-100">厳選牛ハラミのビステッカ</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                肉の焼き加減（ミディアムレア/ミディアム）やソースをお選びいただけます。
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-lg text-white">¥1,850</span>
              <Button size="sm" className="bg-rose-700 hover:bg-rose-600 text-white font-bold px-4">
                オプション選択
              </Button>
            </div>
            
            {/* 【要件3】クロスセル・インテリジェントペアリング */}
            <div className="mt-4 pt-3 border-t border-zinc-800">
              <p className="text-[10px] text-zinc-400 mb-2">おすすめのペアリング（+1タップで追加）</p>
              <div className="flex items-center justify-between bg-zinc-950 p-2 rounded border border-zinc-800">
                <div>
                  <p className="text-xs font-bold text-zinc-200">重口赤ワイン（グラス）</p>
                  <p className="text-[10px] text-zinc-500">お肉の旨味を引き立てます</p>
                </div>
                <Button size="sm" variant="outline" className="h-6 text-[10px] border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
                  + 追加 (¥600)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </main>

      {/* 【要件4】カート・注文内容確認への導線（下部固定） */}
      <footer className="bg-zinc-900 border-t border-zinc-800 p-4 sticky bottom-0 z-20 w-full">
        {/* ボタンもワインレッドで統一 */}
        <Button className="w-full h-14 text-base font-bold flex justify-between items-center px-6 shadow-lg bg-rose-700 hover:bg-rose-600 text-white border-0">
          <span className="bg-black/30 px-2 py-1 rounded text-sm">2</span>
          <span>カートを確認する</span>
          <span>¥2,080</span>
        </Button>
      </footer>

    </div>
  )
}