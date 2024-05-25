import React, { useEffect, useState } from "react";
import useReserveFilter from "../../hooks/useReserveFilter";
import ReserveRoomItem from "./ReserveRoomItem";
import ReserveApartItem from "./ReserveApartItem";

import alterPicture from "../../assets/images/homeCards/home-1.png";

import LoadingSpinner from "../../components/LoadingSpinner";
import { useSelector } from "react-redux";

export default function ReserveItemsList(props) {
  const {
    rooms,
    aparts,
    houses,
    days,
    checkInDate,
    checkOutDate,
    guestsCount,
    isFindRooms,
  } = props;

  const { reserveFilter } = useReserveFilter();

  const isLoading = useSelector((state) => state.loading.isLoading);

  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableAparts, setAvailableAparts] = useState([]);

  useEffect(() => {
    console.log("HOUSES: ", houses);
    console.log("APARTS: ", aparts);
    console.log("ROOMS: ", rooms);
    // console.log('clientBooking: ', clientBooking);

    const availableRooms = rooms.filter((room) =>
      reserveFilter(room, { checkInDate, checkOutDate, guestsCount })
    );
    setAvailableRooms(availableRooms);

    const availableAparts = aparts.filter((apart) =>
      reserveFilter(apart, { checkInDate, checkOutDate, guestsCount })
    );
    setAvailableAparts(availableAparts);

    console.log(availableRooms);
    console.log(availableAparts);
  }, [checkInDate, checkOutDate, guestsCount]);

  const calculateDays = (checkInDate, checkOutDate) => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const calculatePrice = (pricePerDay, days) => {
    if (days < 10) {
      return Math.round(pricePerDay * days);
    } else if (days < 20) {
      return Math.round(pricePerDay * days * 0.95);
    } else {
      return Math.round(pricePerDay * days * 0.8);
    }
  };
  
  return (
    <>
      <h2 className="title">Список подходящих номеров:</h2>
      <div className="reserveItems-list">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {availableRooms.map((room) => (
              <ReserveRoomItem
                key={room.id}
                room={room}
                house={houses.find((house) => house.id === room.houseId)}
                roomPictureUrl={
                  room.images[0]?.url
                    ? `https://api.gelenrest.ru${room.images[0].url}`
                    : alterPicture
                }
                days={calculateDays(checkInDate, checkOutDate)}
                calculatePrice={calculatePrice}
              />
            ))}

            {availableAparts.map((apart) => (
              <ReserveApartItem
                key={apart.id}
                apart={apart}
                apartPictureUrl={
                  apart.images[0]?.url
                    ? `https://api.gelenrest.ru${apart.images[0].url}`
                    : alterPicture
                }
                days={calculateDays(checkInDate, checkOutDate)}
                calculatePrice={calculatePrice}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
