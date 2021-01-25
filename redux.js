// Redux initial state
const initState = (function() {
  try {
    const data = localStorage.getItem('todoState');
    if (data && data !== 'undefined' && data !== 'null') {
      return JSON.parse(data);
    } // if statement
    return [];
  } // try statement
  catch (e) {
    return [];
  } // catch statement
})(); // init state function

// Redux actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const ARCHIVE_TODO = 'ARCHIVE_TODO';
const CHANGE_TITLE = 'CHANGE_TITLE';

// Redux action creators
const addTodoAction = (title, desc) => {
  return {
    type: ADD_TODO,
    payload: {
      id: getId(),
      desc: desc,
      title: title,
      createdAt: getCurrentDate(),
    } // payload object
  }; // return object
}

const changeTitleAction = (id, title) => {
  return {
    type: CHANGE_TITLE,
    payload: {id, title},
  };
};

const toggleTodoAction = (id) => {
  return {
    type: TOGGLE_TODO,
    payload: {id},
  }
};

const deleteTodoAction = (id) => ({
  type: DELETE_TODO,
  payload: {id},
});

const editTodoAction = (id, desc) => ({
  type: EDIT_TODO,
  payload: {id, desc},
});

const archiveTodoAction = (id) => ({
  type: ARCHIVE_TODO,
  payload: {id},
});

// Redux reducers
const todosReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.payload.id,
          desc: action.payload.desc,
          isComplete: false,
          createdAt: action.payload.createdAt,
          isEdited: false,
          isArchived: false,
          title: action.payload.title,
        }
      ];
    
    case 'ARCHIVE_TODO':
      return (
        state.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              isArchived: true,
              isComplete: true,
            }; // todo object
          } // if statement
          return todo;
        }) // map function
      );
    
    case 'CHANGE_TITLE':
      return (
        state.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              title: action.payload.title,
            }; // todo object
          } // if statement
          return todo;
        }) // map function
      );
    
    case 'TOGGLE_TODO':
      return (
        state.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              isComplete: !todo.isComplete,
            } // object
          } // if statement
          return todo;
        }) // map function
      );
    
    case 'DELETE_TODO':
      return (
        state.filter(todo => todo.id !== action.payload.id)
      );
    
    case 'EDIT_TODO':
      return (
        state.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              desc: action.payload.desc,
              isEdited: true,
            } // object
          } // if statement
          return todo;
        }) // map
      );

    default:
      return state;
  } // switch statement
};

const reducers = Redux.combineReducers({
  todosReducer
});

// Redux store
const store = Redux.createStore(reducers);

const countWathcer = store.subscribe(() => {
  let state = store.getState().todosReducer;
  if (state.length === 0)
    count = 0;
  
  localStorage.setItem('todoState', JSON.stringify(state));
  localStorage.setItem('lastIdCount', count);
});