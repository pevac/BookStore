import React, { Component } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';
import '../css/App.css';
import { NavMenu } from './navmenu/NavMenu';

export default class App extends Component {
    render() {
        return <Grid fluid>
                    <Row>
                        <Col  sm={3}>
                            <NavMenu />
                        </Col>
                        <Col  sm={9}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
    }
}

