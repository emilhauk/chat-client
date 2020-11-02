import { Message } from '../reducer/chat'

export enum ActionTypes {
    CHAT_ADD_MESSAGE = 'CHAT_ADD_MESSAGE',
}

export const addMessage = (message: Message) => ({
    type: ActionTypes.CHAT_ADD_MESSAGE,
    payload: message,
})
