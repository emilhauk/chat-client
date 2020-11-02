import store from '../store'
import { addMessage } from '../store/action/chat'
import { Message } from '../store/reducer/chat'

export const init = async () => {
    console.log('Init')
    const sender = await getWS()
    sender({
        command: 'chatlog',
        data: { text: '' },
    })
}

type Command = {
    command: string
}

type IncomingMessages = {
    messages: Message[]
} & Command

type OutgoingMessage = {
    data: Message
} & Command

export const sendMessage = async (text: string) => {
    const sender = await getWS()
    sender({
        command: 'sendmessage',
        data: { text },
    })
}

type Sender = (command: OutgoingMessage) => void

let retryCount = 0
let socket
const queue = []
const getWS = (): Promise<Sender> => {
    return new Promise(resolve => {
        if (!socket) {
            socket = new WebSocket(window.chatConfig.wsEndpoint)

            socket.addEventListener('open', evt => {
                retryCount = 0
                console.log('Socket open', evt, retryCount)
                resolve(sender)
                queue.forEach(i => i())
            })

            socket.addEventListener('message', evt => {
                const data = JSON.parse(evt.data)
                switch (data.command) {
                    case 'receivedmessage': {
                        const messages = <Message[]>data.messages
                        messages.forEach(message => store.dispatch(addMessage(message)))
                        break
                    }
                    case 'chatlog': {
                        const messages = <Message[]>data.messages
                        messages.forEach(message => store.dispatch(addMessage(message)))
                        break
                    }
                    default: {
                        console.warn('Unknown command', data)
                    }
                }
            })

            socket.addEventListener('close', evt => {
                console.log('Socket closed', evt)
                socket = null
                setTimeout(() => {
                    if (socket && socket === socket.OPEN) {
                        return
                    }
                    retryCount++
                    getWS()
                }, 1500 + retryCount * 100)
            })
        }
        if (socket.readyState === socket.OPEN) {
            resolve(sender)
        } else {
            queue.push(() => resolve(sender))
        }
    })
}

const reviveWS = async () => {
    console.log('Reviving websocket')
    getWS()
    setTimeout(async () => {
        if (socket && socket.readyState === socket.OPEN) {
            return
        }
        retryCount++
        reviveWS()
    }, 1000 + retryCount * 50)
}

const sender: Sender = message => {
    socket.send(JSON.stringify(message))
}
