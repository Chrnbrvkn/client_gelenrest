
export default function HouseItem({ handleEdit, house, onDelete }) {
  const TYPE = 'house'
  const handleClickEdit = () => {
    handleEdit(house.id, TYPE)
  }
  return (
    <div className="houses__list-item--content" key={house.id}>
      <a className="houses__list-item">
        {house.name}
      </a>
      <div className="home__redact-buttons">
        <button onClick={handleClickEdit}
          className="houses__list-update">
          Изменить
        </button>
        <button className="houses__list-delete" onClick={() => onDelete(house.id)}>
          Удалить
        </button>
      </div>
    </div>
  )
};