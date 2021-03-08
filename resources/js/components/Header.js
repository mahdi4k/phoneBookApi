import React, {useEffect, useState} from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import Container from "react-bootstrap/Container";

const Header = () => {

    useEffect(()=>{

        if (localStorage.getItem('userInfo') !== null) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        }
    },[])

    const logoutHandler = () => {
      }

    let userInfo;
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
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>
                                                افزودن دسته بندی
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                    </NavDropdown>
                                ) : <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'>ورود</i>
                                    </Nav.Link>
                                </LinkContainer>
                            }
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
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
        </header>
    );
};

export default Header;
