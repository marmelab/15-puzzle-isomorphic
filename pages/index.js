import React, { Component } from 'react';
import CustomHead from '../src/components/head';
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
                        <div className="bloc z-depth-2">
                            <div className="col s12">
                                <h5>Welcome to the 15 puzzle game!</h5>
                            </div>
                            <div className="col s12">
                                <img
                                    className="responsive-img"
                                    src="/static/images/banner.jpg"
                                    alt="15 puzzle picture"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="row">
                            <div className="col s12">
                                <button
                                    onClick={this.handleClickSingleGame}
                                    className="btn blue"
                                >
                                    <i className="material-icons left">
                                        play_circle_outline
                                    </i>Single game
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
