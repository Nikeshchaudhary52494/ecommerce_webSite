import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import LoggedInComponenet from './LoginUserCart';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartProducts } from '../../slices/cartSlice/cartSlice';
const Cart = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user)

    const dispatch = useDispatch();
    const location = useLocation()

    useEffect(() => {
        if (isAuthenticated === true)
            dispatch(getAllCartProducts(user._id));
    })

    return (
        <>
            {isAuthenticated ? (
                <LoggedInComponenet />) : (
                <div class="text-center  m-20 h-[50vh]">
                    <div class="grid  place-content-center">
                        <img class="h-[150px]" src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="cartImage" />
                    </div>
                    <h3 class="text-2xl m-5 text-black font-thin">
                        Missing Cart items?
                    </h3>
                    <p>Login to see items you added previously</p>
                    <Link to="/user/login" state={location.pathname}>
                        <button class="bg-orange-600 m-4 w-[200px] h-10 rounded-sm">
                            Login
                        </button>
                    </Link>
                </div>
            )}
        </>
    )
}

export default Cart