import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TileEmpty extends PureComponent {
    static propTypes = {
        dimensionStyle: PropTypes.object,
    };

    render() {
        const { dimensionStyle } = this.props;
        return <div className="puzzle-tile-empty" style={dimensionStyle} />;
    }
}
