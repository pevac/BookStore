import { take, put, call, fork, select, all } from 'redux-saga/effects';
import  Api from '../api';
import * as types from '../constants';
import * as actions from '../actions'

let { getAllCollections, deleteCollection, saveCollection, getAllBooks, deleteBookFromCollection, addBookToCollection } = actions;

export function* loadCollections() {
    try {
        let records = yield call(Api.getAllRecords, Api.colletionsUrl);
        yield put(getAllCollections.success(records));
    } catch(error) {
        yield put(getAllCollections.failure(error));
    }
}

export function* deleteSagaCollection(id) {
    try {
        yield call(Api.deleteRecord, Api.colletionsUrl, id);
        yield put(deleteCollection.success(id));
    } catch(error) {
        yield put(deleteCollection.failure(error));
    }
}

export function* saveSagaCollection(collection) {
    try {
        let record = yield call(Api.saveRecord, Api.colletionsUrl, collection);
        yield put(saveCollection.success(record));
    } catch(error) {
        yield put(saveCollection.failure(error));
    }
}

export function* loadBooks() {
    try {
        let records = yield call(Api.getAllRecords, Api.booksUrl);
        yield put(getAllBooks.success(records));
    } catch(error) {
        yield put(getAllBooks.failure(error));
    }
}

export function* deleteSagaBookFromCollection(collectionId, bookId) {
    try {
        yield call(Api.deleteRecord, `${Api.colletionsUrl}/${collectionId}/${Api.booksUrl}`, bookId);
        yield put(deleteBookFromCollection.success(collectionId, bookId));
    } catch(error) {
        yield put(deleteBookFromCollection.failure(error));
    }
}

export function* addBookToSagaCollection(collectionId, bookId) {
    try {
        let record = yield call(Api.saveRecord, `${Api.colletionsUrl}/${collectionId}/${Api.booksUrl}`, { bookId });
        yield put(addBookToCollection.success(record));
    } catch(error) {
        yield put(addBookToCollection.failure(error));
    }
}

export function* watchForLoadCollections() {
    while(true) {
        yield take(types.GET_COLLECTIONS_REQUEST);
        yield fork(loadCollections);
    }
}

export function* watchForDeleteCollection() {
    while(true) {
        const { id } = yield take(types.DELETE_COLLECTIONS_REQUEST);
        yield fork(deleteSagaCollection, id);
    }
}

export function* watchForSaveCollection() {
    while(true) {
        const { collection } = yield take(types.SAVE_COLLECTIONS_REQUEST);
        yield fork(saveSagaCollection, collection);
    }
}

export function* watchForLoadBooks() {
    while(true) {
        yield take(types.GET_BOOKS_REQUEST);
        yield fork(loadBooks);
    }
}

export function* watchForDeleteBookFromCollection() {
    while(true) {
        const { collectionId, bookId } = yield take(types.DELETE_BOOK_FROM_COLLECTION_REQUEST);
        yield fork(deleteSagaBookFromCollection, collectionId, bookId);
    }
}
export function* watchForAddBookToCollection() {
    while(true) {
        const { collectionId, bookId } = yield take(types.ADD_BOOK_TO_COLLECTION_REQUEST);
        yield fork(addBookToSagaCollection, collectionId, bookId);
    }
}

export default function* root() {
    yield all([
        fork(watchForLoadCollections),
        fork(watchForDeleteCollection),
        fork(watchForSaveCollection),
        fork(watchForLoadBooks),
        fork(watchForDeleteBookFromCollection),
        fork(watchForAddBookToCollection),
      ])
}