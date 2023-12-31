import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleOrder } from '../../../slices/orderSlice/orderSlice';
import { STATUSES } from '../../../store/statuses';
import Loader from '../../layout/Loader/Loader';
import SingleOrder from '../../User/SingleOrder';
import { resetIsOrderStatusUpdated, updateOrderStatus } from '../../../slices/adminSlice/adminSlice';
import { toast } from 'react-toastify';

const ManageSingleOrder = () => {
    const dispatch = useDispatch();
    const { order, status } = useSelector((state) => state.orders.singleOrderData);
    const { error, isOrderStatusUpdated } = useSelector((state) => state.admin);
    const { id } = useParams();

    const [selectedOrderStatus, setSelectedOrderStatus] = useState(order?.orderStatus || '');

    useEffect(() => {
        dispatch(getSingleOrder(id));
        if (isOrderStatusUpdated) {
            toast.success("Order status updated");
            dispatch(resetIsOrderStatusUpdated());
        }
        if (error) {
            toast.error(error);
        }
    }, [dispatch, id, isOrderStatusUpdated, error]);

    const handleOrderStatusChange = (e) => {
        setSelectedOrderStatus(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(updateOrderStatus({ id, selectedOrderStatus }));
    };

    if (status === STATUSES.LOADING) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 flex md:flex-row flex-col-reverse">
            <div className='w-[70%]'>
                <SingleOrder />
            </div>
            <div className='border-l border-s-slate-700 p-10'>
                <p className='text-cyan-500 font-bold text-3xl mb-3'>Update Order Status:</p>
                <select
                    className='bg-slate-800 text-white p-2 mx-2 rounded'
                    value={selectedOrderStatus}
                    onChange={handleOrderStatusChange}
                >
                    <option value='Processing'>Processing</option>
                    <option value='Shipped'>Shipped</option>
                    <option value='Delivered'>Delivered</option>
                </select>
                <button
                    className='bg-green-500 text-white p-2 rounded mt-2'
                    onClick={handleSubmit}
                >
                    Update Status
                </button>
            </div>
        </div>

    );
};

export default ManageSingleOrder;
