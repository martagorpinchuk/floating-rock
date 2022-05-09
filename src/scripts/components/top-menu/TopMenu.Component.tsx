
import React from 'react';
import styled from 'styled-components';

//

const TopMenu = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 60px;
    background-color: #100;
    opacity: 0.2;
    z-index: 100;
`;

export const TopMenuComponent = () => {

    return (
        <TopMenu />
    );

};
