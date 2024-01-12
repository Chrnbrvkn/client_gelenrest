
export default function RoomListHouseSelection({
  houses,
  handleSelectHouse
}) {

  return (
    <div>
      <div>Выберите дом</div>
      {Array.isArray(houses) && houses.length > 0 ? (
        houses.map(house => (
          <div className="room__list-button" key={house.id}>
            <button onClick={() => handleSelectHouse(house.id)}>
              {house.name}
            </button>
          </div>
        ))
      ) : (
        <div>Список домов пуст</div>
      )}
    </div>
  )
};