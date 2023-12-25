// Chúng ta sẽ cấu hình sử dụng redux thunk và redux-devtools-extension trong store.js của redux

// Để sử dụng được bất đồng bộ (async await) trong redux chúng ta phải sử dụng 
// 1 middleware trung gian bởi vì bản thân thằng redux không hỗ trợ bất đồng bộ
// Đó chính là lý do redux thunk và redux-saga ra đời để hỗ trợ chúng ta

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
);
export default store;