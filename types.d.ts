import { StoreEnhancer } from 'redux'

declare global {
    interface Window {
        chatConfig: { wsEndpoint: string }
        __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer
    }
}
