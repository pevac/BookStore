import * as types from '../constants';  

const initialState = {
  collections: [],
  isFetching: false,
  isOpenCollectionForm: false,
  selectedCollection: {
    name: "",
    description: "",
    books: []
  }
}

export default function collectionsReducer(state = initialState, action) {  
  switch(action.type) {
    case types.DELETE_BOOK_FROM_COLLECTION_SUCCESS:
      let selectedCollection = Object.assign({}, action.collection) ;
      selectedCollection['books'] = selectedCollection.books.filter(value => value !== action.book._id);
      return {...state, 
        selectedCollection
      };
    case types.ADD_BOOK_TO_COLLECTION_SUCCESS:
      return {...state, 
        selectedCollection: action.collection
      };
    case types.SELECT_COLLECTION:
      return {...state, 
        selectedCollection: action.selectedCollection
      };
    case types.OPEN_COLLECTION_FORM:
      return {...state, 
        selectedCollection: action.selectedCollection, 
        isOpenCollectionForm: true
      };
    case types.CLOSE_COLLECTION_FORM:
        return {...state, 
          isOpenCollectionForm: false,
          selectedCollection: initialState.selectedCollection};
    case types.GET_COLLECTIONS_SUCCESS:
        return { ...state, 
          collections: action.collections,
          isFetching: false };
    case types.DELETE_COLLECTIONS_SUCCESS:
        const dcollections = state.collections.filter((value) => value._id !== action.id);
        return {...state, collections: dcollections, isFetching: false};
    case types.SAVE_COLLECTIONS_SUCCESS: 
        const sCollections = state.collections
        const index = sCollections.findIndex((value) => value._id === action.collection._id);
        index >=0 ? sCollections[index] = action.collection : sCollections.push(action.collection);
        return {...state, collections: sCollections,
          isFetching: false, 
          isOpenCollectionForm: false,
          selectedCollection: initialState.selectedCollection };
    case types.GET_COLLECTIONS_REQUEST:
    case types.SAVE_COLLECTIONS_REQUEST:
    case types.DELETE_COLLECTIONS_REQUEST:
    case types.ADD_BOOK_TO_COLLECTION_REQUEST:
    case types.DELETE_BOOK_FROM_COLLECTION_REQUEST:
        return {...state, isFetching: true};
    default: 
        return state;
  }
}