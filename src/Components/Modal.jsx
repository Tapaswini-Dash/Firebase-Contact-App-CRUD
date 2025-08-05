import {createPortal} from "react-dom";
import { IoIosClose } from "react-icons/io";
const Modal = ({onClose, isOpen, children}) => {
  return createPortal (
  <>
  {isOpen && (
    <div   className="absolute min-h-[200px] min-w-[86%] grid place-items-center top-0 h-screen w-screen backdrop-blur" >
    <div className="m-auto z-50 relative min-h-[200px] text-black min-w-[40%] bg-white"> 
  <div className=" flex justify-end">
    <IoIosClose onClick={onClose} className="self-end mr-4 mt-4 hover:text-red-600 text-4xl "/>
  </div>
  {children}
  </div>


  
  </div>
  )}
  </>
 , document.getElementById("modal-root") );
}

export default Modal
