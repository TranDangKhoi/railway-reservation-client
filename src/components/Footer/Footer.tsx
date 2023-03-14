import { LogoIcon } from "../Icon";

const Footer = () => {
  return (
    <footer className="bg-primaryGray p-5">
      <div className="container">
        <div className="flex flex-col gap-x-10 sm:grid sm:grid-cols-5">
          <div className="col-span-2">
            <div className="flex flex-col items-start gap-y-2">
              <div className="mb-5 flex items-center gap-x-2 sm:mb-0">
                <LogoIcon
                  kind="primary"
                  width={31}
                  height={30}
                ></LogoIcon>
                <span className="text-xl font-bold">Railway</span>
              </div>
              <span className="hidden text-sm font-medium text-secondaryGray sm:block">
                Chuẩn bị cho chuyến đi tuyệt vời sắp tới của bạn cùng Railway: Tìm kiếm thông tin hành trình tàu chạy,
                đặt mua vé tàu hỏa và thanh toán tiện lợi với nhiều cơ hội nhận ưu đãi hấp dẫn.
              </span>
            </div>
          </div>
          <div className="col-span-1">
            <ul>
              <li>
                <h3 className="text-xl font-medium leading-[36px]">Dịch vụ</h3>
              </li>
              <li className="mt-1 text-sm font-medium leading-7 text-secondaryGray">Đặt vé tàu</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">Tra vé tàu</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">Hủy vé tàu</li>
            </ul>
          </div>
          <div className="col-span-1">
            <ul>
              <li>
                <h3 className="text-xl font-medium leading-[36px]">Hỗ trợ</h3>
              </li>
              <li className="mt-1 text-sm font-medium leading-7 text-secondaryGray">Tài khoản</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">Hướng dẫn</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">Liên hệ</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">Chính sách thanh toán</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">Câu hỏi thường gặp</li>
            </ul>
          </div>
          <div className="col-span-1">
            <ul>
              <li>
                <h3 className="text-xl font-medium leading-[36px]">Chi tiết</h3>
              </li>
              <li className="mt-1 text-sm font-medium leading-7 text-secondaryGray">Thông tin {"&"} Địa chỉ</li>
              <li className="text-sm font-medium leading-7 text-secondaryGray">Blog</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
