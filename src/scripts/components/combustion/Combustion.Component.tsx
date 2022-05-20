import React, { useState } from 'react';
import styled from 'styled-components';

//

const CombistionConteiner = styled.div<{visible: boolean}>`
    color: black;

    display: ${( props ) => ( props.visible ? 'block' : 'none' ) };
`;

export const CombustionComponent = ({ visible }) => {

    return(
        <CombistionConteiner visible={visible}>Combustion</CombistionConteiner>
    );

};
