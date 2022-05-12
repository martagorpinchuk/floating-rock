
import React from 'react';
import {
    BrowserRouter as Router,
    // Switch,
    Route,
    Routes,
    Link,
} from 'react-router-dom';
import Switch from "react-switch";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import BottomMenuComponent from '../bottom-menu';
import { TopMenuComponent } from '../top-menu/TopMenu.Component';
import ViewComponent from '../view';
import ItemComponent from '../items';
import FormComponent from '../form';
import { FooterComponent } from '../footer/Footer.Component';
import { FogComponent } from '../fog/Fog.Component';
import { WaterComponent } from '../water/Water.Component';
import { CombustionComponent } from '../combustion/Combustion.Component';

//

const Div = styled.div`
    position: absolute;
    // bottom: -40px;
    // left: 45%;
    width: 100%;
    height: 3092px;
    background-color: #edb27b;
    // opacity: 0.5;
    // z-index: 1000;
    // border-radius: 10px;
    // color: red;
    // height: 70000%,
    // overflow: scroll
    // display: grid;
    // justify-content: center;
`;

const Menu = styled.button`
    display: grid;
    justify-content: center;
    z-index: 4000;
`;

export const MainComponent = () => {

    const dispatch = useDispatch();
    // Game.dispatch = dispatch;

    const appInited = useSelector( ( state ) => state.application.inited );

    // example
    console.log( 'isAppInited:' + appInited );

    //

    return (
        <Router>
            <Div>
                <Menu>
                    <button><Link to='/'>Home</Link></button>
                    <button><Link to='/water'>Water</Link></button>
                    <button><Link to='/fog'>Fog</Link></button>
                    <button><Link to='/combustion'>Combustion</Link></button>
                </Menu>
                <Routes>
                    <Route path='/' element={ <ViewComponent/> }/>
                    <Route path='/water' element={ <WaterComponent/> }/>
                    <Route path='/fog' element={ <FogComponent/> }/>
                    <Route path='/combustion' element={ <CombustionComponent/> }/>
                    {/* <Route path='/face' element={ <FaceComponent/> }/> */}
                </Routes>
                <TopMenuComponent />

                {/* <ViewComponent /> */}
                {/* <BottomMenuComponent /> */}
                <ItemComponent />
                <FormComponent />
                <FooterComponent />
            </Div>
        </Router>
    );

};
