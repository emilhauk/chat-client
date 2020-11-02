import { State } from '../index'

export const selectToken = (state: State) => state.user?.token
