'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { menuItems, categories, MenuItem } from "./menu-data"

// 注文履歴1回分のデータ構造を定義
type OrderHistory = {
  orderId: string;      // 注文番号（例: ORD-A1B2）
  time: string;         // 注文した時刻
  items: { item: MenuItem; quantity: number }[]; // 注文した商品リスト
  totalPrice: number;   // その回の合計金額
};

export default function Home() {
  // --- 1. 状態（State）の定義 ---
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  
  // 画面の切り替え状態を管理 ("menu" | "cart" | "history")
  const [viewMode, setViewMode] = useState<"menu" | "cart" | "history">("menu");
  
  // 過去の注文履歴を保存する配列
  const [orderHistoryList, setOrderHistoryList] = useState<OrderHistory[]>([]);

  // --- 2. スクロール連動機能（Scroll Spy） ---
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

  // --- 3. 計算・処理関数（表示と計算の分離） ---
  
  // カートに商品を追加する処理（品切れ制御付き）
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

  // カートから数量を減らす処理
  const handleRemoveFromCart = (itemId: number) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((p) => p.item.id === itemId ? { ...p, quantity: p.quantity - 1 } : p);
      }
      return prev.filter((p) => p.item.id !== itemId);
    });
  };

  // カート内の合計金額の計算（reduceを活用）
  const calculateTotal = () => cart.reduce((sum, c) => sum + (c.item.price * c.quantity), 0);
  
  // カート内の合計点数の計算（reduceを活用）
  const calculateTotalQuantity = () => cart.reduce((sum, c) => sum + c.quantity, 0);
  
  // 割り勘金額の計算（0や空入力をガード）
  const calculateSplit = () => {
    const total = calculateTotal();
    if (!peopleCount || peopleCount <= 0) return total;
    return Math.ceil(total / peopleCount);
  };

  // 注文を確定させ、履歴へ移す処理
  const handleConfirmOrder = () => {
    if (cart.length === 0) return;

    // 今回の注文内容を履歴データとして作成
    const newOrder: OrderHistory = {
      orderId: `ORD-${Math.random().toString(36).substring(2, 6).toUpperCase()}`, // ランダムな注文ID生成
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      items: [...cart],
      totalPrice: calculateTotal()
    };

    // 履歴リストの先頭に追加し、カートを空にする
    setOrderHistoryList((prev) => [newOrder, ...prev]);
    setCart([]);
    setViewMode("history"); // 注文履歴画面へジャンプ
  };

  // 全注文履歴を通した総合計金額の計算（reduceを活用）
  const calculateAllHistoryTotal = () => {
    return orderHistoryList.reduce((sum, order) => sum + order.totalPrice, 0);
  };


  // ==============================================================
  // 画面パターン1：カート画面（viewMode === "cart"）
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
                <span>カート内合計</span>
                <span className="text-rose-500 text-xl">¥{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-zinc-900 border-t border-zinc-800 p-4 sticky bottom-0 z-20 w-full">
          {/* 【機能修正】クリックで注文確定関数を呼び出し、カートを空にして履歴へ */}
          <Button 
            className="w-full h-14 text-lg font-bold shadow-lg bg-rose-700 hover:bg-rose-600 text-white border-0" 
            onClick={handleConfirmOrder}
          >
            注文を確定する
          </Button>
        </footer>
      </div>
    );
  }

  // ==============================================================
  // 画面パターン2：注文履歴画面（viewMode === "history"）
  // ==============================================================
  if (viewMode === "history") {
    return (
      <div className="mx-auto w-full max-w-md min-h-screen bg-zinc-950 text-zinc-50 flex flex-col relative sm:border sm:border-zinc-800 sm:shadow-2xl font-sans">
        <header className="bg-zinc-900 px-4 py-4 sticky top-0 z-20 border-b border-zinc-800 flex items-center shadow-sm">
          <h1 className="text-lg font-bold tracking-wider">注文履歴・送信完了</h1>
        </header>

        <main className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* 総合計金額（これまで送信したすべての注文の合計） */}
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-center shadow-md">
            <p className="text-xs text-zinc-400 mb-1">現在の注文総合計金額</p>
            <p className="text-2xl font-black text-rose-500">¥{calculateAllHistoryTotal().toLocaleString()}</p>
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
                      <span>注文時刻: {order.time}</span>
                    </div>
                    
                    {/* その回に注文した商品リスト */}
                    <div className="space-y-1.5">
                      {order.items.map((c) => (
                        <div key={c.item.id} className="flex justify-between text-sm">
                          <span className="text-zinc-300">{c.item.name}</span>
                          <span className="text-zinc-400 font-mono">x {c.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-zinc-800/60 text-sm font-bold">
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
          <Button 
            className="w-full h-14 text-base font-bold bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700" 
            onClick={() => setViewMode("menu")}
          >
            追加で注文する（メニューへ）
          </Button>
        </footer>
      </div>
    );
  }

  // ==============================================================
  // 画面パターン3：メニュー閲覧画面（viewMode === "menu"）
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
            {/* 履歴がある場合のみ、メニュー画面からいつでも履歴に飛べる隠しボタン */}
            {orderHistoryList.length > 0 && (
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs border-zinc-700 text-zinc-300 h-7 px-2"
                onClick={() => setViewMode("history")}
              >
                注文履歴
              </Button>
            )}
            <span className="bg-emerald-900/50 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-800">ただいま受付中</span>
          </div>
        </div>

        <div className="flex space-x-5 overflow-x-auto pb-2 text-sm font-medium [&::-webkit-scrollbar]:hidden mt-2">
          {categories.map((cat, index) => (
            <button 
              key={index} 
              onClick={() => {
                setActiveCategory(cat);
                document.getElementById(cat)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`pb-1 whitespace-nowrap cursor-pointer transition-colors outline-none border-b-2 ${
                activeCategory === cat 
                  ? "border-rose-600 text-rose-500" 
                  : "border-transparent text-zinc-400 hover:text-zinc-200"
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
            if(cart.length > 0) setViewMode("cart");
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