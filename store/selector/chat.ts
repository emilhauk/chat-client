import { State } from '../index'

export const selectChat = (state: State) => {
    return state.chat
}
