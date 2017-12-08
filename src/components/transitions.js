import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const DURATION = 375;
const BASE_TRANSITION = `${DURATION}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;

const fadeDefaultStyle = {
    opacity: 0,
    visibility: 'hidden',
    transition: `opacity ${BASE_TRANSITION}`,
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

const translateDefaultStyle = {
    transform: 'translate(0, 0)',
    transition: `transform ${BASE_TRANSITION}`,
};

const translateTransitionStyles = (x = 0, y = 0) => ({
    entering: { transform: 'translate(0)' },
    entered: { transform: `translate(${x}, ${y})` },
});

export class Translate extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.node])
            .isRequired,
        dir: PropTypes.object.isRequired,
        timeout: PropTypes.number,
    };

    static defaultProps = {
        timeout: DURATION,
    };

    render() {
        const { children, dir, ...props } = this.props;

        return (
            <Transition {...props}>
                {state => {
                    return React.cloneElement(children, {
                        ...children.props,
                        style: {
                            ...children.props.style,
                            ...translateDefaultStyle,
                            ...translateTransitionStyles(dir.x, dir.y)[state],
                        },
                    });
                }}
            </Transition>
        );
    }
}
