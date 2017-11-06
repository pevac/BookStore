import * as types from '../constants';  

const initialState = {
  books: [],
  isFetching: false
}

export default function booksReducer(state = initialState, action) {  
  switch(action.type) {
    case types.GET_BOOKS_SUCCESS:
        return { ...state, 
          books: action.books,
          isFetching: true };
    default: 
        return state;
  }
}