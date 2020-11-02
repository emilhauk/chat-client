import { selectChat } from '../../store/selector/chat'
import { useSelector } from 'react-redux'
import React, { FunctionComponent } from 'react'
import Message from '../message'
import MessageComposer from '../messageComposer'
import styled from 'styled-components'

const Chat: FunctionComponent = () => {
    const chat = useSelector(selectChat)
    return (
        <>
            <BottomScroller>
                <MessageList>
                    {chat.map((message, index) => (
                        <Message
                            key={index}
                            message={message}
                            // TODO: Actual direction needed
                            direction={Math.random() * 100 + 1 > 20 ? 'in' : 'out'}
                        />
                    ))}
                </MessageList>
            </BottomScroller>
            <MessageComposer />
        </>
    )
}

/**
 * This keeps the scroller at the bottom of the screen
 * column-reverse is the trick there.
 * Was put in its own wrapper so not to affect message order
 */
const BottomScroller = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column-reverse;
    overflow-y: auto;
`

const MessageList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

export default Chat
