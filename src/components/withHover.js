import React, { Component } from 'react';

export default WrappedComponent =>
    class HoverHOC extends Component {
        state = {
            hover: false,
        };

        handleOnTouchStart = () => {
            if (!this.state.hover) {
                this.setState({ hover: !this.state.hover });
            }
        };

        handleOnMouseEnter = () => {
            this.setState({ hover: true });
        };

        handleOnMouseLeave = () => {
            this.setState({ hover: false });
        };

        render() {
            return (
                <div
                    onTouchStart={this.handleOnTouchStart}
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseLeave={this.handleOnMouseLeave}
                >
                    <WrappedComponent
                        hover={this.state.hover}
                        {...this.props}
                    />
                </div>
            );
        }
    };
