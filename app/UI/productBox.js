import { add } from "@/redux/slices/cartSlice";
import { useDispatch} from "react-redux";

const ProductBox = ({ item, showNoti }) => {
  const dispatch = useDispatch();

  const addProductToCart = (item) => {
    dispatch(add({ ...item, amount: 1 }));
    showNoti(true);
  };
  return (
    <div className="w-[250px] bg-white shadow-md rounded-xl border-black py-4 flex flex-col justify-between gap-3 mx-auto">
      <h1 className="border-b-2 px-4">{item.title}</h1>
      <img
        src={item.image}
        alt="product image"
        className=" w-full"
        loading="lazy"
      />
      <div className="px-4 flex flex-col gap-2">
        <h3 className="text-2xl">Price ${item.price}</h3>
        <button
          className="buttonColor text-white py-3 w-full active:scale-95 outline-none"
          onClick={() => addProductToCart(item)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default ProductBox;
