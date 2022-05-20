
import React from 'react';
import styled from 'styled-components';

//

const ViewCanvas = styled.canvas<{visible: boolean}>`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 10000%;
    bottom: 10px;

    display: ${( props ) => ( props.visible ? 'block' : 'none' ) };
`;

const handleOnWheel = () => { console. log('worked') };

export const ViewComponent = ({ visible }) => {

    return (
        <ViewCanvas visible={visible} className="webglView" onWheel={ handleOnWheel }/>
    );


};
