import React, { useState, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import users_count from "/public/users-count.gif";
import riwayat from '/public/riwayat.gif';
import { ReadData } from "../Server/ReadData";
import { BreadCrumb } from "primereact/breadcrumb";

export default function Dashboard() {
   
   const [ dataUsers, setDataUsers ] = useState([]);
   const [ dataRiwayat, setDataRiwayat ] = useState([]);

   // users count
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
   }, []);

   // riwayat count
   useEffect(() => {
      (async() => {
         setDataRiwayat(
            <>
               <p className="animate-pulse">Loading..</p>
            </>
         );
         const resultDataResponseRiwayat = await ReadData("riwayat-transaction");
         setDataRiwayat(
            <>
               <h1 className="font-extrabold text-[2rem]">{resultDataResponseRiwayat.length}</h1>
            </>
         )
      })();
   }, [])

   const items_breadcrumb = [
      { label: 'Dashboard', url: '/' }];
   const items_breadcrumb_home = { icon: 'pi pi-home', url: '/' }

   return (
      <div className="warapper">
         <div className="flex gap-3 flex-nowrap">
            {/* sidebar */}
            <Sidebar />

            {/* dashboard */}
            <div className="dashboard p-3 w-full">
               <BreadCrumb model={items_breadcrumb} home={items_breadcrumb_home} className="!text-[.7rem] my-4"/>  
               <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">

                  <div className="rounded-md py-4 px-6 bg-[var(--secondary-color)] border-1">
                     
                     <div className="flex justify-between items-center !text-[.8rem]">
                        <span className="label font-extrabold"> Pengguna </span>
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
                     
                     <div className="flex justify-between items-center !text-[.8rem]">
                        <span className="label font-extrabold"> Riwayat </span>
                        <div className="icon">
                           <i className="pi pi-comments"></i>
                        </div>
                     </div>
 
                     <div className="flex flex-col items-center gap-3 p-3">
                        <img src={riwayat} alt="users-count-image" className="w-[120px] object-cover rounded-full mt-5 p-3"/>
                        {dataRiwayat}
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
