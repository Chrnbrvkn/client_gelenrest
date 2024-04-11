import EmptyListMessage from "../../../components/EmptyListMessage"
// import ErrorMessage from "../../../components/ErrorMessage"
import LoadingSpinner from '../../../components/LoadingSpinner'
import { useSelector } from 'react-redux'

export default function RoomListHouseSelection({
  houses,
  onHouseSelect
}) {
  const isLoading = useSelector(state => state.loading.isLoading)
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <p>Выберите дом</p>
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
      )}
    </>
  )
};