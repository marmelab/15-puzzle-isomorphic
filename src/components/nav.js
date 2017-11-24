import React, { Component } from 'react';
import Link from 'next/link';

export default class Nav extends Component {
    render() {
        return (
            <nav className="blue lighten-1" role="navigation">
                <div className="nav-wrapper container">
                    <Link href="/">
                        <a className="brand-logo">15 Puzzle Isomorphic!</a>
                    </Link>
                </div>
            </nav>
        );
    }
}
