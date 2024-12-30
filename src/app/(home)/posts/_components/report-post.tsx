import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { reportPost } from "@/lib/actions"
import { reportPostSchema } from "@/lib/schemas"
import { Post } from "@/types"

type ReportPostProps = {
  post: Post
  onSuccess: () => void
}

const reasonOptions = [
  "Tin có dấu hiệu lừa đảo",
  "Tin trùng lặp nội dung",
  "Không liên hệ được chủ đăng tin",
  "Tin không đúng thực tế",
  "Lý do khác",
]

export const ReportPost = ({ post, onSuccess }: ReportPostProps) => {
  const form = useForm<z.infer<typeof reportPostSchema>>({
    defaultValues: {
      postId: post.id,
      reason: reasonOptions[0],
      description: "",
      name: "",
      phone: "",
    },
    resolver: zodResolver(reportPostSchema),
  })

  const onSubmit = async (data: z.infer<typeof reportPostSchema>) => {
    const error = await reportPost(data)

    if (error) {
      toast.error(error)
    }
    toast.success("Báo cáo thành công!")
    onSuccess()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="reason">Lý do</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reasonOptions.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="cursor-pointer"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Nhập mô tả chi tiết"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Họ và tên</FormLabel>
              <FormControl>
                <Input type="text" id="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
              <FormControl>
                <Input type="text" id="phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Đang gửi..." : "Báo cáo"}
        </Button>
      </form>
    </Form>
  )
}
