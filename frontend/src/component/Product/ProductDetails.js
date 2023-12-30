import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../store/statuses';
import { fetchProduct } from "../../slices/productSlice/productDetailsSlice";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import Carousel from "react-material-ui-carousel"
import ReactStars from "react-rating-stars-component"
import ReviewCard from "./ReviewCard.js"
const ProductDetails = () => {
  const [numberOfProduct, setNumberOfProduct] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, status } = useSelector((state) => state.productDetails);


  const addToCart = (productId, numberOfProduct) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || {};

    if (!existingCart[productId]) {
      // If the product is not in the cart, add it with the specified quantity
      existingCart[productId] = numberOfProduct;
      localStorage.setItem('cart', JSON.stringify(existingCart));
      alert('Product added to the cart!');
    } else {
      // If the product is already in the cart, update the quantity
      existingCart[productId] += numberOfProduct;
      localStorage.setItem('cart', JSON.stringify(existingCart));
      alert('Product quantity updated in the cart!');
    }
  };


  useEffect(() => {
    dispatch(fetchProduct({ id: id }));
  }, [dispatch, id]);



  if (status === STATUSES.LOADING) {
    return <h2><Loader />
    </h2>;

  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };

  return (
    < >
      <div className=" max-w-5xl mx-auto p-4 flex items-center lg:flex-row lg:items-start flex-col lg:items-top gap-10 m-5 justify-center ">

        {/* Carousel section */}
        <div class=" md:w-1/2 border w-[75%]  shadow-xl " >
          <div class=" md:w-1/2  mx-auto w-[75%] h-[60%] ">
            <Carousel   >
              {product.images && product.images.map((item, i) => (
                <img class="min-h-50vh" key={item.url} src={item.url} alt="hello" />
              ))}
            </Carousel>
          </div>
        </div>

        {/* Details section */}
        <div class="border p-5 scrollbar shadow-xl w-3/4 md:w-1/2">
          <h2 class="text-2xl" >{product.name}</h2>
          <p class="text-sm font-thin text-slate-600 border-b border-slate-400 mb-4 pb-4">#{product._id}</p>
          <ReactStars {...options} />
          <p class="border-b border-slate-400 mb-4 pb-4" >({product.numberOfReviews} Reviews)</p>
          <h2 class="text-orange-500 text-3xl font-bold">${product.price} <br /><p class="text-sm font-thin text-slate-600 border-b border-slate-400 mb-4 pb-4" > Including all taxes</p> </h2>
          <div class="flex flex-col items-center " >
            <div class="flex items-center ">
              <button
                class="p-4 w-[50px] h-[40px] grid place-content-center bg-green-400 rounded-l-lg "
                onClick={() => setNumberOfProduct((prevCount) => prevCount - 1)}
              >-</button>
              <input
                class="border-y-2 h-[40px] text-center border-slate-400 outline-none  "
                value={numberOfProduct}
                type="text"
                style={{ pointerEvents: "none" }}
              />
              <button
                class="p-4 w-[50px] h-[40px] hover:bg-green-500 bg-green-400 rounded-r-lg grid place-content-center "
                onClick={() => setNumberOfProduct((prevCount) => prevCount + 1)}
              >+</button>
            </div>
            <button class="w-[200px] h-[40px] bg-yellow-500 rounded-3xl my-4 hover:bg-yellow-700 duration-500 " onClick={() => addToCart(product._id, numberOfProduct)} >Add to Cart</button>
          </div>
          <p class="border-b border-slate-400 mb-4 pb-4">Staus: <b>{product.stock}</b></p>
          <p><span class="text-2xl" >
            Description:
          </span> <br />
            {product.description}
          </p>
        </div>
      </div>

      <div class=" w-3/4  max-w-3xl flex p-4 lg:px-12  flex-col  mx-auto items-center justify-between sm:flex-row ">
        <h3 class="text-2xl text-center font-medium " >Reviews</h3>

        <button class="text-white  font-medium w-[200px] h-[40px] bg-blue-200 rounded-lg">Submit Review</button>

      </div>


      {/* Review section */}

      {product.reviews && product.reviews[0] ? (
        <div class="flex flex-col mx-auto gap-10 w-3/4  items-center  p-4 ">
          {product.reviews && product.reviews.map((review) =>
            <div class="p-5 border shadow-lg" >
              <ReviewCard review={review} />
            </div>

          )}
        </div>
      ) : (
        <p class="text-center mb-32 text-red-400 font-medium">
          No Rerview Available
        </p>
      )}
    </>
  )
}

export default ProductDetails