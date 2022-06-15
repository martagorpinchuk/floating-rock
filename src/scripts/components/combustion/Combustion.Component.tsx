import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CombustionGfx } from '../../Combustion';

//

const CombistionConteiner = styled.canvas<{visible: boolean}>`
    color: black;

    display: ${( props ) => ( props.visible ? 'block' : 'none' ) };
`;

const combustion = new CombustionGfx();

export const CombustionComponent = ({ visible }) => {

    const canvasRef = useRef( null );

    useEffect( () => {

        if ( canvasRef ) {

            combustion.init();

        }

    }, [ canvasRef ] );

    return(
        <CombistionConteiner visible={visible} className='webglViewCombustion'>Combustion</CombistionConteiner>
    );

};
