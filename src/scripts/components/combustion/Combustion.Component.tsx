import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CombustionGfx } from '../../Combustion';

//

const CombistionConteiner = styled.canvas<{visible: boolean}>`
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

    useEffect( () => {

        if ( visible ) {

            if( combustion ) combustion.renderScene = true;

        } else {

            if( combustion ) combustion.renderScene = false;

        }

    }, [ visible ] );

    return(
        <CombistionConteiner visible={visible} className='webglViewCombustion'>Combustion</CombistionConteiner>
    );

};
