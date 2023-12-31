import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom"
import demoAvatar from "../images/userProfile.avif"
import Logo from "../images/byte.png"
import { registerUser, resetError, resetIsVerificationEmailSend } from '../../slices/userSlice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'


const SignUp = () => {
    const { isVerificationEmailSend, error } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        avatar: null,
    });
    const [avatarPreview, setAvatarPreview] = useState(demoAvatar);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user.name)
        console.log(user.avatar)
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('image', user.avatar);
        dispatch(registerUser(formData));
    };

    const registerDataChange = (e) => {
        if (e.target.name === "image") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setUser({ ...user, avatar: e.target.files[0] });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (isVerificationEmailSend) {
            toast.success("verification link send");
            dispatch(resetIsVerificationEmailSend());
            navigate("/user/verify");
        }
        if (error) {
            toast.error(error);
            dispatch(resetError());
        }
    }, [navigate, location, error, isVerificationEmailSend, dispatch])
    return (
        <>
            <div className="grid bg-slate-900 h-[100vh]  fixed z-20 top-0 left-0 w-[100vw] place-content-center">
                <div className="bg-slate-800 p-10 rounded-lg text-white">
                    <div className="px-4" >
                        <img className='w-24' src={Logo} alt="Byte logo" />
                        <h3 className="text-xl mb-4 ">Sign UP</h3>
                    </div>
                    <form
                        className="flex gap-4 text-black flex-col"
                        onSubmit={handleSubmit} >
                        <input
                            required
                            className="w-[300px ] outline-none p-2 m-2 rounded-md"
                            type="text"
                            name='name'
                            placeholder='Name'
                            value={user.name}
                            onChange={registerDataChange} />

                        <input
                            required
                            className="w-[300px ] outline-none p-2 m-2 rounded-md"
                            type="email"
                            name='email'
                            placeholder='Email'
                            value={user.email}
                            onChange={registerDataChange} />

                        <input
                            required
                            className="w-[300px ] outline-none p-2 m-2 rounded-md"
                            type="password"
                            name='password'
                            placeholder='Password'
                            value={user.password}
                            onChange={registerDataChange} />
                        <div className='flex justify-between border rounded-md bg-slate-700 mx-2 p-2 items-center'>

                            <div className='w-14 h-14 rounded-full overflow-hidden'>
                                <img className='object-cover w-full h-full'
                                    src={avatarPreview}
                                    alt="Avatar" />
                            </div>
                            <label for="fileInput" class="cursor-pointer bg-blue-500 
                            text-white py-2 px-4  rounded-md">
                                <span class="hidden md:inline">Choose File</span>
                                <span class="md:hidden">Upload</span>
                            </label>
                            <input
                                required
                                id='fileInput'
                                className='hidden '
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={registerDataChange} />
                        </div>
                        <motion.input
                            type="submit"
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: .5 }}
                            className="w-[300px] m-2 h-[40px] hover:bg-teal-700 bg-teal-600 rounded-lg" />
                    </form>
                    <Link to="/user/login">
                        <p className="text-sm ">
                            Already a user? Login
                        </p>
                    </Link>
                </div >
                <Link to="/" >
                    <button className="text-white p-2 mt-5"  >Go to Home</button>
                </Link>
            </div >
        </>
    )
}

export default SignUp