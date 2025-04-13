import React, { useRef, useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
   const navigate = useNavigate();

   const sidebar_items = [
      {
         label: "Dashboard",
         icon: "!text-magenta pi pi-globe",
         command: () => navigate("/")
      },
      {
         label: "Data",
         icon: "!text-cyan-400 pi pi-cloud",
         items: [
            {
               label: "Pengguna",
               icon: "pi pi-users",
               command: () => navigate('/data/users')
            },
            {
               label: "Laba",
               icon: "pi pi-money-bill",
            },
            {
               label: "Tambahkan kontak",
               icon: "pi pi-user-plus",
               command: () => navigate("/data/users/add")
            },
         ],
      },
      {
         label: "Transaksi",
         icon: "!text-blue-400 pi pi-wallet",
         items: [
            {
               label: "Riwayat",
               icon: "pi pi-mobile",
               command: () => navigate("/data/transaction/riwayat")
            },
            {
               label: "Pembelian",
               icon : "pi pi-dollar",
               command: () => navigate("/data/transaction/buy")
            },
            {
               label: "Utang",
               icon: "pi pi-money-bill",
               command: () => navigate("/data/transaction/utang")
            },
            {
               label: "Piutang",
               icon: "pi pi-credit-card",
               command: () => navigate("/data/transaction/piutang")
            },
         ],
      },
   ];

   const sidebar_items_bottom = [
      {
         label: "admin",
         icon: "pi pi-user",
         items: [
            {
               label: "login",
               icon: "!text-green-400 pi pi-sign-in",
            },
            {
               label: "logout",
               icon: "!text-red-400 pi pi-sign-out",
            },
         ],
      },
   ];

   const [expand, setExpand] = useState(true);

   const handlePanelToggle = () => {
      setExpand(!expand);
   };
   
   return (
      <>
      
         <aside
            className={`${
               expand ? "w-[33px]" : "w-[200px]"
            } py-4 px-3 flex flex-col border-gray-100 bg-gray-900 h-full min-h-[100vh] transition-[width] duration-200 z-10`}
         >
            <div onClick={handlePanelToggle} className="flex gap-2 items-center z-100">
               <i className={`!font-extrabold text-gray-500 pi pi-arrow-${expand ? "right" : "left"} transition-all duration-200 cursor-pointer hover:scale-105 ${ expand ? "bg-gray-800" : "bg-gray-900"} rounded-full p-2`}></i> {" "}
               <div
                  className={`!font-extrabold text-gray-500 transition-transform duration-200 ${
                     expand ? "scale-0" : "scale-100"
                  }`}
               >
                  Transaction
               </div>
            </div>
            <PanelMenu
               model={sidebar_items}
               className={`mt-3 transition-transform duration-200 w-full mb-auto ${expand ? "scale-0" : "scale-100"}`}
            />
            <PanelMenu
               model={sidebar_items_bottom}
               className={`transition-transform duration-200 w-full ${expand ? "scale-0" : "scale-100"}`}
            />
         </aside>
      </>
   );
}
