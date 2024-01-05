import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useDispatch } from 'react-redux';
import { createProduct, getAdminProducts } from '../../../slices/adminSlice/adminSlice';
import { useNavigate } from 'react-router-dom';
const AddProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 1,
    });
    const [image, setImage] = useState(null);
    const [productPreview, setProductPreview] = useState("https://ov12-engine.flamingtext.com/netfu/tmp28014/coollogo_com-3966664.png");
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleImageChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setProductPreview(reader.result);
                setImage(e.target.files[0]);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = new FormData();
        productData.append('name', formData.name);
        productData.append('description', formData.description);
        productData.append('price', formData.price);
        productData.append('category', formData.category);
        productData.append('stock', formData.stock);
        productData.append('image', image);
        dispatch(createProduct({ productData })).then(() => {
            dispatch(getAdminProducts())
            navigate("/admin/manageproduct");
        })
    };

    return (
        <div className="grid bg-slate-900 h-[100vh] fixed z-20 top-0 left-0 w-[100vw] place-content-center">
            <div className="bg-slate-800 p-10 rounded-lg text-white">
                <h3 className="text-xl mb-4 text-cyan-500 font-bold">Add Product</h3>
                <form
                    className="flex gap-4 text-black flex-col"
                    onSubmit={handleSubmit}
                >
                    <input
                        required
                        className="w-[300px] outline-none p-2 rounded-md"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <textarea
                        required
                        className="w-[300px] outline-none p-2 rounded-md"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <input
                        required
                        className="w-[300px] outline-none p-2  rounded-md"
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                    <input
                        required
                        className="w-[300px] outline-none p-2  rounded-md"
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleInputChange}
                    />
                    <input
                        required
                        className="w-[300px] outline-none p-2  rounded-md"
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                    />
                    <div className='flex justify-between border rounded-md bg-slate-700 p-2 items-center'>

                        <div className='w-14 h-14 rounded-full overflow-hidden'>
                            <img className='object-cover w-full h-full'
                                src={productPreview}
                                alt="Product" />
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
                            onChange={handleImageChange} />
                    </div>
                    <motion.input
                        type="submit"
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-[300px]  h-[40px] hover:bg-teal-700 bg-teal-600 rounded-lg"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;
