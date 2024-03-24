import EmptyListMessage from "../../../components/EmptyListMessage"


export default function RoomListHouseSelection({
  houses,
  onHouseSelect
}) {

  return (
    <div>
      <div>Выберите дом</div>
      {Array.isArray(houses) && houses.length > 0 ? (
        houses.map(house => (
          <div className="room__list-button" key={house.id}>
            <button onClick={() => onHouseSelect(house.id)}>
              {house.name}
            </button>
          </div>
        ))
      ) : (
        <EmptyListMessage />
      )}
    </div>
  )
};