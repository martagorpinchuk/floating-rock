
import React from 'react';
import styled from 'styled-components';

//

const BottomMenu = styled.button`
    position: absolute;
    bottom: 20px;
    left: 45%;
    width: 10%;
    height: 100px;
    background-color: #000;
    opacity: 0.5;
    z-index: 100;
    border-radius: 10px;
`;

export const BottomMenuComponent = () => {

    return (
        <BottomMenu />
    );

};
