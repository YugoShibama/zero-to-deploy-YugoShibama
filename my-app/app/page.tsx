import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { menuItems, categories } from "./menu-data"

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-md min-h-screen bg-zinc-950 text-zinc-50 flex flex-col relative sm:border sm:border-zinc-800 sm:shadow-2xl font-sans scroll-smooth">

      <header className="bg-zinc-900 px-4 pt-4 pb-2 sticky top-0 z-20 border-b border-zinc-800 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-lg font-bold tracking-wider">Osaki Dining</h1>
          <span className="bg-emerald-900/50 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-800">
            ただいま受付中
          </span>
        </div>

        {/* 修正：aタグに変更し、href="#カテゴリ名" でページ内リンクを実装 */}
        <div className="flex space-x-5 overflow-x-auto pb-2 text-sm font-medium [&::-webkit-scrollbar]:hidden mt-2">
          {categories.map((cat, index) => (
            <a 
              key={index} 
              href={`#${cat}`} // ここをクリックすると該当のidを持つ場所へ移動します
              className={`pb-1 whitespace-nowrap cursor-pointer transition-colors ${
                index === 0 
                  ? "border-b-2 border-rose-600 text-rose-500" 
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {cat}
            </a>
          ))}
        </div>
      </header>

      <main className="flex-1 p-4 space-y-8 pb-24">
        
        {categories.map((categoryName, index) => {
          const itemsInCategory = menuItems.filter(item => item.category === categoryName);
          if (itemsInCategory.length === 0) return null;

          return (
            // 修正：sectionに id={categoryName} を追加し、タブからの移動先に設定
            <section key={index} id={categoryName} className="space-y-4 scroll-mt-32">
              <h2 className="text-lg font-bold text-zinc-200 border-l-4 border-rose-600 pl-2">
                {categoryName}
              </h2>

              {itemsInCategory.map((item) => (
                <Card key={item.id} className={`overflow-hidden border-zinc-800 shadow-xl border-0 ${item.isSoldOut ? 'bg-zinc-900/50 opacity-75' : 'bg-zinc-900'}`}>
                  <div className="h-32 bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs relative">
                    {item.imageUrl}
                    {item.badge && !item.isSoldOut && (
                      <span className="absolute top-2 left-2 bg-rose-700 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow">
                        {item.badge}
                      </span>
                    )}
                    {item.isSoldOut && (
                      <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg tracking-widest backdrop-blur-[1px]">
                        SOLD OUT
                      </span>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <h3 className="font-bold text-base text-zinc-100">{item.name}</h3>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-lg text-white">¥{item.price.toLocaleString()}</span>
                      {/* 修正：ボタンの文字を「商品をカートに入れる」に変更 */}
                      <Button 
                        size="sm" 
                        disabled={item.isSoldOut}
                        className={item.isSoldOut ? "bg-zinc-700 text-zinc-400" : "bg-rose-700 hover:bg-rose-600 text-white font-bold px-4"}
                      >
                        {item.isSoldOut ? "売り切れ" : "カートに入れる"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>
          )
        })}

      </main>

      <footer className="bg-zinc-900 border-t border-zinc-800 p-4 sticky bottom-0 z-20 w-full">
        <Link href="/cart" className="w-full block">
          <Button className="w-full h-14 text-base font-bold flex justify-between items-center px-6 shadow-lg bg-rose-700 hover:bg-rose-600 text-white border-0">
            <span className="bg-black/30 px-2 py-1 rounded text-sm">2</span>
            <span>カートを確認する</span>
            <span>¥2,080</span>
          </Button>
        </Link>
      </footer>

    </div>
  )
}