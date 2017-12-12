import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import { BASE_TRANSITION, DURATION } from './_default';

const translateDefaultStyle = {
    transform: 'translate(0, 0)',
    transition: `transform ${BASE_TRANSITION}`,
};

const translateTransitionStyles = (x = 0, y = 0, unit = 'em') => ({
    entering: { transform: 'translate(0, 0)' },
    entered: { transform: `translate(${x}${unit}, ${y}${unit})` },
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
                            ...props.style,
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
