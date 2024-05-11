import { deleteProduct } from "@/redux/slices/cartSlice";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const ConfirmModal = ({ id, show }) => {
  const dispatch = useDispatch();
  const confirmContainer = useRef();

  const onConfirmDeleteHandler = () => {
    dispatch(deleteProduct(id));
    show(false);
  };

  const onCloseDeleteHandler = () => {
    show(false);
  };
  

  useEffect(() => {
    const onClickOutConfirmcontainer = (e) => {
      if (confirmContainer.current && !confirmContainer.current.contains(e.target)) {
        show(false)
      }
    };

    document.addEventListener("click", onClickOutConfirmcontainer);

    return () => {
      document.removeEventListener("click", onClickOutConfirmcontainer);
    };
  }, [show]);
  return (
    <main
      className="bg-black/60 z-10 absolute left-0 top-0 w-screen h-screen flex justify-center items-center"
      
    >
      <section ref={confirmContainer} className="z-10 m-auto bg-white flex flex-col m-auto w-[600px] min-h-[150px]  rounded-md gap-4 p-4">
        <h1 className="text-[30px] font-semibold">Confirm Delete Product</h1>
        <p>Do you confirm for delete this product ?</p>
        <div className="flex justify-end gap-2 mx-2 my-2">
          <button
            type="button"
            className="border rounded-md text gray-400 border border-gray-400 px-3 py-2"
            onClick={onCloseDeleteHandler}
          >
            Close
          </button>
          <button
            className="border rounded-md buttonColor  text-white px-3 py-2"
            onClick={onConfirmDeleteHandler}
          >
            Ok
          </button>
        </div>
      </section>
    </main>
  );
};

export default ConfirmModal;
