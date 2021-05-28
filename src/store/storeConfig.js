import {createStore} from 'redux';
import rootReducer from '../reducers';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

//to persist the state in the local so ever after refresh the state persist
const historyPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['history']
};

const persistedReducer = persistReducer(historyPersistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor}
export default function storeConfig(initialState) {
    return createStore(persistedReducer,initialState);
}