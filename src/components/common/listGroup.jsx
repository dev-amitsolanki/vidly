import React from 'react';

const ListGroup = (props) => {
    const { items, textProperty, valuePropety, onItemSelect, selectedItem } = props;
    return <ul className="list-group">
        {items.map(item => (
            <li className={selectedItem === item ? "list-group-item active clickable" : "list-group-item clickable"} key={item[valuePropety]} onClick={() => onItemSelect(item)} >{item[textProperty]}</li>
        ))}
    </ul>;
}

export default ListGroup;
