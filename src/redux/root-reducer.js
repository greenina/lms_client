import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/auth.reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["authList"],
  };

const rootReducer = combineReducers({
  authList: authReducer,
});

export default persistReducer(persistConfig, rootReducer)