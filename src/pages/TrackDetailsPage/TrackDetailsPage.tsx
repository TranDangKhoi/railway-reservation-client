import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import trackApi from "src/apis/track.api";
import { BasketIcon } from "src/components/Icon";
import { displayEnGBDate, displayEnGBDateAndTime } from "src/utils/formatDate";
import { getIdFromSlug } from "src/utils/slugify";
import Carriage from "./components/Carriage";
import EmptyCart from "src/assets/images/EmptyCart.png";
import cartApi from "src/apis/cart.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "src/contexts/auth.context";

const TrackDetailsPage = () => {
  const { trackId: slug } = useParams();
  const { userProfile, isAuthenticated } = useContext(AuthContext);
  const trackId = getIdFromSlug(slug as string);
  const { data: trackDetailsQueryData } = useQuery({
    queryKey: ["trackDetails", { trackId }],
    queryFn: () => trackApi.getTrackDetailsById(trackId),
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
  });
  const track = trackDetailsQueryData?.data;
  const { data: cartData, isLoading: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartApi.getCart({ userId: userProfile?.id as string }),
    enabled: isAuthenticated,
  });
  const cart = cartData?.data;
  if (!track) return null;
  return (
    <div className="small-container grid w-full grid-cols-3 gap-x-2 bg-white px-2 py-3">
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
        {!cartIsLoading && cart && cart.cartItems ? (
          <div className="h-[272px] overflow-y-auto rounded-t-none rounded-b-lg border-2 border-secondaryGray">
            {cart.cartItems.map((cartItem) => (
              <div
                className="flex items-center justify-between"
                key={cartItem.id}
              >
                <div>
                  <div>
                    {track.train.name} {track.departureStation}-{track.arrivalStation}
                  </div>
                  <div>{displayEnGBDateAndTime(track.departureTime)}</div>
                  <div>{}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[272px] flex-col items-center justify-center overflow-y-auto rounded-t-none rounded-b-lg border-2 border-secondaryGray">
            <img
              src={EmptyCart}
              alt="Giỏ vé trống"
              className="h-20 w-20 object-cover"
            />
            <span className="text-sm font-medium">Không có vé trong giỏ</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackDetailsPage;
