
import React from 'react';
import styled from 'styled-components';

//

const TopMenu = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 60px;
    background-color: #100;
    opacity: 0.4;
    z-index: 106;
    color: white;
`;

const Logo = styled.a`
	line-height: 50px;
	height: 100%;
    padding-left: 20px;
    padding-top: 6px;
	font-size: 25px;
	display: inline-block;
	position: relative;
	z-index: 1;
	text-decoration: none;
	text-transform: uppercase;
	text-align: center;
	color: white;
	cursor: pointer;
`;

export const TopMenuComponent = () => {

    return (
        <TopMenu>

            <Logo href=''>Flat earth</Logo>

        </TopMenu>
    );

};
