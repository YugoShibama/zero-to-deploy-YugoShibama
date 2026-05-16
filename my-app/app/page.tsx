import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24 bg-gray-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>UIテスト画面</CardTitle>
          <CardDescription>shadcn/uiのコンポーネント確認</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">お名前</label>
              <Input id="name" placeholder="例: 山田 太郎" />
            </div>
            <Button>登録する</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}