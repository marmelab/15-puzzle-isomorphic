import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Switch extends Component {
    state = {
        on: false,
    };

    static propTypes = {
        labels: PropTypes.object,
        onToggle: PropTypes.func,
    };

    static defaultProps = {
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
                {<p>{labels.title}</p>}
                <div className="switch">
                    <label>
                        {labels.off}
                        <input
                            type="checkbox"
                            checked={on}
                            onChange={this.handleOnChange}
                        />
                        <span className="lever" />
                        {labels.on}
                    </label>
                </div>
            </div>
        );
    }
}
