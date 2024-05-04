import { css } from "@emotion/css"

export default function ActionSection() {
    return (
        <div className={actionSectionStyle}> 
            <button>
                <i className="fa-solid fa-rotate-right"></i>
            </button><br/>
            <button>x2</button><br/>
            <button>
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </button><br/>
            <button>
                <i className="fa-solid fa-trash-can"></i>
            </button>
        </div>
    )
}


const actionSectionStyle = css`
    position: absolute;
    margin-left: 44em;
    margin-top: -21em;
    
    button {
        background-color: rgba(255,255,255,.35);
        color: rgba(255,255,255,.5);
        border: none;
        width: 2.1em;
        height: 2.1em;
        border-radius: 20em;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.1),0 5px 5px 0 rgba(0,0,0,.2);
        font-size: 1em;
        font-family: 'Roboto';
    }
`