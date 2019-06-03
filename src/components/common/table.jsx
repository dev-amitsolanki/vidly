import React, { Component } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

class Table extends Component {
    render() {
        const { sortColumn, columns, onSort, data } = this.props
        return (
            <table className="table">
                <TableHeader sortColumn={sortColumn} columns={columns} onSort={onSort} />
                <TableBody data={data} columns={columns} />
            </table>
        );
    }
}

export default Table;