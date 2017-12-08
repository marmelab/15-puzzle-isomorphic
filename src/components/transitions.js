import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const DURATION = 375;

const fadeDefaultStyle = {
    opacity: 0,
    visibility: 'hidden',
    transition: `opacity ${DURATION}ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
};

const fadeTransitionStyles = {
    entering: { opacity: 0, visibility: 'hidden' },
    entered: { opacity: 1, visibility: 'visible' },
};

export class Fade extends PureComponent {
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
                            ...fadeDefaultStyle,
                            ...fadeTransitionStyles[state],
                        },
                    })
                }
            </Transition>
        );
    }
}
