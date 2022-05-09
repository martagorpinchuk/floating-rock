import React, { useState } from 'react';
import styled from 'styled-components';

//

export const FormComponent = () => {

    const FormConteiner = styled.div`
        width: 100%;
        display: grid;
        justify-content: center;
    `;

    const Forma = styled.div`
        position: static;
        text-align: center;
        padding-top: 65px;
        padding-bottom: 21px;
        margin-top: 50px;
        // margin-bottom: 30px;
        width: 700px;
        height: 500px;
        opacity: 0.75;
        background-color: #000;
        z-index: 105;
        border-radius: 16px;
        // display: grid;
        // justify-content: center;
        color: white;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    `;

    const Label = styled.label`
        width: 750px;
        // padding-top: 20px;
        // padding-bottom: 20px;
    `;

    const Input = styled.input`
        width: 350px;
        height: 5px;
        padding-top: 14px;
        padding-bottom: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
    `;

    const FormConteinerInner = styled.div`
        width: 360px;
        background-color: #575755;
        margin-top: 60px;
        margin-left: auto;
        margin-right: auto;
        // margin: auto;
        // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
        padding: 30px;
        border-radius: 16px;
    `;

    const [ submitting, setSubmitting ] = useState( false );

    const handleSubmit = ( event ) => {

        event.preventDefault();
        setSubmitting( true );
        console.log('submit sent');

        setTimeout(() => {

            setSubmitting( false );

        }, 1000 )

    };

    // const [ values, setValues ] = useState( {

    //     name: "",
    //     lastName: "",
    //     email: "",
    //     question: ""

    // } );

    const [ name, setName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ question, setQuestion ] = useState('');

    const changeName = ( event ) => {

        event.preventDefault();
        setName( event.target.value );

    };

    const changeLastName = ( event ) => {

        event.preventDefault();
        setLastName( event.target.value );

    };

    const changeEmail = ( event ) => {

        event.preventDefault();
        setEmail( event.target.value );

    };

    const changeQuestion = ( event ) => {

        event.preventDefault();
        setQuestion( event.target.value );

    };

    return (
        <FormConteiner>
            <Forma>
                <h1>Leave you question here:</h1>
                <FormConteinerInner>
                    <form onSubmit={ handleSubmit }>
                        <Label>
                            { submitting &&
                                <div>Submtting Form...</div>
                            }
                            <Input
                                name="name"
                                placeholder='Name'
                                value={ name }
                                onChange = { changeName }
                                type='text'
                                // required
                            />
                            <Input
                                name="lastName"
                                placeholder='Last name'
                                value={ lastName }
                                onChange = { changeLastName }
                                type='text'
                                // required
                            />
                            <Input
                                name="email"
                                placeholder='Email'
                                value={ email }
                                onChange={ changeEmail }
                                type='text'
                                // required
                                />
                            <Input
                                name="question"
                                placeholder='Question'
                                value={ question }
                                onChange= { changeQuestion }
                                type='text'
                                // required
                            />
                        </Label>
                        <button type="submit" className="button-2">Submit</button>
                    </form>
                </FormConteinerInner>
            </Forma>
        </FormConteiner>
    );


};