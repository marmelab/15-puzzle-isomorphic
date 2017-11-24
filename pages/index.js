import React, { Component } from 'react';

import CustomHead from '../src/components/head';
import Button from '../src/components/button';
import Nav from '../src/components/nav';

export default class Index extends Component {
    handleClickSingleGame = () => {};

    render() {
        return (
            <div>
                <CustomHead />
                <Nav />
                <section className="container">
                    <div className="section">
                        <div className="bloc z-depth-3">
                            <div className="col s12">
                                <h5>Welcome to the 15 puzzle game!</h5>
                            </div>
                            <div className="col s12">
                                <div className="image-wrapper">
                                    <img
                                        className="responsive-img"
                                        src="/static/images/banner.jpg"
                                        alt="15 puzzle picture"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="row">
                            <div className="col s12">
                                <Button
                                    color="blue"
                                    icon="play_circle_outline"
                                    label="Single game"
                                    path="/game"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
