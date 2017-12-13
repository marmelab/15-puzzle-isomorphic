import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import withHover from '../withHover';

import Fade from '../transitions/Fade';

class FloatingButton extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element),
        color: PropTypes.string,
        hover: PropTypes.bool,
        icon: PropTypes.string,
        onClick: PropTypes.func,
        pulse: PropTypes.bool,
    };

    static defaultProps = {
        color: 'red',
        icon: 'add',
        onClick: () => {},
        pulse: false,
    };

    render() {
        const { children, color, hover, icon, onClick, pulse } = this.props;

        const mainBtnClass = ClassNames(
            'btn-floating',
            'btn-large',
            color,
            pulse,
        );

        const floatingBtnClass = ClassNames({
            showElem: hover,
            hideElem: !hover,
        });

        return (
            <div className="fixed-action-btn">
                <a className={mainBtnClass} onClick={onClick}>
                    <i className="large material-icons">{icon}</i>
                </a>
                {React.Children.count(children) > 1 && (
                    <ul>
                        {children.map((child, key) => (
                            <Fade in={hover} key={key}>
                                {React.cloneElement(child, {
                                    className: `${floatingBtnClass}`,
                                })}
                            </Fade>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default withHover(FloatingButton);
