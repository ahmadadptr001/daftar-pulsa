import React, { useState, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import users_count from "/public/users-count.gif";
import { ReadData } from "../Server/ReadData";

export default function Dashboard() {
   
   const [ dataUsers, setDataUsers ] = useState([])

   useEffect(()=> {

      (async() => {
         setDataUsers(
            <>
               <h1 className="animate-pulse">loading...</h1>
            </>
         ); 
         const resultDataUsers = await ReadData("users");
         setDataUsers(
            <h1 className="font-extrabold text-[2rem]">{resultDataUsers.length}</h1>
         ); 

      })();
   }, [])


   return (
      <div className="warapper">
         <div className="flex gap-3 flex-nowrap">
            {/* sidebar */}
            <Sidebar />

            {/* dashboard */}
            <div className="dashboard p-3">
               <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">

                  <div className="rounded-md py-4 px-6 bg-[var(--secondary-color)] border-1">
                     
                     <div className="flex justify-between">
                        <span className="label font-extrabold"> Users </span>
                        <div className="icon">
                           <i className="pi pi-users"></i>
                        </div>
                     </div>
 
                     <div className="flex flex-col items-center gap-3 p-3">
                        <img src={users_count} alt="users-count-image" className="w-[120px] object-cover rounded-full mt-5 p-3"/>
                        {dataUsers}
                     </div>

                  </div>

                  <div className="rounded-md py-4 px-6 bg-[var(--secondary-color)] border-1">
                     
                     <div className="flex justify-between">
                        <span className="label font-extrabold"> Users </span>
                        <div className="icon">
                           <i className="pi pi-users"></i>
                        </div>
                     </div>
 
                     <div className="flex flex-col items-center gap-3 p-3">
                        <img src={users_count} alt="users-count-image" className="w-[120px] object-cover rounded-full mt-5 p-3"/>
                        {dataUsers}
                     </div>

                  </div>

                  <div className="rounded-md py-4 px-6 bg-[var(--secondary-color)] border-1">
                     
                     <div className="flex justify-between">
                        <span className="label font-extrabold"> Users </span>
                        <div className="icon">
                           <i className="pi pi-users"></i>
                        </div>
                     </div>
 
                     <div className="flex flex-col items-center gap-3 p-3">
                        <img src={users_count} alt="users-count-image" className="w-[120px] object-cover rounded-full mt-5 p-3"/>
                        {dataUsers}
                     </div>

                  </div>
                  
               </div>
            </div>
         </div>
      </div>
   );
}
