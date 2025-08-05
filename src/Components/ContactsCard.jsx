import React, { useState } from 'react'
import {db} from '../config/firebase'
import { deleteDoc, doc } from 'firebase/firestore';
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclouse from '../hooks/useDisclouse';
 import {  toast } from 'react-toastify';

const ContactsCard = ({contact}) => {
  const {onOpen, onClose , isOpen} = useDisclouse();
  

  
  const deleteContact = async (id) =>{
    try{
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Succesfully");
      onClose();
    }
     catch (error) {
      console.log(error);
     }
  }



  return (
    <>
     <div 
     key={contact.id} 
     className= " border border-gray-300 hover:border-amber-400 transition duration-300 ease-in-out transform  hover:translate-x-1  hover:shadow-xl  flex justify-between items-center p-4 rounded-lg  bg-yellow-200">
            <div className="flex gap-2 ">
            <img src="/ph_user-circle-thin.svg" className="text-4xl" alt="" />
            <div className="text-black"> 
              <h2 className="text-[16px] font-medium">
                 {contact.name}
              </h2>
              <h1 className="text-sm">
                {contact.email}
              </h1>
            </div>
            </div>
            <div className="flex gap-2">
              <img src="/Vector1.svg" onClick={onOpen} className="cursor-pointer" alt="" />
              <img src="/Vector.svg" onClick={ () => deleteContact (contact.id) } className="cursor-pointer" alt="" />
            </div>
            </div>
            <AddAndUpdateContact contact={contact}
            isUpdate={true}
            isOpen={isOpen} onClose={onClose}/>
       
            </>
  )
}

export default ContactsCard
