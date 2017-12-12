import React from 'react';
import PropTypes from 'prop-types';

const List = ({ children, items, onClickItem, title }) => (
    <ul className="collection with-header">
        {title && (
            <li className="collection-header">
                <h4>{title}</h4>
            </li>
        )}
        {items.map((item, key) => (
            <li className="collection-item" key={key}>
                {React.cloneElement(children, {
                    onClick: onClickItem,
                    value: item,
                })}
            </li>
        ))}
    </ul>
);

List.propTypes = {
    children: PropTypes.element.isRequired,
    items: PropTypes.array.isRequired,
    onClickItem: PropTypes.func.isRequired,
    title: PropTypes.string,
};

export default List;
