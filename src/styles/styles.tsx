// The file contains styles used globally or in more than one component.

import { injectGlobal } from "@emotion/css"
import Roboto from '../fonts/Roboto-Regular.ttf'
import styled from "@emotion/styled";
import Adamina from '../fonts/Adamina-Regular.ttf';

injectGlobal`
    @font-face {
        font-family: 'Roboto';
        src: url(${Roboto});
    }
`

injectGlobal`
    @font-face {
        font-family: 'Adamina';
        src: url(${Adamina});
    }
`

export const ButtonFontStyle = {
    fontSize: '18px'
}

export const Button = styled.button`
    cursor: pointer;
    background-color: transparent;
    color: white;
    padding: .5em 1em;
    font-family: 'Adamina';
    text-transform: uppercase;
    border: 2px solid white;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: rgba(255, 255, 255, .5);
        border-color: yellow;
    }
`