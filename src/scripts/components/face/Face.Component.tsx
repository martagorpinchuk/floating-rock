import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaceGfx } from '../../Face';

//

const FaceConteiner = styled.canvas<{visible: boolean}>`
    display: ${( props ) => ( props.visible ? 'block' : 'none' ) };
`;

const face = new FaceGfx();

export const FaceComponent = ({ visible }) => {

    const canvasRef = useRef( null );

    useEffect( () => {

        if ( canvasRef ) {

            face.init();

        }

    }, [ canvasRef ] );

    useEffect( () => {

        if ( visible ) {

            if( face ) face.renderScene = true;

        } else {

            if( face ) face.renderScene = false;

        }

    }, [ visible ] );

    return(
        <FaceConteiner visible={visible} className='webglViewFace'>Combustion</FaceConteiner>
    );

};
