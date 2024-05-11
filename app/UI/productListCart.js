import { changeAmount, deleteProduct } from "@/redux/slices/cartSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductListCart = ({ detail,index,showConfirm }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const [input,setInput] = useState(0)
  const productAmount = cart.items.find(item => item.id === detail.id).amount

  const onDeleteProductHandler = (id) => {
    showConfirm(true,id)
  }

  const onChangeValueProduct = (e,item) => {
    const value = +e.target.value
    dispatch(changeAmount({...item,amount:value}))
    const format = value.toString().padStart(1, '0');
    e.target.value = format
  }

  return (
      <div className={`w-full flex text-sm gap-2 px-2 py-2 items-center  border-gray-400 border ${index !== 0?'border-t-0':''}`}>
        <img className="h-8 w-8" src={detail.image} alt="" />
        <p className="lg:w-[500px] md:w-[300px] w-[200px]">{detail.title}{index}</p>
        <p className="w-[50px]">${detail.price}</p>
        <input
          type="number"
          name="amount"
          min={1}
          max={99}
          value={detail.amount}
          className="border border-gray-400 w-[50px]"
          onChange={(e)=> onChangeValueProduct(e,detail)}
        />
        <p className="w-[50px]">${detail.price * productAmount}</p>
        <button className="bg-red-500 w-5 h-5 flex justify-center items-center active:scale-90" onClick={()=>onDeleteProductHandler(detail.id)}>
          <svg
            className="w-[60%] h-[60%]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              fill="#ffffff"
              d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
            />
          </svg>
        </button>
      </div>
  );
};

export default ProductListCart;
