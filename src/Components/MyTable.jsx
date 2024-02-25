import React, { useState } from 'react';
import { Table } from "react-bootstrap";
import Pagination from "./Pagination";

const MyTable = ({ data, selectedRows, onCheckboxChange, outsider, elected }) => {
    const [isElected, setIsElected] = useState(elected);
    const [isOutsider, setIsOutsider] = useState(outsider);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [rowsPerPage] = useState(10);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const sortedData = sortBy ? [...data].sort((a, b) => {
        const aValue = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
        const bValue = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];

        if (aValue < bValue) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    }) : data;

    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSort = (columnName) => {
        if (sortBy === columnName) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnName);
            setSortOrder('asc');
        }
    };

    return (
        <div>
            <Table className="MyTable" striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    {!isElected && (
                            <th scope="col" onClick={() => handleSort('name')}>Имя</th>)}
                    {!isElected && (
                            <th scope="col" onClick={() => handleSort('status')}>Статус</th>)}
                    {!isElected && (
                            <th scope="col" onClick={() => handleSort('dateOfBirth')}>Дата рождения</th>)}
                    {!isElected && (
                            <th scope="col" onClick={() => handleSort('rating')}>Рейтинг</th>)}
                    {isElected && (
                        <th scope="col" onClick={() => handleSort('name')}>Название</th>)}
                    {isElected && (
                        <th scope="col" onClick={() => handleSort('cost')}>Стоимость</th>
                    )}

                    {!isElected && isOutsider && (
                        <th scope="col" onClick={() => handleSort('isElected')}>Метка</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {currentRows.map((item, index) => (
                    <tr key={index}>
                        <td><input type="checkbox" checked={selectedRows.includes(item)} onChange={() => onCheckboxChange(item)} /></td>
                        {!isElected && (
                            <td>{item.name}</td>
                        )}
                        {!isElected && (
                            <td>{item.status}</td>
                        )}
                        {!isElected && (
                            <td>{new Date(item.dateOfBirth).toLocaleDateString()}</td>
                        )}
                        {!isElected && (
                            <td>{item.rating}</td>
                        )}
                        {!isElected && isOutsider && (
                            <td>{item.isElected ? "Да" : "Нет"}</td>
                        )}
                        {isElected && (
                            <td>{item.description}</td>
                        )}
                        {isElected && (
                            <td>{item.cost}</td>
                        )}
                    </tr>
                ))}
                </tbody>
            </Table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default MyTable;
