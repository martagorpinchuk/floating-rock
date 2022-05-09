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

export const ItemsComponent = () => {

    return (

        <Items>
            <Item>

                <header><h1>Combustion effect</h1></header>
                <img src='../../../resources/img/3.png' className='img1' />
                <p>Here is combustion effect made with shader</p>
                <p>Made with perlin noise function</p>

            </Item>

            <Item>

                <header><h1>Fog effect</h1></header>
                <img src='../../../resources/img/2.png' className='img2' />
                <p>Here you can look at fog effect made with shader</p>
                <p>Made with sprites</p>

            </Item>
        </Items>
    );

};
