import React, { Component } from 'react';
import CustomHead from '../src/components/head';

export default class Index extends Component {
    render() {
        return (
            <div>
                <CustomHead />

                <h1>Welcome to the 15 puzzle game!</h1>
            </div>
        );
    }
}
