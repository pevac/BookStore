import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem  from 'react-bootstrap/lib/NavItem';
import Clearfix  from 'react-bootstrap/lib/Clearfix';
import { LinkContainer } from 'react-router-bootstrap';
import styles from './NavMenu.css';

export class NavMenu extends Component {
    render() {
        return <div className='main-nav'>
                <Navbar inverse fluid>
                    <Navbar.Header>
                        <Navbar.Toggle />
                        <Navbar.Brand>
                            <LinkContainer to="/home">
                                <Navbar.Link>Book Store</Navbar.Link>
                            </LinkContainer>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Clearfix></Clearfix>
                    <Navbar.Collapse>
                        <Nav navbar>
                            <LinkContainer to="/collections" activeClassName='active'>
                                <NavItem >
                                    <span className='glyphicon glyphicon-th-list'></span>Collections
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/books" activeClassName='active'>
                                <NavItem >
                                    <span className='glyphicon glyphicon-th-list'></span>Books
                                </NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        </div>;
    }
}