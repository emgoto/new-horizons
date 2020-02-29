import React from 'react';
import Canvas from './canvas';
import DragAndDrop from './drag-and-drop';
import './App.css';

// Animal crossing map is 7 x 6 acres, and each acre is 16x16 square tiles of size 8px
const TILE_SIZE = 8;
const WIDTH = 7 * 16 * TILE_SIZE;
const HEIGHT = 6 * 16 * TILE_SIZE;

function App() {
    return (
        <div>
            <DragAndDrop>
                <Canvas width={WIDTH} height={HEIGHT} tileSize={TILE_SIZE} />
            </DragAndDrop>
        </div>
    );
}

export default App;
