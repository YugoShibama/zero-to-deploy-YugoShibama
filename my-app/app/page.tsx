'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { menuItems, categories, MenuItem } from "./menu-data"

export default function Home() {
  // --- 状態（State）の定義 ---
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // --- スクロール連動機能（Scroll Spy） ---
  useEffect(() => {
    const handleScroll = () => {
      let current = categories[0];
      for (const cat of categories) {
        const element = document.getElementById(cat);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = cat;
          }
        }
      }
      setActiveCategory(current);
    };

    if (!isCartOpen) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isCartOpen]);

  // --- 計算・処理関数 ---
  const handleAddToCart = (item: MenuItem) => {
    if (item.isSoldOut) {
      setErrorMessage(`${item.name} は現在売り切れです。`);
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    setCart((prev) => {
      const existing = prev.find((p) => p.item.id === item.id);
      if (existing) {
        return prev.map((p) => p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((p) => p.item.id === itemId ? { ...p, quantity: p.quantity - 1 } : p);
      }
      return prev.filter((p) => p.item.id !== itemId);
    });
  };

  const calculateTotal = () => cart.reduce((sum, c) => sum + (c.item.price * c.quantity), 0);
  const calculateTotalQuantity = () => cart.reduce((sum, c) => sum + c.quantity, 0);
  const calculateSplit = () => {
    const total = calculateTotal();
    if (!peopleCount || peopleCount <= 0) return total;
    return Math.ceil(total / peopleCount);
  };

  // ==============================================================
  // 画面A：カート画面（isCartOpen === true の時の表示）
  // ==============================================================
  if (isCartOpen) {
    return (
      <div className="mx-auto w-full max-w-md min-h-screen bg-zinc-950 text-zinc-50 flex flex-col relative sm:border sm:border-zinc-800 sm:shadow-2xl font-sans">
        <header className="bg-zinc-900 px-4 py-4 sticky top-0 z-20 border-b border-zinc-800 flex items-center shadow-sm">
          <Button variant="ghost" onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-white p-0 h-auto mr-4">
            ← 戻る
          </Button>
          <h1 className="text-lg font-bold">注文リスト</h1>
        </header>

        <main className="flex-1 p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-zinc-500 mb-4">カートは空です。</p>
              <Button onClick={() => setIsCartOpen(false)} className="bg-rose-700 hover:bg-rose-600 text-white px-8 border-0">
                メニューを見る
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((c) => (
                <div key={c.item.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <div>
                    <h3 className="font-bold text-sm text-zinc-100">{c.item.name}</h3>
                    <p className="text-rose-500 font-bold mt-1">¥{c.item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-3 bg-zinc-950 rounded p-1 border border-zinc-800">
                    <button onClick={() => handleRemoveFromCart(c.item.id)} className="w-8 h-8 flex items-center justify-center text-zinc-400 font-bold hover:text-white">-</button>
                    <span className="w-4 text-center text-sm font-bold">{c.quantity}</span>
                    <button onClick={() => handleAddToCart(c.item)} className="w-8 h-8 flex items-center justify-center text-zinc-400 font-bold hover:text-white">+</button>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-zinc-800 pt-4 mt-8">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>合計金額</span>
                  <span className="text-rose-500">¥{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </main>

        {cart.length > 0 && (
          <footer className="bg-zinc-900 border-t border-zinc-800 p-4 sticky bottom-0 z-20 w-full">
            <Button className="w-full h-14 text-lg font-bold shadow-lg bg-rose-700 hover:bg-rose-600 text-white border-0" onClick={() => alert("注文を送信しました！（モック機能）")}>
              注文を確定する
            </Button>
          </footer>
        )}
      </div>
    );
  }

  // ==============================================================
  // 画面B：メニュー画面（isCartOpen === false の時の表示）
  // ==============================================================
  return (
    <div className="mx-auto w-full max-w-md min-h-screen bg-zinc-950 text-zinc-50 flex flex-col relative sm:border sm:border-zinc-800 sm:shadow-2xl font-sans scroll-smooth">
      
      {errorMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-rose-600 text-white px-4 py-2 rounded shadow-lg z-50 text-sm font-bold w-11/12 max-w-[350px] text-center">
          {errorMessage}
        </div>
      )}

      <header className="bg-zinc-900 px-4 pt-4 pb-2 sticky top-0 z-20 border-b border-zinc-800 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-lg font-bold tracking-wider">Osaki Dining</h1>
          <span className="bg-emerald-900/50 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-800">ただいま受付中</span>
        </div>

        <div className="flex space-x-5 overflow-x-auto pb-2 text-sm font-medium [&::-webkit-scrollbar]:hidden mt-2">
          {categories.map((cat, index) => (
            <button 
              key={index} 
              onClick={() => {
                setActiveCategory(cat);
                document.getElementById(cat)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`pb-1 whitespace-nowrap cursor-pointer transition-colors outline-none ${
                activeCategory === cat 
                  ? "border-b-2 border-rose-600 text-rose-500" 
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 p-4 space-y-8 pb-32">
        {categories.map((categoryName, index) => {
          const itemsInCategory = menuItems.filter(item => item.category === categoryName);
          if (itemsInCategory.length === 0) return null;

          return (
            <section key={index} id={categoryName} className="space-y-4 scroll-mt-32">
              <h2 className="text-lg font-bold text-zinc-200 border-l-4 border-rose-600 pl-2">{categoryName}</h2>
              {itemsInCategory.map((item) => (
                <Card key={item.id} className={`overflow-hidden border-zinc-800 shadow-xl border-0 ${item.isSoldOut ? 'bg-zinc-900/50 opacity-75' : 'bg-zinc-900'}`}>
                  
                  {/* === 【修正箇所】画像表示エリア（143行目付近） === */}
                  <div className="h-32 bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs relative overflow-hidden">
                    {item.imageUrl && (item.imageUrl.startsWith("http") || item.imageUrl.startsWith("/")) ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <span>{item.imageUrl}</span>
                    )}
                    
                    {item.badge && !item.isSoldOut && <span className="absolute top-2 left-2 bg-rose-700 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow">{item.badge}</span>}
                    {item.isSoldOut && <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg tracking-widest backdrop-blur-[1px]">SOLD OUT</span>}
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-2">
                      <h3 className="font-bold text-base text-zinc-100">{item.name}</h3>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-lg text-white">¥{item.price.toLocaleString()}</span>
                      <Button 
                        size="sm" 
                        onClick={() => handleAddToCart(item)}
                        className={item.isSoldOut ? "bg-zinc-700 text-zinc-400 cursor-not-allowed" : "bg-rose-700 hover:bg-rose-600 text-white font-bold px-4"}
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
        <div className="flex items-center justify-between mb-3 text-sm px-2">
          <div className="flex items-center space-x-2">
            <span className="text-zinc-400">人数:</span>
            <input 
              type="number" 
              min="1" 
              value={peopleCount} 
              onChange={(e) => setPeopleCount(Number(e.target.value))}
              className="w-16 bg-zinc-950 text-white rounded px-2 py-1 outline-none border border-zinc-700 text-center"
            />
          </div>
          <div className="text-zinc-300">
            1人あたり: <span className="font-bold text-rose-500 text-base ml-1">¥{calculateSplit().toLocaleString()}</span>
          </div>
        </div>

        <Button 
          onClick={() => {
            if(cart.length > 0) setIsCartOpen(true);
          }} 
          className={`w-full h-14 text-base font-bold flex justify-between items-center px-6 shadow-lg border-0 transition-opacity ${
            cart.length > 0 
              ? "bg-rose-700 hover:bg-rose-600 text-white cursor-pointer" 
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          <span className="bg-black/30 px-3 py-1 rounded text-sm">{calculateTotalQuantity()}</span>
          <span>{cart.length > 0 ? "カートを確認する" : "商品を選んでください"}</span>
          <span>¥{calculateTotal().toLocaleString()}</span>
        </Button>
      </footer>

    </div>
  )
}