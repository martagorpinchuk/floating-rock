import React, { useState } from 'react';
import styled from 'styled-components';

//

const FogConteiner = styled.div<{visible: boolean}>`
    color: green;
    position: static;
    // text-align: center;
    // margin-top: 20px;

    display: ${( props ) => ( props.visible ? 'block' : 'none' ) };
`;

export const FogComponent = ({ visible }) => {

    return(
        <FogConteiner visible={visible}>Fog</FogConteiner>
    );

};