import styled from 'styled-components';

export const Container = styled.div`
    width: 200px;
    background-color: #ccc;
    height: 500px;

    .item {
        touch-action: none;
        user-select: none;
    }
`;

export const Object = styled.div`
    width: 48px;
    height: 48px;
    background-color: navy;
`;
