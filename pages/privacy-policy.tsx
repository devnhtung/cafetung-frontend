// pages/privacy-policy.js
import Head from "next/head";
import Link from "next/link";
import AppLogo from "@/components/AppLogo";

export default function PrivacyPolicy() {
  return (
    <div className="font-sans text-white bg-primary min-h-screen flex flex-col">
      {/* Head để đặt tiêu đề và meta */}
      <Head>
        <title>Chính Sách Bảo Mật - Café Tùng</title>
        <meta name="description" content="Chính sách bảo mật của Café Tùng" />
      </Head>

      {/* Header */}
      <div className="header bg-primary z-20 relative px-5 py-2.5 flex justify-between items-center">
        <div className="nav-links flex items-center gap-5">
          <Link href="/" className="nav-link">
            Trang Chủ
          </Link>
          <Link href="/#about" className="nav-link">
            Về Tùng
          </Link>
          <Link href="/#location" className="nav-link">
            Location
          </Link>
          <Link href="/blog" className="nav-link">
            Chia sẻ
          </Link>
        </div>
        <div className="logo-container absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 z-30"></div>
      </div>

      {/* Nội dung Chính sách Bảo mật */}
      <div className="container mx-auto px-5 py-10 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8">
          Chính Sách Bảo Mật
        </h1>
        <div className="bg-primary-opaque p-6 rounded-lg text-white">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">1. Giới thiệu</h2>
            <p>
              Chào mừng bạn đến với Café Tùng. Chúng tôi cam kết bảo vệ thông
              tin cá nhân của bạn và đảm bảo quyền riêng tư của bạn được tôn
              trọng. Chính sách bảo mật này giải thích cách chúng tôi thu thập,
              sử dụng, lưu trữ và bảo vệ thông tin của bạn khi bạn sử dụng trang
              web của chúng tôi.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              2. Thông tin chúng tôi thu thập
            </h2>
            <p>Chúng tôi có thể thu thập các loại thông tin sau:</p>
            <ul className="list-disc list-inside ml-4">
              <li>
                Thông tin cá nhân: Họ tên, email, số điện thoại (nếu bạn cung
                cấp).
              </li>
              <li>
                Thông tin đăng nhập: Nếu bạn đăng nhập bằng Facebook, chúng tôi
                có thể thu thập thông tin như ID, tên, email, và ảnh đại diện.
              </li>
              <li>
                Thông tin sử dụng: Dữ liệu về cách bạn tương tác với trang web
                (ví dụ: các trang bạn xem, sản phẩm bạn đặt hàng).
              </li>
              <li>
                Thông tin kỹ thuật: Địa chỉ IP, loại trình duyệt, thiết bị bạn
                sử dụng.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              3. Cách chúng tôi sử dụng thông tin
            </h2>
            <p>Thông tin của bạn được sử dụng để:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Xác thực và quản lý tài khoản người dùng.</li>
              <li>Xử lý đơn hàng và cung cấp dịch vụ khách hàng.</li>
              <li>Cải thiện trải nghiệm người dùng trên trang web.</li>
              <li>Gửi thông báo hoặc thông tin khuyến mãi (nếu bạn đồng ý).</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">4. Chia sẻ thông tin</h2>
            <p>
              Chúng tôi không bán hoặc chia sẻ thông tin cá nhân của bạn với bên
              thứ ba, trừ khi:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Có sự đồng ý của bạn.</li>
              <li>Được yêu cầu bởi pháp luật hoặc cơ quan chức năng.</li>
              <li>
                Cần thiết để cung cấp dịch vụ (ví dụ: chia sẻ với đối tác thanh
                toán).
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">5. Bảo mật thông tin</h2>
            <p>
              Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo
              vệ thông tin của bạn khỏi truy cập trái phép, mất mát hoặc lạm
              dụng. Tuy nhiên, không có hệ thống nào là an toàn tuyệt đối, vì
              vậy chúng tôi khuyến khích bạn bảo vệ thông tin đăng nhập của
              mình.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">6. Quyền của bạn</h2>
            <p>Bạn có quyền:</p>
            <ul className="list-disc list-inside ml-4">
              <li>
                Yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của bạn.
              </li>
              <li>Từ chối nhận thông tin quảng cáo từ chúng tôi.</li>
              <li>Liên hệ với chúng tôi để thực hiện các quyền này.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">7. Cookies</h2>
            <p>
              Chúng tôi sử dụng cookies để cải thiện trải nghiệm người dùng.
              Cookies giúp chúng tôi lưu trữ thông tin đăng nhập (nếu bạn đăng
              nhập bằng Facebook) và phân tích cách bạn sử dụng trang web. Bạn
              có thể tắt cookies trong trình duyệt, nhưng điều này có thể ảnh
              hưởng đến trải nghiệm của bạn.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              8. Liên hệ với chúng tôi
            </h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng
              liên hệ với chúng tôi qua email:{" "}
              <a
                href="mailto:support@cafetung.com"
                className="text-secondary hover:underline"
              >
                support@cafetung.com
              </a>
              .
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              9. Thay đổi chính sách
            </h2>
            <p>
              Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian.
              Mọi thay đổi sẽ được đăng trên trang này, và chúng tôi khuyến
              khích bạn kiểm tra thường xuyên để cập nhật.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary-opaque py-4 text-center">
        <p>&copy; 2025 Café Tùng. All rights reserved.</p>
        <div className="mt-2">
          <Link href="/" className="text-secondary hover:underline mx-2">
            Trang Chủ
          </Link>
          <Link
            href="/privacy-policy"
            className="text-secondary hover:underline mx-2"
          >
            Chính Sách Bảo Mật
          </Link>
        </div>
      </footer>
    </div>
  );
}
