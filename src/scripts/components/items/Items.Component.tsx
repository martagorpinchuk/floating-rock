import React from 'react';
import styled from 'styled-components';

//

const Items = styled.div`
    padding-top: 100vh;
    opacity: 0.85;
    z-index: 1000;
    color: white;
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: auto auto;
    grid-gap: 7%;
`;

const Item = styled.div`
    padding-top: 43px;
    padding-bottom: 40px;
    background-color: #000;
    height: 690px;
    width: 580px;
    display: grid;
    justify-content: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const ItemHeader = styled.div`
    position: static;
    text-align: center;
    padding-bottom: 12px;
    text-decoration: none;
    text-transform: uppercase;
    opacity: 0.89;
    font-size: 27px;
    font-family: serif;
`;

const ItemContent = styled.div`
    position: static;
    text-align: justify;
    opacity: 0.79;
    font-family: serif;
    padding-left: 3%;
    padding-right: 3%;
`;

export const ItemsComponent = () => {

    return (

        <Items>
            <Item>

                <ItemHeader>Combustion effect</ItemHeader>
                <img src='../../../resources/img/3.png' className='img' />
                <ItemContent>Here is combustion effect made with shader.</ItemContent>
                <ItemContent>Here the depth value of water is used. I’m using the viewZToOrthographicDepth function to count depth. As the arguments it is needed viewZ - perspective depth to view Z-axes, cameraNear, cameraFar. After that part where there is shoal water I added some perlin noise so it looks like foam.                .</ItemContent>

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
