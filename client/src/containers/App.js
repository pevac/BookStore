import React, { Component } from 'react';
import '../css/App.css';
import { NavMenu } from '../components/NavMenu';

export default class App extends Component {
    render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu />
                </div>
                <div className='col-sm-9'>
                  {this.children}
                </div>
            </div>
        </div>;
    }
}

