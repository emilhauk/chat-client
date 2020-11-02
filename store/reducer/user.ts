import { Reducer } from 'redux'
import { ActionTypes } from '../action/user'

export type User = {
    name?: string
    token?: Token
}

type Claims = {
    id: string
    name: string
    iat: number
    nvb: number
    exp: number
}

export type Token = {
    //claims: Claims
    jtw: string
}

export const userReducer: Reducer<User> = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.USER_SET:
            return payload
        default:
            return state
    }
}
