import React, { useState } from 'react';
import styled from 'styled-components';

//

const WaterConteiner = styled.div<{visible: boolean}>`
    color: red;

    display: ${( props ) => ( props.visible ? 'block' : 'none' ) };
`;

export const WaterComponent = ({ visible }) => {

    return(
        <WaterConteiner visible={visible}>Water</WaterConteiner>
    );

};
