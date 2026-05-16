import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    // max-w-md と mx-auto でスマホ幅（約400px以下）を再現し、画面中央に配置
    <div className="mx-auto max-w-md min-h-screen bg-gray-50 flex flex-col relative shadow-md">
      
      {/* 1. ヘッダー（上部に固定） */}
      <header className="bg-white border-b p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center">OSAKI 亭</h1>
      </header>

      {/* 2. メイン：メニュー表示エリア（中身は仮） */}
      {/* 下部のボタンに被らないよう pb-24 で余白を確保 */}
      <main className="flex-1 p-4 space-y-4 pb-24">
        <h2 className="text-sm font-semibold text-gray-500 mb-2">おすすめメニュー</h2>
        
        {/* ダミーのメニューアイテム（Cardコンポーネントを使用） */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">特製醤油ラーメン</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex justify-between items-center">
            <p className="text-sm font-medium">¥850</p>
            <Button variant="outline" size="sm">追加</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">自家製焼き餃子（5個）</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex justify-between items-center">
            <p className="text-sm font-medium">¥400</p>
            <Button variant="outline" size="sm">追加</Button>
          </CardContent>
        </Card>
      </main>

      {/* 3. フッター：注文導線（下部に固定） */}
      <footer className="bg-white border-t p-4 sticky bottom-0 z-10 w-full">
        {/* h-14 (56px) で指で押しやすいサイズを確保。w-full で横幅いっぱいにする */}
        <Button className="w-full h-14 text-lg font-bold">
          注文リストを見る
        </Button>
      </footer>

    </div>
  )
}