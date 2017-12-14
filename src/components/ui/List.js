import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const List = ({ children, items, onClickItem, selectedItem, title }) => (
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
                {React.cloneElement(children, {
                    label: item.label,
                    onClick: onClickItem,
                    value: item.value,
                    ...children.props,
                })}
            </li>
        ))}
    </ul>
);

List.propTypes = {
    children: PropTypes.element.isRequired,
    items: PropTypes.array.isRequired,
    onClickItem: PropTypes.func.isRequired,
    selectedItem: PropTypes.object,
    title: PropTypes.string,
};

export default List;
