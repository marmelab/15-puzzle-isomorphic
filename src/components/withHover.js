import React, { Component } from 'react';

export default function withHover(WrappedComponent) {
    return class HoverHOC extends Component {
        state = {
            hover: false,
        };

        handleOnTouchStart = () => {
            const { hover } = this.state;
            this.setState({ hover: !hover });
        };

        handleOnMouseEnter = () => {
            this.setState({ hover: true });
        };

        handleOnMouseLeave = () => {
            this.setState({ hover: false });
        };

        render() {
            const { hover } = this.state;
            return (
                <div
                    onTouchStart={this.handleOnTouchStart}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                >
                    <WrappedComponent hover={hover} {...this.props} />
                </div>
            );
        }
    };
}
