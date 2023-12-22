
export default function ApartItem({ handleEdit, apart, onDelete }) {
  const TYPE = 'apart'
  const handleClickEdit = () => {
    handleEdit(apart.id, TYPE)
  }
  return (
    <div key={apart.id}>
      <a className="houses__list-item">
        {apart.name}
      </a>
      <div className="home__redact-buttons">
        <button onClick={handleClickEdit}
          className="houses__list-update">
          Изменить
        </button>
        <button className="houses__list-delete" onClick={() => onDelete(apart.id)}>
          Удалить
        </button>
      </div>
    </div>
  )
};