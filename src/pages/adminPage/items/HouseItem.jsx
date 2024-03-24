
export default function HouseItem({ house, onEdit, onDelete }) {

  
  return (
    <div className="houses__list-item--content" key={house.id}>
      <a className="houses__list-item">
        {house.name}
      </a>
      <div className="home__redact-buttons">
        <button onClick={onEdit}
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