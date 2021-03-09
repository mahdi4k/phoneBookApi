import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Form, Button, Row, Col , Container} from "react-bootstrap";

const LoginScreen = ({location,history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const redirect = location.search ? location.search.split('=')[1] : '/'

    let userInfo;
    useEffect(()=>{

        if (userInfo){
            history.push(redirect)
        }


    },[history,userInfo,redirect])

    const submitHandler = async (e)=>{
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/v1/login', {email, password}, config)
        console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data.data))
        localStorage.setItem('user_api',JSON.stringify(data.api_token))
    }
    return (
        <Container>
            <h1>ورود</h1>

            <Form onSubmit={submitHandler}>
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

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>

                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        ثبت نام
                    </Link>
                </Col>
            </Row>

        </Container>
    );
};

export default LoginScreen;
