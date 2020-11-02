import React, { FormEvent, FunctionComponent, useCallback } from 'react'
import { sendMessage } from '../../service/api'
import Button from '../common/button'
import styled from 'styled-components'

const MessageComposer: FunctionComponent = () => {
    const send = useCallback((evt: FormEvent) => {
        evt.preventDefault()
        const form = evt.target as HTMLFormElement
        const messageBox = form.elements.namedItem('message')
        if (!(messageBox instanceof HTMLInputElement)) {
            console.error('Could not find expeted messageBox', evt, messageBox)
            return
        }
        const text = messageBox.value.trim()
        if (text.length > 0) {
            sendMessage(text)
        }
        messageBox.value = ''
    }, [])
    return (
        <MessageForm onSubmit={send}>
            <MessageBox type="text" name="message" placeholder="Write message.." />
            <SendButton type="submit" primary>
                Send
            </SendButton>
        </MessageForm>
    )
}

const MessageForm = styled.form`
    display: flex;
`

const MessageBox = styled.input`
    flex-grow: 1;
`

const SendButton = styled(Button)`
    margin-right: 0;
`

export default MessageComposer
