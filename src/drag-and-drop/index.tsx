import React from 'react';
import interact from 'interactjs';

import { Container } from './styled';
import DraggableSidebar from '../draggable-sidebar';

/** Interactjs
 * https://interactjs.io/
 * https://alligator.io/js/drag-and-drop-interactjs/
 * // TODO: Item must only be able to be dragged into dropzone
 * // TODO: resizing the window shouldn't move around the item
 * // TODO: Dragging item into dropzone should create a new duplicate item in the sidebar
 */

const DragAndDrop = ({ children }: { children: React.ReactElement | null }) => {
    interact('.dropzone').dropzone({
        accept: '.item'
    });

    const position = { x: 0, y: 0 };
    interact('.item').draggable({
        listeners: {
            start(event) {
                console.log(event.type, event.target);
            },
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
            })
        ]
    });

    return (
        <Container>
            <DraggableSidebar />
            <>{children}</>
        </Container>
    );
};

export default DragAndDrop;
