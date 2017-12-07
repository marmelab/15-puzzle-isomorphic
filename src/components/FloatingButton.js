import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import withHover from './withHover';

class FloatingButton extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
        color: PropTypes.string,
        hover: PropTypes.bool,
        icon: PropTypes.string,
        pulse: PropTypes.bool,
    };

    static defaultProps = {
        color: 'red',
        icon: 'add',
        pulse: false,
    };

    render() {
        const { children, color, hover, icon, pulse } = this.props;

        const mainBtnClass = ClassNames({
            'btn-floating': true,
            'btn-large': true,
            [color]: true,
            pulse,
        });

        const floatingBtnClass = ClassNames({
            show: hover,
            hide: !hover,
        });

        return (
            <div className="fixed-action-btn">
                <a className={mainBtnClass}>
                    <i className="large material-icons">{icon}</i>
                </a>
                <ul className={floatingBtnClass}>
                    {children.map((child, key) =>
                        React.cloneElement(child, {
                            key,
                            className: `${floatingBtnClass}`,
                        }),
                    )}
                </ul>
            </div>
        );
    }
}

export default withHover(FloatingButton);
