import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import FogScene from '../../Fog';

//

const FogConteiner = styled.canvas<{visible: boolean}>`
    position: static;
    display: ${( props ) => ( props.visible ? 'block' : 'none' ) };
`;

const fog = new FogScene();

export const FogComponent = ({ visible }) => {

    const canvasRef = useRef( null );

    useEffect( () => {

        if ( canvasRef ) {

            fog.init();

        }

    }, [ canvasRef ] );

    useEffect( () => {

        if ( visible ) {

            if( fog ) fog.renderScene = true;

        } else {

            if( fog ) fog.renderScene = false;

        }

    }, [ visible ] );

    //

    return (
        <FogConteiner ref={ canvasRef } visible={visible} className="webglViewFog" />
    );

};