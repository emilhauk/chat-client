import { combineReducers, createStore } from 'redux'
import { Chat, chatReducer } from './reducer/chat'
import { User, userReducer } from './reducer/user'

const reducers = combineReducers({
    chat: chatReducer,
    user: userReducer,
})

export type State = {
    chat: Chat
    user: User
}

const initialState: State = {
    chat: [],
    user: null,
}

const store = createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store
