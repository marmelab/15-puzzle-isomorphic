import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Item from './Item';

const List = ({ children, items, icon, onClickItem, selectedItem, title }) => (
    <ul className="collection with-header">
        {title && (
            <li className="collection-header">
                <h4>{title}</h4>
            </li>
        )}
        {items.map((item, key) => (
            <li
                className={ClassNames('collection-item', {
                    active: selectedItem && selectedItem.value === item.value,
                    'collection-item-hover': !children.props.icon,
                })}
                key={key}
            >
                <Item
                    icon={icon}
                    label={item.label}
                    onClick={onClickItem}
                    value={item.value}
                />
            </li>
        ))}
    </ul>
);

List.propTypes = {
    children: PropTypes.element.isRequired,
    icon: PropTypes.string,
    items: PropTypes.array.isRequired,
    onClickItem: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
    title: PropTypes.string,
};

export default List;
