import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../css/NavMenu.css';

export class NavMenu extends Component {
    render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/home' }>Book Store</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/collections' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span>Collections
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}