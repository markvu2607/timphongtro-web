import { Card, CardContent, CardHeader } from "@/components/ui/card"
import * as postApi from "@/lib/api/post.api"
import { PremiumPostCard } from "./premium-post-card"

export const PremiumPostList = async () => {
  const premiumPosts = await postApi.getPublishedPremiumPosts()

  if (!premiumPosts.length) {
    return null
  }

  return (
    <Card>
      <CardHeader className="p-4">
        <p className="font-semibold">Bài đăng nổi bật</p>
      </CardHeader>
      <CardContent className="space-y-2 p-4 pt-0">
        {premiumPosts.slice(0, 3).map((post) => (
          <PremiumPostCard key={post.id} post={post} />
        ))}
      </CardContent>
    </Card>
  )
}
