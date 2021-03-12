import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col, Container} from "react-bootstrap";
import Message from "../components/Message";
import Header from "../components/Header";

const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    let userInfo;
    useEffect(() => {

        if (userInfo) {
            history.push(redirect)
        }

    }, [history, userInfo, redirect])

    const submitHandler = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const {data} = await axios.post('/api/v1/login', {email, password}, config)
            localStorage.setItem('userInfo', JSON.stringify(data.data))
            localStorage.setItem('user_api', JSON.stringify(data.api_token))
            history.push('/')
        } catch (error) {

            error.response && setMessage(error.response.data.errors)
        }


    }
    return (
        <>
            <Header/>
            <Container>
                <Col md={{span: 8, offset: 2}}>
                    <div className='p-3 mt-3 bg-white loginForm'>
                        <h1>ورود</h1>
                        {message && <Message variant='danger' ErrorsMessage={message}/>}

                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='email'>
                                <Form.Label>ایمیل</Form.Label>
                                <Form.Control type='email' value={email}
                                              onChange={(e) => setEmail(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='password'>
                                <Form.Label>رمز عبور</Form.Label>
                                <Form.Control type='password' value={password}
                                              onChange={(e) => setPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <Button className='d-flex  text-center justify-content-center w-25' type='submit'
                                    variant='primary'>
                                ورود
                            </Button>

                        </Form>

                        <div className='text-right my-4'>
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                ثبت نام
                            </Link>
                        </div>

                    </div>

                </Col>
            </Container>
        </>

    );
};

export default LoginScreen;
