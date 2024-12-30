import { lusitana } from "@/app/fonts"
import { GlobeIcon } from "lucide-react"

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeIcon className="size-12 rotate-[15deg]" />
      <p className="text-[44px]">Lorem</p>
    </div>
  )
}
