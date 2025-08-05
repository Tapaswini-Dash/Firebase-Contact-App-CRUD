import React , {createContext} from "react";
import Navbar from "./Components/Navbar"
import { db } from "./config/firebase"; 
import './app.css'
import { FaPlusCircle } from "react-icons/fa";
import {useEffect , useState} from "react";
import { collection, onSnapshot } from "firebase/firestore";
import ContactsCard from "./Components/ContactsCard";
import AddAndUpdateContact from "./Components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
 import { ToastContainer, toast } from 'react-toastify';
 import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./Components/NotFoundContact";




const App = () => {

const [contacts , setContacts] = useState([]);
  const {onOpen, onClose , isOpen} = useDisclouse();



useEffect(() => {

  const getContacts = async () => {
     try {


const contactsRef = collection(db , "contacts")


onSnapshot (contactsRef , (snapshot)=>{
  
const contactList = snapshot.docs.map((doc)=>
{
  return{
    id: doc.id,
    ...doc.data(),
  };
});
setContacts(contactList);
return contactList;
 
});

     } catch (error) {
      console.log(error);
     }   
    };

    getContacts();
  }, []);




  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef  = collection (db , "contacts");
    
onSnapshot (contactsRef , (snapshot)=>{
  
const contactList = snapshot.docs.map((doc)=>
{
  return{
    id: doc.id,
    ...doc.data(),
  };
});

const filteredContacts = contactList.filter(contact => 
  contact.name.toLowerCase().includes(value.toLowerCase())
)
  setContacts(filteredContacts);
  return filteredContacts;
});


  };



  return (
    <>
    <div className=" max-w-[370px] mx-auto px-4">
      
      <Navbar />
      <div className="flex flex-grow relative items-center gap-2 mt-4">
        <img src="material-symbols_search.svg"  className="absolute left-3 w-5 h-5" alt="Search" />
        <input type="text" placeholder="Search Context" className="flex-grow h-10 bg-transparent border  text-white pl-10 border-white rounded-md"
        onChange= {filterContacts}  />
        <div>
             <FaPlusCircle 
             onClick={onOpen}
             className="text-4xl text-white cursor-pointer" />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {contacts.length <= 0 ? (
        <NotFoundContact />
        ) : (
         contacts.map((contact) => (
         <ContactsCard key={contact.id} contact={contact} />
        ))
      )}
      </div>
    </div>
    <AddAndUpdateContact isUpdate={false} onClose={onClose} isOpen={isOpen} />
    <ToastContainer position="bottom-center" autoClose={2000} />
    </>
  )
}

export default App
