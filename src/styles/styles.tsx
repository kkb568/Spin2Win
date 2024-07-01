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

export const ActionButton = styled.button`
    border: none;
    width: 2.1em;
    height: 2.1em;
    border-radius: 20em;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.1),0 5px 5px 0 rgba(0,0,0,.2);
    font-size: 1em;
    font-family: 'Roboto';
    font-weight: 700;
    transition: 50ms ease-in;

    &:hover {
        transform: scale(1.1);
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

export const HotColdNumDiv = styled.div`
    width: .85em;
    height: .85em;
    border-radius: .7em;
    padding: .3em;
    box-shadow: 0 1px 8px 0 rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Adamina';
`

export const HotColdStatsDiv = styled.div`
    width: 22em;
    height: 7em;

    p {
        font-weight: bold;
        text-align: center;
    }

    img {
        width: 80px;
        height: 80px;
        margin-top: -2em;
    }
    
    span {
        display: flex;
        gap: 1em;
    }

    @media (max-width: 900px) {
        width: 33em;
    }

    @media (max-width: 600px) {
        width: 18em;
    }
`

export const WheelHeadBorder = styled.div`
    position: absolute;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 2px 5px #1c1c1c);

    div:first-child {
        border-radius: 50%;
        background: linear-gradient(315deg, #a96f44 0%, #f2ecb6 74%);
    }

    div:last-child {
        position: absolute;
    }
`

export const WheelHeadContent = styled.div`
    font-family: 'Adamina';
    color: white;
    border-radius: 50%;
    position: absolute;
    z-index: 10;
    text-align: center;
    display: table;
    border: 3px solid transparent;

    span {
        display: table-cell;
        vertical-align: middle;
    }
`