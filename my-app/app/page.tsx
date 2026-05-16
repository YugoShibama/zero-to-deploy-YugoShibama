'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { menuItems, categories, MenuItem } from "./menu-data"

type OrderHistory = {
  orderId: string;
  time: string;
  items: { item: MenuItem; quantity: number }[];
  totalPrice: number;
};

export default function Home() {
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  // 初期状態を「welcome（入店画面）」に変更
  const [viewMode, setViewMode] = useState<"welcome" | "menu" | "cart" | "history">("welcome");
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [orderHistoryList, setOrderHistoryList] = useState<OrderHistory[]>([]);

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

    if (viewMode === "menu") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [viewMode]);

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

  // カートの合計
  const calculateTotal = () => cart.reduce((sum, c) => sum + (c.item.price * c.quantity), 0);
  const calculateTotalQuantity = () => cart.reduce((sum, c) => sum + c.quantity, 0);
  
  // 過去の注文の合計
  const calculateAllHistoryTotal = () => orderHistoryList.reduce((sum, order) => sum + order.totalPrice, 0);

  // 【修正】総合計（現在のカート ＋ 過去の注文）から全体の1人あたりの金額を計算
  const grandTotal = calculateTotal() + calculateAllHistoryTotal();
  const splitAmount = peopleCount > 0 ? Math.ceil(grandTotal / peopleCount) : grandTotal;

  const handleConfirmOrder = () => {
    if (cart.length === 0) return;
    const newOrder: OrderHistory = {
      orderId: `ORD-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      totalPrice: calculateTotal(),
    };
    setOrderHistoryList((prev) => [newOrder, ...prev]);
    setCart([]);
    setViewMode("history");
  };

  // ==============================================================
  // 画面パターン0：入店（人数入力）画面
  // ==============================================================
  if (viewMode === "welcome") {
    return (
      <div className="mx-auto w-full max-w-md min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center p-6 font-sans sm:border sm:border-zinc-800 sm:shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 tracking-wider">Osaki Dining</h1>
        <Card className="w-full bg-zinc-900 border-zinc-800 shadow-xl">
          <CardContent className="p-6 flex flex-col items-center space-y-8 pt-8">
            <h2 className="text-lg font-bold text-zinc-200">ご来店ありがとうございます</h2>
            
            <div className="flex flex-col items-center space-y-4">
              <span className="text-zinc-400 text-sm">ご利用人数を入力してください</span>
              <div className="flex items-center bg-zinc-950 rounded-lg border border-zinc-700 p-2 shadow-inner">
                <button onClick={() => setPeopleCount(prev => Math.max(1, prev - 1))} className="w-14 h-14 flex items-center justify-center text-zinc-400 hover:text-white font-bold text-2xl transition-colors">-</button>
                <span className="w-20 text-center text-3xl font-bold font-mono text-white">{peopleCount}</span>
                <button onClick={() => setPeopleCount(prev => prev + 1)} className="w-14 h-14 flex items-center justify-center text-zinc-400 hover:text-white font-bold text-2xl transition-colors">+</button>
              </div>
            </div>

            <Button onClick={() => setViewMode("menu")} className="w-full h-14 text-lg font-bold bg-rose-700 hover:bg-rose-600 text-white border-0 shadow-lg mt-4">
              注文を始める
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ==============================================================
  // 画面パターン1：カート確認画面
  // ==============================================================
  if (viewMode === "cart") {
    return (
      <div className="mx-auto w-full max-w-md min-h-screen bg-zinc-950 text-zinc-50 flex flex-col relative sm:border sm:border-zinc-800 sm:shadow-2xl font-sans">
        <header className="bg-zinc-900 px-4 py-4 sticky top-0 z-20 border-b border-zinc-800 flex items-center shadow-sm">
          <Button variant="ghost" onClick={() => setViewMode("menu")} className="text-zinc-400 hover:text-white p-0 h-auto mr-4 text-base">
            ← メニュー
          </Button>
          <h1 className="text-lg font-bold">カートの確認</h1>
        </header>

        <main className="flex-1 p-4 space-y-4">
          <div className="space-y-4">
            {cart.map((c) => (
              <div key={c.item.id} className="flex justify-between items-center bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <div>
                  <h3 className="font-bold text-sm text-zinc-100">{c.item.name}</h3>
                  <p className="text-rose-500 font-bold mt-1">¥{c.item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-3 bg-zinc-950 rounded p-1 border border-zinc-800">
                  <button onClick={() => handleRemoveFromCart(c.item.id)} className="w-8 h-8 flex items-center justify-center text-zinc-400 font-bold hover:text-white text-lg">-</button>
                  <span className="w-4 text-center text-sm font-bold">{c.quantity}</span>
                  <button onClick={() => handleAddToCart(c.item)} className="w-8 h-8 flex items-center justify-center text-zinc-400 font-bold hover:text-white text-lg">+</button>
                </div>
              </div>
            ))}
            
            <div className="border-t border-zinc-800 pt-4 mt-8">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>カート内小計</span>
                <span className="text-rose-500 text-xl">¥{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-zinc-900 border-t border-zinc-800 p-4 sticky bottom-0 z-20 w-full">
          <Button className="w-full h-14 text-lg font-bold shadow-lg bg-rose-700 hover:bg-rose-600 text-white border-0" onClick={handleConfirmOrder}>
            注文を確定する
          </Button>
        </footer>
      </div>
    );
  }

  // ==============================================================
  // 画面パターン2：注文履歴画面
  // ==============================================================
  if (viewMode === "history") {
    return (
      <div className="mx-auto w-full max-w-md min-h-screen bg-zinc-950 text-zinc-50 flex flex-col relative sm:border sm:border-zinc-800 sm:shadow-2xl font-sans">
        <header className="bg-zinc-900 px-4 py-4 sticky top-0 z-20 border-b border-zinc-800 flex items-center justify-between shadow-sm">
          <h1 className="text-lg font-bold tracking-wider">注文履歴</h1>
          <Button variant="ghost" size="sm" onClick={() => setViewMode("menu")} className="text-zinc-400 hover:text-white">✕ 閉じる</Button>
        </header>

        <main className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* 【修正】総合計と割り勘の表示 */}
          <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 text-center shadow-md">
            <p className="text-xs text-zinc-400 mb-1">現在のご利用金額（総合計）</p>
            <p className="text-3xl font-black text-rose-500 mb-3">¥{grandTotal.toLocaleString()}</p>
            <div className="inline-flex items-center space-x-2 bg-zinc-950 px-3 py-1.5 rounded-full border border-zinc-800">
              <span className="text-xs text-zinc-400">{peopleCount}名での割り勘:</span>
              <span className="text-sm font-bold text-white">1人あたり ¥{splitAmount.toLocaleString()}</span>
            </div>
          </div>

          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider px-1">これまでの注文内訳</h2>

          {orderHistoryList.length === 0 ? (
            <p className="text-center text-zinc-500 mt-10 text-sm">まだ注文履歴はありません。</p>
          ) : (
            <div className="space-y-4">
              {orderHistoryList.map((order) => (
                <Card key={order.orderId} className="border-zinc-800 bg-zinc-900 shadow-lg border">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                      <span className="font-mono bg-zinc-950 px-2 py-0.5 rounded text-zinc-300 font-bold">{order.orderId}</span>
                      <span>{order.time}</span>
                    </div>
                    <div className="space-y-1.5">
                      {order.items.map((c) => (
                        <div key={c.item.id} className="flex justify-between text-sm">
                          <span className="text-zinc-300">{c.item.name}</span>
                          <span className="text-zinc-400 font-mono">x {c.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-zinc-800 text-sm font-bold">
                      <span className="text-zinc-400">小計</span>
                      <span className="text-white">¥{order.totalPrice.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>

        <footer className="bg-zinc-900 border-t border-zinc-800 p-4 sticky bottom-0 z-20 w-full">
          <Button variant="outline" className="w-full h-14 text-base font-bold bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700" onClick={() => setViewMode("menu")}>
            追加で注文する
          </Button>
        </footer>
      </div>
    );
  }

  // ==============================================================
  // 画面パターン3：メニュー閲覧画面
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
          <div className="flex items-center space-x-2">
            {orderHistoryList.length > 0 && (
              <Button size="sm" variant="outline" className="text-xs border-zinc-700 text-zinc-300 h-7 px-2" onClick={() => setViewMode("history")}>
                注文履歴
              </Button>
            )}
            <span className="bg-emerald-900/50 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-800">ただいま受付中</span>
          </div>
        </div>

        <div className="flex space-x-5 overflow-x-auto pb-2 text-sm font-medium mt-2 [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-zinc-900">
          {categories.map((cat, index) => (
            <button 
              key={index} 
              onClick={() => {
                setActiveCategory(cat);
                document.getElementById(cat)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`pb-1 whitespace-nowrap cursor-pointer transition-colors outline-none border-b-2 ${
                activeCategory === cat ? "border-rose-600 text-rose-500" : "border-transparent text-zinc-400 hover:text-zinc-200"
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
                  
                  <div className="h-32 bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs relative overflow-hidden">
                    {item.imageUrl && (item.imageUrl.startsWith("http") || item.imageUrl.startsWith("/")) ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
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
        {/* 【修正】人数変更ボタンと、総合計からの割り勘表示 */}
        <div className="flex items-center justify-between mb-3 text-sm px-2">
          <div className="flex items-center space-x-3">
            <span className="text-zinc-400">ご来店: {peopleCount}名</span>
            <button onClick={() => setViewMode("welcome")} className="text-xs border border-zinc-700 text-zinc-400 px-2 py-0.5 rounded hover:bg-zinc-800 hover:text-white transition-colors">人数変更</button>
          </div>
          <div className="text-zinc-300">
            総合計1人あたり: <span className="font-bold text-rose-500 text-base ml-1">¥{splitAmount.toLocaleString()}</span>
          </div>
        </div>

        <Button 
          onClick={() => { if(cart.length > 0) setViewMode("cart"); }} 
          className={`w-full h-14 text-base font-bold flex justify-between items-center px-6 shadow-lg border-0 transition-opacity ${
            cart.length > 0 ? "bg-rose-700 hover:bg-rose-600 text-white cursor-pointer" : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
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