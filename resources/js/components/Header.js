import React, {useEffect, useState} from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import Container from "react-bootstrap/Container";
import {useHistory} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Header = () => {
    const [show, setShow] = useState(false);
    const [category_name, setCategory_name] = useState('')
    const handleClose = () => setShow(false);
    const [userInfo, setUserInfo] = useState('')
    useEffect(() => {

        if (localStorage.getItem('userInfo') !== null) {

            setUserInfo(JSON.parse(localStorage.getItem('userInfo')))

        }

    }, [setUserInfo])


    const logoutHandler = () => {
        localStorage.clear();
    };
    const CategoryHandler = () => {
        setShow(true);
    }
    const categoryFormHandler = async () => {
        const api_token = JSON.parse(localStorage.getItem('user_api'))

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }

            await axios.post(`/api/v1/Audience/category`,{
                category_name
            }, config)
             window.location.reload()
        } catch (error) {

            console.log(error.response)

        }
    }
    return (
        <header>

            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>دفترچه تلفن</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                            {
                                userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>

                                        <NavDropdown.Item onClick={CategoryHandler}>
                                            افزودن دسته بندی
                                        </NavDropdown.Item>

                                        <LinkContainer to='/login'>
                                            <NavDropdown.Item onClick={logoutHandler}>خروج</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                ) : <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'>ورود</i>
                                    </Nav.Link>
                                </LinkContainer>
                            }
                            {userInfo && userInfo.role === 'admin' && (
                                <NavDropdown title='ادمین' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>
                                            کابران
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal show={show} onHide={handleClose}>

                <Modal.Body>
                    <form onSubmit={categoryFormHandler}>

                        <div className="form-group text-right mt-3">
                            <label htmlFor="Content-name">نام دسته بندی</label>
                            <input value={category_name || ''}
                                   onChange={(e) => setCategory_name(e.target.value)}
                                   type="text" className="form-control"
                                   id="Content-name"/>
                        </div>

                        <button type='submit'
                                className="btn btn-info w-100 btn1">افزودن
                        </button>
                    </form>
                </Modal.Body>

            </Modal>
        </header>
    );
};

export default Header;
