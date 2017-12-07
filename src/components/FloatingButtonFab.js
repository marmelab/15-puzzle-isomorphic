import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ShowWhenOnline } from './detectOffline';

class FloatingButtonFab extends PureComponent {
    static propTypes = {
        children: PropTypes.element.isRequired,
        className: PropTypes.string,
        showOnlyIfOnline: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        showOnlyIfOnline: false,
    };

    render() {
        const { children, className, showOnlyIfOnline } = this.props;

        const clonedElement = React.cloneElement(children, {
            className: `${children.props.className} ${className}`,
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
