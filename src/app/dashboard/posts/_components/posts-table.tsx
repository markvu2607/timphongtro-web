import { EPostStatus } from "@/constants"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { getMyPosts } from "@/lib/data"
import { ClosePost, DeletePost, PublishPost, UpdatePost } from "./buttons"
import Pagination from "./pagination"

const ITEMS_PER_PAGE = 10

export default async function PostsTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const { items, totalPages } = await getMyPosts({
    query,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  })

  return (
    <>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Thumbnail
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Address
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Created at
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    District
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Province
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Link
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {items?.map((post) => (
                  <tr
                    key={post.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap p-3">{post.title}</td>
                    <td className="whitespace-nowrap p-3">
                      <Image
                        src={post.thumbnail}
                        className="rounded-sm"
                        width={28}
                        height={28}
                        alt={`${post.title}'s profile picture`}
                      />
                    </td>
                    <td className="whitespace-nowrap p-3">
                      <p>{post.address}</p>
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {new Date(post.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      <Badge>{post.status.toLocaleLowerCase()}</Badge>
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {post.district.name}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {post.province.name}
                    </td>
                    <td className="whitespace-nowrap p-3">
                      <Link
                        target="_blank"
                        href={`/posts/${post.id}`}
                        className="text-blue-500 underline"
                      >
                        View
                      </Link>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        {post.status === EPostStatus.APPROVED && (
                          <PublishPost id={post.id} />
                        )}
                        {post.status === EPostStatus.PUBLISHED && (
                          <ClosePost id={post.id} />
                        )}
                        {(post.status === EPostStatus.REVIEWING ||
                          post.status === EPostStatus.APPROVED ||
                          post.status === EPostStatus.REJECTED) && (
                          <UpdatePost id={post.id} />
                        )}
                        <DeletePost id={post.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
