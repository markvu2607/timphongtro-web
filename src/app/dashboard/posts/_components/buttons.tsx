import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deletePost, publishPost, closePost } from "@/lib/actions"
import {
  PencilLineIcon,
  PlusIcon,
  TrashIcon,
  RssIcon,
  BanIcon,
} from "lucide-react"
import Link from "next/link"

export function CreatePost() {
  return (
    <Link
      href="/dashboard/posts/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Post</span>{" "}
      <PlusIcon className="size-4 md:ml-4" />
    </Link>
  )
}

export function UpdatePost({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/posts/${id}/edit`}>
      <Button variant="outline" size="icon">
        <PencilLineIcon className="size-4" />
      </Button>
    </Link>
  )
}

export function DeletePost({ id }: { id: string }) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="icon">
            <TrashIcon className="size-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                "use server"
                await deletePost(id)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export function PublishPost({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await publishPost(id)
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button variant="outline" size="icon" type="submit">
        <RssIcon className="size-4" />
      </Button>
    </form>
  )
}

export function ClosePost({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await closePost(id)
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button variant="outline" size="icon" type="submit">
        <BanIcon className="size-4" />
      </Button>
    </form>
  )
}
