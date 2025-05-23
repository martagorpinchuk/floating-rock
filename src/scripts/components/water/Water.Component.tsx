import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Water } from '../../Water';

//

const WaterConteiner = styled.canvas<{visible: boolean}>`
    display: ${( props ) => ( props.visible ? 'block' : 'none' ) };
`;

const water = new Water();

export const WaterComponent = ({ visible }) => {

    const canvasRef = useRef( null );

    useEffect( () => {

        if ( canvasRef ) {

            water.init();

        }

    }, [ canvasRef ] );

    useEffect( () => {

        if ( visible ) {

            if( water ) water.renderScene = true;

        } else {

            if( water ) water.renderScene = false;

        }

    }, [ visible ] );

    return(
        <WaterConteiner visible={visible} className='webglViewWater'>Water</WaterConteiner>
    );

};
