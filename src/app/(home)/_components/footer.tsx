import Image from "next/image"

export const Footer = () => {
  return (
    <footer className="bg-orange-50">
      <div className="mx-auto max-w-7xl p-4 md:p-8 lg:p-12">
        <div className="flex items-start justify-between">
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-semibold">VỀ CHÚNG TÔI</p>
            <p className="cursor-pointer hover:underline">Giới thiệu</p>
            <p className="cursor-pointer hover:underline">Quy chế hoạt động</p>
            <p className="cursor-pointer hover:underline">Quy định sử dụng</p>
            <p className="cursor-pointer hover:underline">Chính sách bảo mật</p>
            <p className="cursor-pointer hover:underline">Liên hệ</p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-semibold">DÀNH CHO KHÁCH HÀNG</p>
            <p className="cursor-pointer hover:underline">Câu hỏi thường gặp</p>
            <p className="cursor-pointer hover:underline">Hướng dẫn đăng tin</p>
            <p className="cursor-pointer hover:underline">Bảng giá dịch vụ</p>
            <p className="cursor-pointer hover:underline">Quy định đăng tin</p>
            <p className="cursor-pointer hover:underline">
              Giải quyết khiếu nại
            </p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-semibold">PHƯƠNG THỨC THANH TOÁN</p>
            <div className="flex gap-x-2">
              <Image src="/visa.png" alt="visa icon" width={40} height={40} />
              <Image
                src="/mastercard.png"
                alt="mastercard icon"
                width={40}
                height={40}
              />
              <Image src="/jcb.png" alt="jcb icon" width={40} height={40} />
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-semibold">THEO DÕI CHÚNG TÔI</p>
            <div className="flex gap-x-2">
              <Image
                src="/facebook.png"
                alt="facebook icon"
                width={40}
                height={40}
              />
              <Image
                src="/youtube.png"
                alt="youtube icon"
                width={40}
                height={40}
              />
              <Image
                src="/tiktok.png"
                alt="tiktok icon"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 p-4">
        <div className="text-center text-sm text-gray-600">
          <p>&copy; 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
