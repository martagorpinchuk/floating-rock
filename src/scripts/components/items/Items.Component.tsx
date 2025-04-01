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
    align-items: center;
    justify-items: center;
    grid-template-columns: auto auto;
    column-gap: 20px;  // Adjust this value to control horizontal space
    grid-gap: 7%;      // This still controls the vertical space
`;

const Item = styled.div`
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #000;
    height: 90%;
    width: 70%;
    display: grid;
    justify-content: center;
    // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const ItemHeader = styled.div`
    position: static;
    text-align: center;
    padding-bottom: 5%;
    text-decoration: none;
    text-transform: uppercase;
    opacity: 0.89;
    font-size: 3.3vh;
    font-family: serif;
`;

const ItemContentHeader = styled.div`
    position: static;
    text-align: justify;
    opacity: 0.79;
    padding-top: 0.2%;
    font-family: serif;
    padding-left: 4%;
    padding-right: 4%;
    line-height: 150%;
    font-size: 2.6vh;
`;

const ItemContent = styled.div`
    position: static;
    text-align: justify;
    opacity: 0.79;
    font-family: serif;
    padding-left: 4%;
    padding-right: 4%;
    line-height: 150%;
    font-size: 2vh;
`;

export const ItemsComponent = () => {

    return (

        <Items>
            <Item>

                <ItemHeader>Combustion effect</ItemHeader>
                <img src='../../../resources/img/3.png' className='img' />
                <ItemContentHeader>Here is combustion effect made with shader.</ItemContentHeader>
                <ItemContent>Purpose of combustion is to make the model disappear. To reach that effect we need to work with vertex and fragment shaders. To reach that goal we need a perlin noise picture. After we retrieve texels from a texture it is used in gl_FragColor alpha with smoothstep() function. Also you can stop combustion with tweakPane which is  timeStop coefficient.</ItemContent>

            </Item>

            <Item>

                <ItemHeader>Fog effect</ItemHeader>
                <img src='../../../resources/img/2.png' className='img' />
                <ItemContentHeader>Here you can look at fog effect made with shader.</ItemContentHeader>
                <ItemContent>
                        There is a tweakpane where there are parameters which you can change to get to your ideal fog. You can change opacity of the fog, inner/outer color, density, fading (fading of one sprite), circle of appearance (sprite can appear from one point or from some area), external forces direction, speed of growth, frame duration, box visibility (box position is the same as center of fog source point).
                </ItemContent>

            </Item>

            <Item>

                <ItemHeader>Face effect</ItemHeader>
                <img src='../../../resources/img/1.png' className='img' />
                <ItemContentHeader>Here is face model made with shader.</ItemContentHeader>
                <ItemContent>In this project readDepth() for finding depth of the model and using that on the plane z-axis. For nice lines moving up/down independently one from another  it is used perlin noise. The face is moving forward to some point when you clickOn on the screen. When you clickOff face is moving back to some point. In the background there are small stars made with shader point. Stars have different color, size, time of fading and that result is reached with attributes. Also there is possibility to change line color with tweakpane.</ItemContent>

            </Item>

            <Item>

                <ItemHeader>Water effect</ItemHeader>
                <img src='../../../resources/img/4.png' className='img' />
                <ItemContentHeader>Here you can look at Water effect made with shader.</ItemContentHeader>
                <ItemContent>Here the depth value of water is used. I’m using the viewZToOrthographicDepth function to count depth. After that part where there is shoal water I added some perlin noise so it looks like foam. You can change color of water with tweakPane.
                </ItemContent>

            </Item>

        </Items>
    );

};
