import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import cartApi from "src/apis/cart.api";
import trackApi from "src/apis/track.api";
import EmptyCart from "src/assets/images/EmptyCart.png";
import { BasketIcon } from "src/components/Icon";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import { displayEnGBDate, displayEnGBDateAndTime } from "src/utils/formatDate";
import { getIdFromSlug } from "src/utils/slugify";
import Carriage from "./components/Carriage";

const TrackDetailsPage = () => {
  const { trackId: slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userProfile, isAuthenticated } = useContext(AuthContext);
  const trackId = getIdFromSlug(slug as string);
  const { data: trackDetailsQueryData } = useQuery({
    queryKey: ["trackDetails", { trackId }],
    queryFn: () => trackApi.getTrackDetailsById(trackId),
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
  });
  const track = trackDetailsQueryData?.data.data;
  const { data: cartData, isLoading: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartApi.getCart({ userId: userProfile?.id as string }),
    enabled: isAuthenticated,
  });
  const removeFromCartMutation = useMutation({
    mutationFn: cartApi.removeFromCart,
  });
  const handleRemoveFromCart = (body: { cartItemId: number; userId: string }) => {
    removeFromCartMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.dismiss();
        toast.success("Xóa vé khỏi giỏ thành công", {
          autoClose: 1000,
          hideProgressBar: true,
          position: "top-center",
        });
      },
    });
  };
  const cart = cartData?.data.data;
  console.log(cart);
  if (!track) return null;
  return (
    <div className="small-container grid w-full grid-cols-3 gap-x-10 bg-white px-2 py-3">
      <div className="col-span-2">
        <h2 className="flex w-max items-center gap-x-2 rounded-r-lg bg-primary py-2 px-3 text-white">
          <strong className="text-base font-bold">Chiều đi:</strong>
          <span className="text-base font-medium">
            ngày {displayEnGBDate(track.departureTime)} từ {track.departureStation} đến {track.arrivalStation}
          </span>
        </h2>
        <Carriage carriages={track?.train?.carriages}></Carriage>
      </div>
      <div className="col-span-1">
        <h2 className="flex items-center gap-x-2 bg-primaryYellow py-2 px-3 text-base font-bold text-white">
          <span>Giỏ vé</span>
          <BasketIcon
            width={18}
            height={18}
            fill="white"
          ></BasketIcon>
        </h2>
        {!isAuthenticated && (
          <div className="relative h-[272px] overflow-y-auto rounded-t-none rounded-b-lg border-2 border-primaryYellow px-4">
            <div className="absolute inset-0 z-[1] h-full w-full bg-gray-500 bg-opacity-5"></div>
            <div className="absolute top-1/2 left-1/2 z-[2] mx-auto flex w-[200px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center">
              <div className="w-full text-sm font-medium">Vui lòng đăng nhập để có thể sử dụng tính năng đặt vé</div>
              <button
                onClick={() => navigate(path.register)}
                className="mt-2 block w-full cursor-pointer rounded-md bg-primary py-3 text-sm font-medium text-white"
              >
                Đăng ký
              </button>
              <button
                onClick={() => navigate(path.login)}
                className="mt-2 block w-full cursor-pointer rounded-md bg-primary py-3 text-sm font-medium text-white"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        )}
        {isAuthenticated && !cartIsLoading && cart && cart.cartItems.length > 0 && (
          <>
            <div className="h-[272px] overflow-y-auto rounded-t-none rounded-b-lg border-2 border-primaryYellow px-4">
              {cart.cartItems.map((cartItem) => (
                <div
                  className="mt-4 flex items-center justify-between text-xs"
                  key={cartItem.id}
                >
                  <div>
                    <div className="flex items-center gap-x-1">
                      <span>Tàu {cartItem.seat.carriage.train.name},</span>
                      <span>{cartItem.seat.carriage.train.track.departureStation}</span>
                      <span>-</span>
                      <span>{cartItem.seat.carriage.train.track.arrivalStation}</span>
                    </div>
                    <div>{displayEnGBDateAndTime(cartItem.seat.carriage.train.track.departureTime)}</div>
                    <div>
                      Toa số {cartItem.seat.carriage.carriageNo}, chỗ ngồi số {cartItem.seat.seatNo}
                    </div>
                  </div>
                  <button
                    className="flex-shrink-0 text-red-500"
                    onClick={() => handleRemoveFromCart({ userId: userProfile?.id as string, cartItemId: cartItem.id })}
                  >
                    Xóa khỏi giỏ
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate(path.payment)}
              className="mt-2 w-full rounded-md bg-primary py-2 text-sm font-medium text-white"
            >
              Thanh toán
            </button>
          </>
        )}
        {isAuthenticated && ((cart && cart.cartItems.length) || !cart) <= 0 && (
          <div className="flex h-[272px] flex-col items-center justify-center overflow-y-auto rounded-t-none rounded-b-lg border-2 border-secondaryGray">
            <img
              src={EmptyCart}
              alt="Giỏ vé trống"
              className="h-20 w-20 object-cover"
            />
            <span className="text-sm">Không có vé trong giỏ</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackDetailsPage;
