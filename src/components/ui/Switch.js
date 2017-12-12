import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Switch extends Component {
    state = {
        on: false,
    };

    static propTypes = {
        labels: PropTypes.shape({
            title: PropTypes.string,
            on: PropTypes.string,
            off: PropTypes.string,
        }),
        onToggle: PropTypes.func,
    };

    static defaultProps = {
        labels: {
            title: null,
            on: null,
            off: null,
        },
        onToggle: () => {},
    };

    handleOnChange = () => {
        const { onToggle } = this.props;
        const { on } = this.state;
        const newState = { on: !on };
        this.setState(newState);
        onToggle(newState.on);
    };

    render() {
        const { labels } = this.props;
        const { on } = this.state;

        return (
            <div>
                {labels.title && <p>{labels.title}</p>}
                <div className="switch">
                    <label>
                        {labels.off && <span>labels.off</span>}
                        <input
                            type="checkbox"
                            checked={on}
                            onChange={this.handleOnChange}
                        />
                        <span className="lever" />
                        {labels.on && <span>labels.on</span>}
                    </label>
                </div>
            </div>
        );
    }
}
