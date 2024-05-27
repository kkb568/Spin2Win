import { green, wheelSequence } from "../data/data";
import { assignBackgroundColor } from "./chipUtils";

export function wheelDraw (
    ctx: CanvasRenderingContext2D,
    ref: React.MutableRefObject<HTMLCanvasElement>
){
    const width = ref.current.width;
    ctx.clearRect(0, 0, width, width);
    ctx.canvas.width = ref.current.clientWidth;
    ctx.canvas.height = ref.current.clientHeight;

    const center = width/2;

    for (let i = 0; i < wheelSequence.length; i++) {
        /* For the item that is equal to zero, show the green color, 
        otherwise, show its respective color.*/
        const backgroundColor: string = wheelSequence[i] === 0 ? green 
        : assignBackgroundColor(wheelSequence[i]);

        /* The rotateAngle shows by which angle each item should rotate by.
        It's calculated by the formula: (360/array length) x item's index.
        For example, the fifth item's rotateAngle is: (360/37) x 4 = 31.9189 degrees */
        const sliceDeg: number = 360/(wheelSequence.length);
        const rotateAngle: number = sliceDeg*(wheelSequence.indexOf(wheelSequence[i]));

        drawSlice(rotateAngle, sliceDeg, backgroundColor, ctx, center);
        if (wheelSequence[i] !== 0) {
            insertNum(rotateAngle, center, wheelSequence[i].toString(), ctx);
        }
    }
}

// The function is used to draw the slices for the roulette wheel.
function drawSlice(deg: number,
    sliceDeg: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    center: number
) {

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(center, center);
    ctx.arc(center, center, center, degRad(deg), degRad(deg + sliceDeg));
    ctx.lineTo(center, center);
    ctx.fill();
}

/* The function is used to insert the numbers for each of 
the slices in the roulette wheel. */
function insertNum(deg: number,
    center: number, 
    num: string,
    ctx: CanvasRenderingContext2D
) {
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(degRad(deg));
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = '1.2em Adamina';
    ctx.fillText(num, 215, 26);
    ctx.restore();
}

// The function is used to convert degrees to radians (which is used in canvas element).
function degRad(deg: number) {
    return deg * Math.PI/180;
}