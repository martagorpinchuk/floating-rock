import React, { useState } from 'react';
import styled from 'styled-components';

//

const FormConteiner = styled.div`
    width: 100%;
    display: grid;
    justify-content: center;
`;

const Form = styled.div`
    position: static;
    text-align: center;
    padding-top: 60px;
    padding-bottom: 11px;
    margin-top: 20%;
    // margin-bottom: 30px;
    width: 650px;
    height: 450px;
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
    padding-bottom: 14px;
    padding-left: 5px;
    margin-top: 10px;
    // margin-bottom: 10px;
    border-radius: 5px;
    `;

const FormConteinerInner = styled.div`
    width: 360px;
    // height: 240px;
    background-color: #575755;
    margin-top: 17px;
    margin-left: auto;
    margin-right: auto;
    // margin: auto;
    // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    padding: 30px;
    border-radius: 16px;
`;

const Warning = styled.div`
    position: static;
    // width: 20px;
    text-align: left;
    margin-right: 10em;
    padding-left: 9px;
    font-size: 12px;
    padding-top: 2px;
    color: red;
`;

const Button = styled.button.attrs( {
    type: 'submit',
    value: 'Submit'
} )`
    background-color: #fff3d1;
    border-radius: 8px;
    border-width: 0;
    color: #333333;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 34px;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    margin-top: 5%;
    opacity: 0.8;

    &:hover {
        opacity: 0.67;
    }
`;

//

export const FormComponent = () => {

    const [ submited, setSubmitting ] = useState( false );

    const handleSubmit = ( event ) => {

        event.preventDefault();
        // if ( name || lastName || email || question ) setSubmitting( true );

        setSubmitting( true );

    };

    const [ name, setName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ question, setQuestion ] = useState('');

    const changeName = ( event ) => {

        event.preventDefault();
        setName( event.target.value );
        setSubmitting( false );

    };

    const changeLastName = ( event ) => {

        event.preventDefault();
        setLastName( event.target.value );
        setSubmitting( false );

    };

    const changeEmail = ( event ) => {

        event.preventDefault();
        setEmail( event.target.value );
        setSubmitting( false );

    };

    const changeQuestion = ( event ) => {

        event.preventDefault();
        setQuestion( event.target.value );
        setSubmitting( false );

    };

    return (
        <FormConteiner>
            <Form>
                <h1>Leave you question here:</h1>
                <FormConteinerInner>
                    <form onSubmit={ handleSubmit }>
                        <Label>
                            { submited && name && lastName && email && question ?
                                <div>Form submitted</div> : null
                            }
                            <Input
                                name="name"
                                placeholder='Name'
                                value={ name }
                                onChange = { changeName }
                                type='text'
                                // required
                            />
                            { !name && submited ? <Warning>Please enter your name</Warning> : null }
                            <Input
                                name="lastName"
                                placeholder='Last name'
                                value={ lastName }
                                onChange = { changeLastName }
                                type='text'
                                // required
                            />
                            { !lastName && submited ? <Warning>Please enter your last name</Warning> : null }
                            <Input
                                name="email"
                                placeholder='Email'
                                value={ email }
                                onChange={ changeEmail }
                                type='text'
                                // required
                                />
                                { !email && submited ? <Warning>Please enter your email</Warning> : null }
                            <Input
                                name="question"
                                placeholder='Question'
                                value={ question }
                                onChange= { changeQuestion }
                                type='text'
                                // required
                            />
                            { !question && submited ? <Warning>Please enter your question</Warning> : null }
                        </Label>
                        <Button>Submit</Button>
                    </form>
                </FormConteinerInner>
            </Form>
        </FormConteiner>
    );

};