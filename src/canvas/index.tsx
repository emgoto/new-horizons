import React, { useRef, useEffect } from 'react';

import { Container } from './styled';

const BLUE = '#AED9BD';
const DARK_GREEN = '#5D9359';
const YELLOW = '#E2E3A7';
const GREY = '#7C8B92';
const BROWN = '#DFA17A';

const colors = [BLUE, DARK_GREEN, YELLOW, GREY, BROWN];

const randomisedTiles = (height: number, width: number) => {
    const map: string[][] = [];
    let heightCounter = 0;
    while (heightCounter < height / 8) {
        let widthCounter = 0;
        map[heightCounter] = [];
        while (widthCounter < width / 8) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            map[heightCounter][widthCounter] = randomColor;
            widthCounter++;
        }
        heightCounter++;
    }

    return map;
};

type Props = {
    width: number;
    height: number;
    tileSize: number;
};

const Canvas = ({ width, height, tileSize }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef || !canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const yCoords = randomisedTiles(width, height);
        yCoords.forEach((yCoord, yIndex) => {
            yCoord.forEach((xCoord, xIndex) => {
                ctx.fillStyle = xCoord;
                ctx.beginPath();
                ctx.fillRect(xIndex * tileSize, yIndex * tileSize, tileSize, tileSize);
                ctx.stroke();
            });
        });
    });

    return (
        <Container width={width} height={height}>
            <canvas ref={canvasRef} width={width} height={height} className="dropzone" />
        </Container>
    );
};

export default Canvas;
