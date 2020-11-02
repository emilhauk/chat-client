import React, { FunctionComponent } from 'react'
import { Message as MessageState } from '../../store/reducer/chat'
import styled, { css } from 'styled-components'

type Props = {
    message: MessageState
    direction: 'in' | 'out'
}

const Message: FunctionComponent<Props> = ({ message, direction }) => {
    return (
        <Wrapper direction={direction}>
            <Text>{message.text}</Text>
        </Wrapper>
    )
}

const Text = styled.p`
    padding: 0.35em;
    border-radius: 3px;
    line-height: 1.5;
    max-width: 60vw;

    @media screen and (max-width: 500px) {
        max-width: 85vw;
    }
`

const Wrapper = styled.div<Omit<Props, 'message'>>`
    display: flex;
    margin: 0.5rem 0;

    > ${Text} {
        ${props =>
            props.direction &&
            css`
                background: ${props.direction === 'in' ? 'floralwhite' : 'darkorange'};
            `}
    }

    ${props =>
        props.direction &&
        css`
            align-items: ${props.direction === 'in' ? 'begin' : 'end'};
            ${props.direction === 'out' &&
            css`
                flex-direction: row-reverse;
            `};
        `}
`

export default Message
