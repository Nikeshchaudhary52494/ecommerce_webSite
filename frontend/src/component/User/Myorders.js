import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';
import { myOrders } from '../../slices/orderSlice/orderSlice';
import { FaList } from 'react-icons/fa';

const Myorders = () => {
    const { orders } = useSelector((state) => state.orders.myOrders);
    const data = orders ? orders : [];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleViewDetails = (orderId) => {
        navigate(`/order/${orderId}`);
    };

    // const handleDeleteClick = (orderId) => {
    //     console.log(orderId);
    //     dispatch(deleteOrder(orderId)).then(() => {
    //         dispatch(getAllOrders());
    //     });
    // };

    useEffect(() => {
        dispatch(myOrders());
    }, [dispatch]);

    const columns = [
        { Header: 'Order ID', accessor: '_id' },
        { Header: 'Status', accessor: 'orderStatus' },
        { Header: 'Total Price', accessor: 'totalPrice' },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleViewDetails(row.original._id)}
                        className="text-blue-500 hover:underline focus:outline-none mx-2"
                    >
                        <FaList />
                    </button>
                </div>
            ),
        },
    ];
    function MyTable() {
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({ columns, data });
        return (
            <>
                <div className="overflow-x-auto">
                    <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()} className="py-2 px-4 border-b border-gray-200 text-start">
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                const rowClassName = row.original.orderStatus === 'Delivered' ? 'bg-green-200' : '';
                                return (
                                    <tr {...row.getRowProps()} className={`border-b border-gray-200 ${rowClassName}`}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()} className="py-2 px-4">
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    return <MyTable />;
}

export default Myorders