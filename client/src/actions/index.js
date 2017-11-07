import * as types from '../constants';

function action(type, payload = {}) {
  return {type, ...payload}
}

export const getAllCollections = {
  request: () => action(types.GET_COLLECTIONS_REQUEST),
  success: (collections) => action(types.GET_COLLECTIONS_SUCCESS, { collections }),
  failure: (error) => action(types.GET_COLLECTIONS_FAILURE, { error }),
}

export const deleteCollection = {
  request: (id) => action(types.DELETE_COLLECTIONS_REQUEST, { id }),
  success: (id) => action(types.DELETE_COLLECTIONS_SUCCESS, { id }),
  failure: (error) => action(types.DELETE_COLLECTIONS_FAILURE, { error }),
}

export const saveCollection = {
  request: (collection) => action(types.SAVE_COLLECTIONS_REQUEST, { collection }),
  success: (collection) => action(types.SAVE_COLLECTIONS_SUCCESS, { collection }),
  failure: (error) => action(types.SAVE_COLLECTIONS_FAILURE, { error }),
}
export const deleteBookFromCollection = {
  request: (collection, book) => action(types.DELETE_BOOK_FROM_COLLECTION_REQUEST, { collection, book }),
  success: (collection, book) => action(types.DELETE_BOOK_FROM_COLLECTION_SUCCESS, { collection, book }),
  failure: (error) => action(types.DELETE_BOOK_FROM_COLLECTION_FAILURE, { error }),
}

export const addBookToCollection = {
  request: (collectionId, bookId) => action(types.ADD_BOOK_TO_COLLECTION_REQUEST, { collectionId, bookId }),
  success: (collection) => action(types.ADD_BOOK_TO_COLLECTION_SUCCESS, { collection }),
  failure: (error) => action(types.ADD_BOOK_TO_COLLECTION_FAILURE, { error }),
}

export const openCollectionForm = (selectedCollection) => action(types.OPEN_COLLECTION_FORM, { selectedCollection });
export const closeCollectionForm = () => action(types.CLOSE_COLLECTION_FORM)
export const selectCollection = (selectedCollection) => action(types.SELECT_COLLECTION, { selectedCollection });

export const getAllBooks = {
  request: () => action(types.GET_BOOKS_REQUEST),
  success: (books) => action(types.GET_BOOKS_SUCCESS, { books }),
  failure: (error) => action(types.GET_BOOKS_FAILURE, { error }),
}




