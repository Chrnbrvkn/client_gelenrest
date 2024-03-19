

const initialState = {
  selectedTable: '',
  showForm: {
    booking: false,
    houses: false,
    apartments: false,
    rooms: false,
  },
};

function tablesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_TABLE':
      return {
        ...state,
        selectedTable: action.payload,
      };
    case 'TOGGLE_FORM':
      return {
        ...state,
        showForm: {
          ...state.showForm,
          [action.payload]: !state.showForm[action.payload],
        },
        editItemId: action.editItemId || null, // Устанавливаем или очищаем ID редактируемого элемента
      };
    case 'SET_EDIT_ITEM_ID':
      return {
        ...state,
        editItemId: action.payload, // Устанавливаем ID редактируемого элемента
      };
    default:
      return state;
  }
}


export default tablesReducer;
