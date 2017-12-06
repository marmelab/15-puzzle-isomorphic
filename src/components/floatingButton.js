import React from 'react';
import PropTypes from 'prop-types';

import Button from './button';
import { ShowWhenOnline } from './detectOffline';

const FloatingButton = ({ actions, color, icon }) => {
    return (
        <div className="fixed-action-btn">
            <a className={`btn-floating btn-large ${color} pulse`}>
                <i className="large material-icons">{icon}</i>
            </a>
            <ul>
                {actions.length > 0 &&
                    actions.map((action, key) => (
                        <li key={key} title={action.label}>
                            {action.showIfOnline && (
                                <ShowWhenOnline>
                                    <Button
                                        className="btn-floating"
                                        color={action.color}
                                        icon={action.icon}
                                        onClick={action.onClick}
                                        route={action.route || null}
                                    />
                                </ShowWhenOnline>
                            )}
                            {!action.showIfOnline && (
                                <Button
                                    className="btn-floating"
                                    color={action.color}
                                    icon={action.icon}
                                    onClick={action.onClick}
                                    route={action.route || null}
                                />
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

FloatingButton.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.object).isRequired,
    color: PropTypes.string,
    icon: PropTypes.string,
};

FloatingButton.defaultProps = {
    color: 'red',
    icon: 'add',
};

export default FloatingButton;
