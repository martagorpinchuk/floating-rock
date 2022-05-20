
import React, { useState } from 'react';
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
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";

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

const TopPanelLeft = styled.div`
    line-height: 50px;
    height: 2.1%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 9px;
    font-size: 1.2em;
    position: relative;
    z-index: 100;
    text-decoration: none;
    text-transform: uppercase;
    text-align: left;
    color: white;
    cursor: pointer;
    float: right;
    opacity: 0.8;
`;

export const MainComponent = () => {

    const dispatch = useDispatch();
    // Game.dispatch = dispatch;

    const appInited = useSelector( ( state ) => state.application.inited );

    // example
    console.log( 'isAppInited:' + appInited );

    //
    const [ path, setPath ] = useState('/');
    //

    const HomeClick = () => { setPath('/') };
    const WaterClick = () => { setPath('/water') };
    const FogClick = () => { setPath('/fog') };
    const CombustionClick = () => { setPath('/combustion') };

    return (
        <Div>
            {/* <Router> */}
                <TopMenuComponent />
                <ViewComponent visible={ path === '/' } />
                <WaterComponent visible={ path === '/water' }/>
                <FogComponent visible={ path === '/fog' }/>
                <CombustionComponent visible={ path === '/combustion' }/>

                <TopPanelLeft onClick={HomeClick}>Home</TopPanelLeft>
                <TopPanelLeft onClick={WaterClick}>Water</TopPanelLeft>
                <TopPanelLeft onClick={FogClick}>Fog</TopPanelLeft>
                <TopPanelLeft onClick={CombustionClick}>Combustion</TopPanelLeft>

                {/* <Routes>
                    <Route  path="/" element={ <ViewComponent/> } />
                    <Route path="/water" element={ <WaterComponent/> } />
                    <Route path="/fog" element={ <FogComponent/> } />
                    <Route path="/combustion" element={ <CombustionComponent/> } />
                </Routes> */}
            {/* </Router> */}
            <ItemComponent />
            <FormComponent />
            <FooterComponent />
        </Div>
    );

};
