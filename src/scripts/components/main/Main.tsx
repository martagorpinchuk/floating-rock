
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import BottomMenuComponent from '../bottom-menu';
import { TopMenuComponent } from '../top-menu/TopMenu.Component';
import ViewComponent from '../view';
import ItemComponent from '../items';
import FormComponent from '../form';

//

export const MainComponent = () => {

    const dispatch = useDispatch();
    // Game.dispatch = dispatch;

    const appInited = useSelector( ( state ) => state.application.inited );

    // example
    console.log( 'isAppInited:' + appInited );

    let wheel = (e) => {
        console.info('x' + e.deltaX);
        console.info('y' + e.deltaY);
        console.info('z' + e.deltaZ);
        console.info('mode' + e.deltaMode);
    }

    // const divStyle = {
    //     width: '100px',
    //     height: '1000px',
    //     overflow: 'scroll',
    // };

    const Div = styled.div`
        position: absolute;
        // bottom: -40px;
        // left: 45%;
        width: 100%;
        height: 3000px;
        background-color: #fff3d1;
        // opacity: 0.5;
        // z-index: 1000;
        // border-radius: 10px;
        // color: red;
        // height: 70000%,
        // overflow: scroll
        // display: grid;
        // justify-content: center;
    `;

    const CenteredDiv = styled.div`
        // display: grid;
        // justify-content: center;
    `

    const handleOnWheel = () => { console. log('worked') };

    //

    return (

        <Div>
            <TopMenuComponent />
            <ViewComponent />
            {/* <BottomMenuComponent /> */}
            {/* <ItemComponentStyled> */}
                <ItemComponent />
            {/* </ItemComponentStyled> */}
            {/* <CenteredDiv> */}
                <FormComponent />
            {/* </CenteredDiv> */}
        </Div>

    );

};
