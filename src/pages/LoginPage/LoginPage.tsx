import { Link } from "react-router-dom";
import { path } from "src/constants/path.enum";

const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
      <div className="lg:col-span-2 lg:col-start-4">
        <form className="rounded-lg bg-white px-3 py-4 shadow-lg">
          <div className="text-center text-2xl font-medium">Đăng nhập tài khoản</div>
          <div className="mt-8 flex items-center justify-center">
            <span className="text-gray-400">Bạn chưa có tài khoản?</span>
            <Link
              className="ml-1 text-primary"
              to={path.register}
            >
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
