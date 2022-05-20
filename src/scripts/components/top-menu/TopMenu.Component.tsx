
import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    useLocation,
    useNavigate
} from 'react-router-dom';

//

const TopMenu = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 60px;
    background-color: #100;
    opacity: 0.7;
    z-index: 16;
    color: white;
    padding-top: 7px;
`;

const TopPanel = styled.a`
	line-height: 50px;
	height: 100%;
    padding-left: 20px;
    padding-top: 6px;
	font-size: 1.24em;
	position: relative;
	z-index: 17;
	text-decoration: none;
	text-transform: uppercase;
	text-align: left;
	color: white;
	cursor: pointer;
`;

export const TopMenuComponent = () => {

    return (
        <TopMenu>

            <TopPanel href=''>Flat earth</TopPanel>

        </TopMenu>
    );

};
