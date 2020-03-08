import React from 'react';

import { Container, Object } from './styled';
import HouseImage from '../assets/nl-villager-house.png';

const DraggableSidebar = () => {
    return (
        <Container className="sidebar">
            <div className="item">
                <img width="32" height="32" src={HouseImage} />
            </div>
        </Container>
    );
};

export default DraggableSidebar;
