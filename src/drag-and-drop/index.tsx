import React from 'react';
import interact from 'interactjs';

import { Container } from './styled';

/** Interactjs
 * https://interactjs.io/
 * https://alligator.io/js/drag-and-drop-interactjs/
 * // TODO: Dragging item into dropzone should create a new duplicate item in the sidebar
 */

const DragAndDrop = ({ children, width }: { children: React.ReactElement[] | null; width: number }) => {
    const position = { x: 0, y: 0 };

    interact('.item').draggable({
        listeners: {
            move(event) {
                position.x += event.dx;
                position.y += event.dy;
                event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
            }
        },
        modifiers: [
            interact.modifiers.snap({
                targets: [interact.createSnapGrid({ x: 8, y: 8 })],
                range: Infinity,
                relativePoints: [{ x: 0, y: 0 }]
            }),
            interact.modifiers.restrict({
                restriction: '.restricted-dropzone',
                endOnly: false
            })
        ]
    });

    interact('.canvas-dropzone').dropzone({
        accept: '.item',
        // Only gets called when at least half of the object is in the dropzone
        ondrop: function() {
            console.log('dropped');
        }
    });

    return (
        <Container className="restricted-dropzone" width={width}>
            <>{children}</>
        </Container>
    );
};

export default DragAndDrop;
