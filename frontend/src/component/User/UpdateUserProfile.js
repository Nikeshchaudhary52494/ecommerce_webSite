import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { STATUSES } from '../../store/statuses';
import { loadUser, updateUserProfile } from '../../slices/userSlice/userSlice';

const UpdateUserProfile = () => {
    const { user: data, status } = useSelector((state) => state.user);
    const { email, name, avatar } = data;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({
        name: "",
        email: "",
        avatar: null,
        oldAvatarUrl: "",
        oldAvatarPunlicId: ""
    });
    const [avatarPreview, setAvatarPreview] = useState("");
    console.log(`this is the url${user.oldAvatarUrl}`);
    useEffect(() => {
        if (!user) {
            dispatch(loadUser());
        }
        setUser({
            email,
            name,
            oldAvatarPunlicId: avatar?.public_id,
            oldAvatarUrl: avatar?.url,
        });
        setAvatarPreview(avatar?.url);
    }, [email, name, avatar, dispatch]);
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('avatar', user.avatar);
        formData.append('oldAvatarUrl', user.oldAvatarUrl);
        formData.append('oldAvatarPublicId', user.oldAvatarPunlicId);
        dispatch(updateUserProfile(formData)).then(() => {
            navigate(location.state.previousLocation);
        })
    };

    if (status === STATUSES.LOADING) {
        return (
            <div className="w-full grid place-content-center h-[80vh] ">
                <Loader />
            </div>
        );
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }

    return (
        <div className='grid bg-slate-900 h-[100vh]  fixed z-20 top-0 left-0 w-[100vw] place-content-center'>
            <div className="bg-slate-800 p-10 rounded-lg text-white">
                <h3 className="text-xl mb-4 text-cyan-500 font-bold">Edit Profile Details</h3>
                <form className="flex gap-4 text-black flex-col" onSubmit={handleSubmit}>
                    <input
                        required
                        className="w-[300px] outline-none p-2 rounded-md"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={registerDataChange}
                    />
                    <input
                        required
                        className="w-[300px] outline-none p-2 rounded-md"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={user.name}
                        onChange={registerDataChange}
                    />
                    <div className='flex justify-between border rounded-md bg-slate-700 p-2 items-center'>

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
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange} />
                    </div>
                    <motion.input
                        type="submit"
                        value="Update"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-[300px] text-white font-bold p-2 hover:bg-teal-700 bg-teal-600 rounded-lg"
                    />
                </form>
            </div>
        </div>
    );
};

export default UpdateUserProfile;
