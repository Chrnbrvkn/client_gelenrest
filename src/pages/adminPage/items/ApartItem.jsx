import { useSelector, useDispatch } from 'react-redux';

export default function ApartItem({ apart, onDelete }) {

  const showForm = useSelector(state => state.tables.showForm['apartments']);
  const editItemId = useSelector(state => state.tables.editItemId);
  const dispatch = useDispatch();

  return (
    <div className="houses__list-item--content" key={apart.id}>
      <a className="houses__list-item">
        {apart.name}
      </a>
      <div className="home__redact-buttons">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_FORM', payload: 'apartments', editItemId: apart.id })}
          className="houses__list-update">
          Изменить
        </button>
        <button
          className="houses__list-delete"
          onClick={() => onDelete(apart.id)}>
          Удалить
        </button>
      </div>
    </div>
  )
};