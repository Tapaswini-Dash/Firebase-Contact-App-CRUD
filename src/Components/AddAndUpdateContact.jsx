import React from 'react'
import Modal from './Modal'
import {Formik , Form , Field, ErrorMessage} from "formik";
import {db} from '../config/firebase'
import { addDoc, collection } from 'firebase/firestore';
 import { toast } from 'react-toastify';
 import "react-toastify/dist/ReactToastify.css";
 import { doc, updateDoc } from 'firebase/firestore';
import * as Yup from "yup";

const contactsSchemaValidation = Yup.object().shape({
    name : Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
})

const AddAndUpdateContact = ({isOpen , onClose , isUpdate, contact}) => {
   const addContact = async (contact) => {
    try{
        const contactRef = collection(db , "contacts");
        await addDoc(contactRef, contact);
        onClose();
        toast.success("Contact Added Successfully");
    }
    catch (error) {
        console.log(error);
    }
    };

     const updateContact = async (contact , id) => {
    try{
        const contactRef = doc(db , "contacts" , id);
        await updateDoc(contactRef, contact);
        onClose();
        toast.success("Contact Updated  Successfully");
    }
    catch (error) {
        console.log(error);
    }
    }

 return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
       <Formik 
       validationSchema={contactsSchemaValidation}
       initialValues={isUpdate && contact
         ? {
           name:contact.name,
           email:contact.email,
       } 
       :{
        name:"",
        email:"",
       }}
       onSubmit={(values)=>{
        console.log(values);
        if(isUpdate && contact?.id){
        updateContact(values , contact.id)}
        else{
        
        addContact(values);
       }
      
       }}

       >
        <div className=''>
        <Form className='flex flex-col gap-4 px-6 py-4'>
            <div className="flex flex-col  gap-3 m-2 px-2">
            <label htmlFor="name">Name</label>
            <Field  name="name" type="text" className =" rounded-md w-full border shadow-sm border-gray-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 px-4 h-10  " />
            <div className='text-xs text-red-500'>
                <ErrorMessage name="name" />

            </div>
            </div>

            <div className="flex flex-col gap-3 m-2 px-2 ">
             <label htmlFor="email">Email</label>
            <Field name="email" type="email" className ="rounded-md w-full border shadow-sm border-gray-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 px-4 h-10  " />
            <div className='text-xs text-red-500'>
                <ErrorMessage name="email" />

            </div>
            </div>

            <button type="submit" className='border bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md px-5  py-2 self-end transition-all duration-200 '>
               {isUpdate ? "update": "add"} Contact 
            </button>

        </Form>
        </div>
       </Formik>
     
    </Modal>
    </div>
  )
}

export default AddAndUpdateContact
