import { FC } from 'react';
import { Pagination } from 'react-bootstrap';

interface CustomTableProps {
    pageNumber: number;
    setPageNumber: (value: number) => void;
    value: number;
}

export const CustomPagination: FC<CustomTableProps> = (props) => {
    const { pageNumber, setPageNumber, value } = props;
    let items = [];
    for (let number = 1; number <= value; number++) {
        items.push(
            <Pagination.Item
                onClick={() => {
                    setPageNumber(number);
                }}
                key={number}
                active={number === pageNumber}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <>
            <Pagination className="justify-content-end">{items}</Pagination>
        </>
    );
};
