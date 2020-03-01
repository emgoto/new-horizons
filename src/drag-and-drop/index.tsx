import React from 'react';
import interact from 'interactjs';

import { Container } from './styled';

/** Interactjs
 * https://interactjs.io/
 * https://alligator.io/js/drag-and-drop-interactjs/
 */

const DragAndDrop = ({ children, width }: { children: React.ReactElement[] | null; width: number }) => {
    const position = { x: 0, y: 0 };

    interact('.item')
        .draggable({
            manualStart: true,
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
        })
        // We have set manualStart to true so move won't be triggered unless we do it below
        .on('move', function(event) {
            const { currentTarget, interaction } = event;
            let element = currentTarget;

            // If we are dragging an item from the sidebar, its transform value will be ''
            // We need to clone it, and then start moving the clone
            if (interaction.pointerIsDown && !interaction.interacting() && currentTarget.style.transform === '') {
                element = currentTarget.cloneNode(true);
                const sidebar = document.querySelector('.sidebar');

                // TODO: The problem at the moment is that each time we appendChild it does it further down the sidebar
                // This is because it thinks all of the other elements are still there (even though they have been placed on the map)
                // Probably need some sort of css or absolute positioning to make sure item is placed where it needs to be
                sidebar && sidebar.appendChild(element);

                const { offsetTop, offsetLeft } = currentTarget;
                position.x = offsetLeft;
                position.y = offsetTop;
            } else if (currentTarget.style.transform) {
                // If we are moving an already existing item, we need to make sure the position object is correct
                const regex = /\.*translateZ\((.*)px\)/i;
                const transform = regex.exec(currentTarget.style.transform);

                // TODO: I don't know if this is right, I'm seeing some weird behaviour
                if (transform && transform.length > 1) {
                    position.x = Number(transform[0]);
                    position.y = Number(transform[1]);
                }
            }

            interaction.start({ name: 'drag' }, event.interactable, element);
        });

    interact('.canvas-dropzone').dropzone({
        accept: '.item',
        // Only gets called when at least half of the object is in the dropzone
        ondrop: function(event) {
            console.log('dropped', event);
        }
    });

    return (
        <Container className="restricted-dropzone" width={width}>
            <>{children}</>
        </Container>
    );
};

export default DragAndDrop;
