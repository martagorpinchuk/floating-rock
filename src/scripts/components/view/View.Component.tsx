
import React from 'react';
import styled from 'styled-components';

//

const ViewCanvas = styled.canvas`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height:70000%;
    bottom: 10px;
`;

const handleOnWheel = () => { console. log('worked') };

export const ViewComponent = () => {

    return (
        <ViewCanvas className="webglView" onWheel={ handleOnWheel }/>
    );


};
