import { User } from '../reducer/user'

export enum ActionTypes {
    USER_SET = "USER_SET"
}

export const setUser = (user: User) => ({
    type: ActionTypes.USER_SET,
    payload: user,
})
