import React, { useState } from 'react';
import styled from 'styled-components';

//

const Logo = styled.a`
    line-height: 50px;
    height: 100%;
    padding-left: 30px;
    font-size: 22px;
    display: inline-block;
    position: relative;
    z-index: 1;
    text-decoration: none;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
    opacity: 0.8;
`;

const FooterBasic = styled.div`
    padding: 20px 0;
    margin-top: 8.35%;
    background-color: #111;
    color: #4b4c4d;
    opacity: 0.8;
`;

const FooterItem = styled.li`
    padding:0;
    list-style:none;
    text-align:center;
    font-size:18px;
    line-height:1.6;
    margin-bottom:0;
    text-decoration: none;
    color: white;
    cursor: pointer;
`;

const Copyright = styled.p`
    margin-top: 15px;
    text-align: center;
    font-size: 13px;
    color: #aaa;
    margin-bottom: 0;
`;

const FooterUL = styled.ul`
    display: grid;
    justify-content: center;
    align-content: center;
    gap: 30px;
    grid-auto-flow: column;
    padding-top: 20px;
`;

const AFooter = styled.a`
    color: inherit;
    text-decoration: none;
    opacity: 0.6;
    // font-family: Menlo, monospace;
    font-family: serif;
    `;

const Contact = styled.div`
    display: grid;
    justify-content: center;
    margin-top: 25px;
    // font-family: Menlo, monospace;
    font-family: serif;
    font-size: 20px;
    opacity: 1;
    color: #aaa;
`;

export const FooterComponent = () => {

    return(
        <FooterBasic>
            <Logo href=''>Flat earth</Logo>
            <Contact>Contacts:</Contact>
            <FooterUL>
                <FooterItem><AFooter href="mailto:martagorpinchuk@gmail.com">Email</AFooter></FooterItem>
                <FooterItem><AFooter href="https://www.facebook.com/profile.php?id=100007322912499">Facebook</AFooter></FooterItem>
                <FooterItem><AFooter href="https://twitter.com/martagorpinchuk">Twitter</AFooter></FooterItem>
                <FooterItem><AFooter href="https://telegram.me/">Telegram</AFooter></FooterItem>
            </FooterUL>
            <Copyright>© 2022. All rights reserved.</Copyright>
        </FooterBasic>
    )

};
