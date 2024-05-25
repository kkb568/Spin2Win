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

export const PlayButton = styled.button`
    background-color: transparent;
    color: white;
    padding: .5em 1em;
    font-family: 'Adamina';
    text-transform: uppercase;
    border: 2px solid white;
    display: flex;
    justify-content: center;

    div:first-of-type {
        display: none;
    }

    &:hover {
        border-color: yellow;

        div:first-of-type {
            display: block;
        }
    }
`

export const Diamond = styled.div`
    position: absolute;
    clip-path: polygon(50% 5%,100% 50%,50% 95%,0 50%);
    display: flex;
    align-items: center;
    justify-content: center;
`

export const FooterButton = styled.button`
    width: 4em;
    height: 1.6em;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 2px;
    position: relative;

    a {
        position: absolute;
        width: 100%;
        height: 100%;
        text-decoration: none;

        &:hover {
            background-color: rgba(95, 95, 95, 0.1);
        }
    }

    span {
        font-size: 1.2em;
        color: white;
    }
`

export const PayTableGridSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3em;
`