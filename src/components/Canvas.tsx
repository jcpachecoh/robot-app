import React, { useRef, useEffect } from 'react';

interface CanvasProps {
    width: number;
    height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const context =  canvasRef?.current?.getContext('2d');
            if (context) {
                context.beginPath();
                context.rect(0, 0, width, height);
                context.arc(10, 10, 10, 0, 2 * Math.PI);
                context.fill();
            }
        }
    },[]);

    return <canvas ref={canvasRef} height={height} width={width} />;
};


export default Canvas;
