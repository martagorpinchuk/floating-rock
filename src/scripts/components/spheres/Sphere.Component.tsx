import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SphereGfx } from '../../Sphere';

//

const SpheresConteiner = styled.canvas<{visible: boolean}>`
    display: ${( props ) => ( props.visible ? 'block' : 'none' ) };
`;

const sphere = new SphereGfx();

export const SpheresComponent = ({ visible }) => {

    const canvasRef = useRef( null );

    useEffect( () => {

        if ( canvasRef ) {

            sphere.init();

        }

    }, [ canvasRef ] );

    return(
        <SpheresConteiner visible={visible} className='webglViewSphere'>Sphere</SpheresConteiner>
    );

};
