import { Reducer } from 'redux'
import { ActionTypes } from '../action/chat'

export type Chat = Message[]

export type Message = {
    text: string
}

export const chatReducer: Reducer<Chat> = (state = [], { type, payload }) => {
    switch (type) {
        case ActionTypes.CHAT_ADD_MESSAGE:
            return [...state, payload]
        default:
            return state
    }
}
