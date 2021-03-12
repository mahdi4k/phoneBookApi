import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col, Container} from "react-bootstrap";
import Message from "../components/Message";
import Header from "../components/Header";

const RegisterScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const [message, setMessage] = useState('')


    const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const {data: {data}} = await axios.post('/api/v1/register', {
                name,
                email,
                password,
                password_confirmation
            }, config)

            localStorage.setItem('userInfo', JSON.stringify(data))
            localStorage.setItem('user_api', JSON.stringify(data.api_token))
            history.push('/')
        } catch (error) {
            error.response && setMessage(error.response.data.errors)
        }
    }
    return (
       <>
        <Header/>
           <Container className='bg-white text-dark text-right mt-3 pt-4'>
               <h1>ثبت نام</h1>
               {message && <Message variant='danger' ErrorsMessage={message}/>}
               <Form onSubmit={submitHandler}>

                   <Form.Group controlId='name'>
                       <Form.Label>نام</Form.Label>
                       <Form.Control type='text' placeholder='Enter name' value={name}
                                     onChange={(e) => setName(e.target.value)}>
                       </Form.Control>
                   </Form.Group>

                   <Form.Group controlId='email'>
                       <Form.Label>ایمیل</Form.Label>
                       <Form.Control type='email' placeholder='Enter email' value={email}
                                     onChange={(e) => setEmail(e.target.value)}>
                       </Form.Control>
                   </Form.Group>

                   <Form.Group controlId='password'>
                       <Form.Label>رمز عبور</Form.Label>
                       <Form.Control type='password' placeholder='Enter password' value={password}
                                     onChange={(e) => setPassword(e.target.value)}>
                       </Form.Control>
                   </Form.Group>

                   <Form.Group controlId='confirmPassword'>
                       <Form.Label>تایید رمز عبور</Form.Label>
                       <Form.Control type='password' placeholder='Enter confirm password' value={password_confirmation}
                                     onChange={(e) => setPassword_confirmation(e.target.value)}>
                       </Form.Control>
                   </Form.Group>

                   <Button type='submit' variant='primary'>
                       ثبت نام
                   </Button>

               </Form>

               <Row className='py-3'>
                   <Col>

                       <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                           ثبت نام
                       </Link>
                   </Col>
               </Row>

           </Container>
       </>
    );
};

export default RegisterScreen;
