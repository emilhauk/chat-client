import styled, { css } from 'styled-components'

type ButtonProps = {
    primary?: boolean
}

const Button = styled.button<ButtonProps>`
    background-color: transparent;
    border-radius: 3px;
    border: 2px solid darkorange;
    color: darkorange;
    margin: 0 1em;
    padding: 0.25em 1em;
    font-weight: bold;

    ${props =>
        props.primary &&
        css`
            background-color: darkorange;
            color: white;
        `}
`

export default Button
