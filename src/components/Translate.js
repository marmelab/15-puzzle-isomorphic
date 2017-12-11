import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const DURATION = 375;
const BASE_TRANSITION = `${DURATION}ms ease-in-out`;

const translateDefaultStyle = {
    transform: 'translate(0, 0)',
    transition: `transform ${BASE_TRANSITION}`,
};

const translateTransitionStyles = (x = 0, y = 0) => ({
    entering: { transform: 'translate(0)' },
    entered: { transform: `translate(${x}, ${y})` },
});

export default class Translate extends PureComponent {
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
