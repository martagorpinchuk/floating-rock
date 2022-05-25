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
    padding-top: 40px;
    padding-bottom: 11px;
    margin-top: 20%;
    width: 510px;
    height: 480px;
    opacity: 0.75;
    background-color: #000;
    z-index: 105;
    color: white;
    // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const Label = styled.label`
    width: 650px;
`;

const Input = styled.input`
    font-family: montserrat, arial, verdana;
    padding: 15px;
	border: 1px solid #ccc;
	border-radius: 2px;
	margin-bottom: 5px;
    margin-top: 5px;
	width: 71%;
	box-sizing: border-box;
	color: white;
	font-size: 15px;
    background-color: #111;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);

    &:focus {
        background-color: #111;
    }
`;

const Warning = styled.div<{visible: boolean}>`
    position: static;
    text-align: left;
    margin-right: 10em;
    padding-left: 18%;
    font-size: 12px;
    padding-top: 0px;
    color: red;

    visibility: ${( props ) => ( props.visible ? 'visible' : 'hidden' ) };
`;

const Button = styled.button.attrs( {
    type: 'submit',
    value: 'Submit'
} )`
    background-color: #111;
    border-radius: 2px;
    border-width: 1;
    color: white;
    cursor: pointer;
    display: inline-block;
    // font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    // font-weight: 500;
    // line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 34px;
    text-align: center;
    // transition: all 200ms;
    // vertical-align: baseline;
    // white-space: nowrap;
    // user-select: none;
    // -webkit-user-select: none;
    // touch-action: manipulation;
    margin-top: 5%;
    opacity: 0.8;
    font-family: montserrat, arial, verdana;

    &:hover {
        opacity: 0.67;
    }
`;

let visible = false;
const SuccesfulSub = styled.div<{visible: boolean}>`
    // opacity: visible ? 0 : 0.25;
    margin-bottom: 10px;
    margin-top: 20px;
    opacity: 0.8;

    visibility: ${( props ) => ( props.visible ? 'visible' : 'hidden' ) };
`;

const HForm = styled.p`
    // font-family: Menlo, monospace;
    font-size: 22px;
    // float: left;
    // padding-left: 19%;
    text-transform: uppercase;
`;

//

// const [ visible, setVisible ] = useState('hidden');

export const FormComponent = () => {

    const [ submited, setSubmitting ] = useState( false );

    const handleSubmit = ( event ) => {

        event.preventDefault();
        if ( name && lastName && email && question ) visible = true;

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
                <HForm>Leave you question here:</HForm>
                <form onSubmit={ handleSubmit }>
                    <Label>
                        { visible ?
                            <SuccesfulSub visible={visible}>Form submitted.</SuccesfulSub> : <SuccesfulSub visible={visible}>Form submitted</SuccesfulSub>
                        }
                        <Input
                            name="name"
                            placeholder='Name'
                            value={ name }
                            onChange = { changeName }
                            type='text'
                            // required
                        />
                        { !name && submited ? <Warning visible={true}>Please enter your name</Warning> : <Warning visible={false}>Please enter your email</Warning> }
                        <Input
                            name="lastName"
                            placeholder='Last name'
                            value={ lastName }
                            onChange = { changeLastName }
                            type='text'
                            // required
                        />
                        { !lastName && submited ? <Warning visible={true}>Please enter your last name</Warning> : <Warning visible={false}>Please enter your email</Warning> }
                        <Input
                            name="email"
                            placeholder='Email'
                            value={ email }
                            onChange={ changeEmail }
                            type='text'
                            // required
                            />
                            { !email && submited ? <Warning visible={true}>Please enter your email</Warning> : <Warning visible={false}>Please enter your email</Warning> }
                        <Input
                            name="question"
                            placeholder='Question'
                            value={ question }
                            onChange= { changeQuestion }
                            type='text'
                            // required
                        />
                        { !question && submited ? <Warning visible={true}>Please enter your question</Warning> : <Warning visible={false}>Please enter your question</Warning> }
                    </Label>
                    <Button>Submit</Button>
                </form>
            </Form>
        </FormConteiner>
    );

};