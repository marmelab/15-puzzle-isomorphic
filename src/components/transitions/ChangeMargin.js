import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import { BASE_TRANSITION, DURATION } from './_default';

const changeMarginDefaultStyle = margin => ({
    margin,
    transition: `margin ${BASE_TRANSITION}`,
});

const changeMarginTransitionStyles = (start = 0, end = 0) => ({
    entering: { margin: start },
    entered: { margin: end },
    exiting: { margin: end },
    exited: { margin: start },
});

export default class ChangeMargin extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.node])
            .isRequired,
        margin: PropTypes.object,
        timeout: PropTypes.number,
    };

    static defaultProps = {
        timeout: DURATION,
    };

    render() {
        const { children, margin, ...props } = this.props;
        return (
            <Transition {...props}>
                {state =>
                    React.cloneElement(children, {
                        style: {
                            ...props.style,
                            ...children.props.style,
                            ...changeMarginDefaultStyle(margin.start),
                            ...changeMarginTransitionStyles(
                                margin.start,
                                margin.end,
                            )[state],
                        },
                    })
                }
            </Transition>
        );
    }
}
