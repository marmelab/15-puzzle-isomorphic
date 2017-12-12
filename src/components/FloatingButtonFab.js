import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ShowWhenOnline } from './detectOffline';

class FloatingButtonFab extends PureComponent {
    static propTypes = {
        children: PropTypes.element.isRequired,
        showOnlyIfOnline: PropTypes.bool,
        style: PropTypes.object,
    };

    static defaultProps = {
        showOnlyIfOnline: false,
    };

    render() {
        const { children, showOnlyIfOnline, style } = this.props;

        const clonedElement = React.cloneElement(children, {
            className: `${children.props.className}`,
            style,
        });

        if (showOnlyIfOnline) {
            return (
                <ShowWhenOnline>
                    <li>{clonedElement}</li>
                </ShowWhenOnline>
            );
        }
        return <li>{clonedElement}</li>;
    }
}

export default FloatingButtonFab;
