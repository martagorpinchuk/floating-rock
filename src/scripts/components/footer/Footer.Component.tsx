import React, { useState } from 'react';
import styled from 'styled-components';

//

const FooterConteiner = styled.div`
    // display: grid;
    // justify-content: center;
    // grid-template-columns: auto auto auto;
    padding-top: 13px;
    height: 2%;
    margin-top: 100px;
    opacity: 0.4;
    background-color: #111;
    color: white;
    // justify-content: center;
`;

const Logo = styled.a`
    line-height: 50px;
    height: 100%;
    padding-left: 30px;
    padding-top: 2px;
    font-size: 25px;
    display: inline-block;
    position: relative;
    z-index: 1;
    text-decoration: none;
    text-transform: uppercase;
    // text-align: left;
    color: white;
    cursor: pointer;
`;

const Contact = styled.div`
    text-decoration: none;
    text-transform: uppercase;
    text-decoration: none;
    display: grid;
    justify-content: center;
    // padding-top: 20px;
    grid-gap: 7px;
    background-color: #111;
    opacity: 0.6;
    height: 150px;
`;

const Rights = styled.div`
    padding-top: 15px;
    padding-bottom: 15px;
    // text-align: center;
    display: grid;
    justify-content: center;
    color: black;
`;

export const FooterComponent = () => {

    return(
        <FooterConteiner>
            <Logo href=''>Flat earth</Logo>
            <Contact>
                <h1>Contact</h1>
                <a href="">Email</a>
                <a href="">Facebook</a>
                <a href="">Phone number</a>
            </Contact>
            <Rights>© 2022. All rights reserved.</Rights>
        </FooterConteiner>
    )

};
