import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-md min-h-screen bg-zinc-950 text-zinc-50 flex flex-col sm:border sm:border-zinc-800 sm:shadow-2xl font-sans">
      
      <header className="bg-zinc-900 px-4 py-4 sticky top-0 z-20 border-b border-zinc-800 flex items-center shadow-sm">
        <Link href="/">
          <Button variant="ghost" className="text-zinc-400 hover:text-white p-0 h-auto mr-4">
            ← 戻る
          </Button>
        </Link>
        <h1 className="text-lg font-bold">カートの確認</h1>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-zinc-200 mb-2">まだ空っぽです</h2>
        <p className="text-zinc-500 text-sm mb-6">
          メニュー画面から商品を追加してください。
        </p>
        <Link href="/">
          <Button className="bg-rose-700 hover:bg-rose-600 text-white font-bold px-8">
            メニューを見る
          </Button>
        </Link>
      </main>

    </div>
  )
}