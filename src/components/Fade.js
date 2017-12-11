import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const DURATION = 375;
const BASE_TRANSITION = `${DURATION}ms ease-in-out`;

const fadeDefaultStyle = {
    opacity: 0,
    visibility: 'hidden',
    transition: `opacity ${BASE_TRANSITION}`,
};

const fadeTransitionStyles = {
    entering: { opacity: 0, visibility: 'hidden' },
    entered: { opacity: 1, visibility: 'visible' },
    exiting: { opacity: 1, visibility: 'visible' },
    exited: { opacity: 0, visibility: 'hidden' },
};

export default class Fade extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.node])
            .isRequired,
        timeout: PropTypes.number,
    };

    static defaultProps = {
        timeout: DURATION,
    };

    render() {
        const { children, ...props } = this.props;
        return (
            <Transition {...props}>
                {state =>
                    React.cloneElement(children, {
                        style: {
                            ...props.style,
                            ...children.props.style,
                            ...fadeDefaultStyle,
                            ...fadeTransitionStyles[state],
                        },
                    })
                }
            </Transition>
        );
    }
}
