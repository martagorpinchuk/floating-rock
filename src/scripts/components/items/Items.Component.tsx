import React from 'react';
import styled from 'styled-components';
// import img1 from '../../../resources/img/1.png';
// import img2 from '../../../resources/img/1.png';

//

const Items = styled.div`
    // position: absolute;
    // bottom: 30%;
    padding-top: 80%;
    // left: 45%;
    // width: 100%;
    // height: 310px;
    opacity: 0.85;
    z-index: 1000;
    color: white;
    display: grid;
    justify-content: center;
    grid-template-columns: auto auto;
    grid-gap: 7%;
    // justify-content: space-between;
`;

const Item = styled.div`
    border-radius: 16px;
    padding-top: 43px;
    padding-bottom: 40px;
    background-color: #000;
    height: 390px;
    width: 480px;
    display: grid;
    justify-content: center;
    // grid-column: 100px 100px;
    // align-content: space-around;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const ItemHeader = styled.div`
    position: static;
    text-align: center;
    padding-bottom: 16px;
    text-decoration: none;
    text-transform: uppercase;
    opacity: 0.89;
    font-size: 27px;
`;

const ItemContent = styled.div`
    position: static;
    text-align: center;
    opacity: 0.79;
`;

export const ItemsComponent = () => {

    return (

        <Items>
            <Item>

                <ItemHeader>Combustion effect</ItemHeader>
                <img src='../../../resources/img/3.png' className='img' />
                <ItemContent>Here is combustion effect made with shader.</ItemContent>
                <ItemContent>Made with perlin noise function.</ItemContent>

            </Item>

            <Item>

                <ItemHeader>Fog effect</ItemHeader>
                <img src='../../../resources/img/2.png' className='img' />
                <ItemContent>Here you can look at fog effect made with shader.</ItemContent>
                <ItemContent>Made with sprites.</ItemContent>

            </Item>

            <Item>

                <ItemHeader>Face effect</ItemHeader>
                <img src='../../../resources/img/1.png' className='img' />
                <ItemContent>Here is face model made with shader.</ItemContent>
                <ItemContent>Made with depth from model face.</ItemContent>

            </Item>

            <Item>

                <ItemHeader>Water effect</ItemHeader>
                <img src='../../../resources/img/4.png' className='img' />
                <ItemContent>Here you can look at Water effect made with shader.</ItemContent>
                <ItemContent>Made with depth.</ItemContent>

            </Item>

        </Items>
    );

};
