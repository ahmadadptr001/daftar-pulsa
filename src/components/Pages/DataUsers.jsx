import React, { useState, useEffect, useRef } from "react";
import { Mention } from 'primereact/mention';
import Sidebar from "../Layouts/Sidebar";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Menubar } from 'primereact/menubar';
import { ReadData } from "../Server/ReadData";
import { DeleteData } from "../Server/DeleteData";

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';


export default function DataUsers() {
   const items_breadcrumb = [
      { label: 'Dashboard', url: '/' },
      { label: 'Pengguna', url: "/data/users" }];
   const items_breadcrumb_home = { icon: 'pi pi-home', url: '/' }

   const [value, setValue] = useState("");
   const [filteredUsers, setFilteredUsers] = useState([]);


   //  ------------membaca data data users dari database firebase ----------------------- //
   const [users_, setUsers_] = useState([]);
   const [ users, setUsers ] = useState([]) 
   
   useEffect(() => {
      const readingData = async () => {
         const resultReadDataUsers = await ReadData("users");
         setUsers(resultReadDataUsers.map((item) => item));
         setUsers_(resultReadDataUsers.map((item) => item));
      };
      readingData();

   }, [])

   // menghapus data dari database firestore
   const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
        DeleteData("users", userConfirm)
       toast.current.show({ severity: 'info', summary: 'Terkonfirmasi', detail: 'Nomor Berhasil dihapus', life: 3000 });
       setTimeout(() => {
         window.location.reload()
      }, 2000);
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Dibatalkan', detail: 'Nomor tidak terhapus', life: 3000 });
    }


   const searchUsers = (event) => {
      const query = event.query.toLowerCase();
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    };
   
   //  template ketika sugesti muncul
    const itemTemplate = (user) => {
      return (
        <div className="flex items-center gap-2 py-1 ps-0 pe-2">
          <img
            src={user.image}
            alt={user.username}
            className="w-[25px] h-[25px] rounded-full object-cover"
          />
          <div>
            <span className="font-semibold">{user.username}</span>
            <div className="text-[.7rem] text-gray-500">{user.company}</div>
          </div>
        </div>
      );
    };


   //  ini untuk segala logika tampilan user di bawah inputan search
   const [sortOrder, setSortOrder] = useState("desc");

      // ini data untuk button sorting
      const sorting_items = [
         {
            label : "urutkan",
            items : [
               {
                  label: "Urutkan A - Z",
                  command: () => sortUsers('asc')
               },
               {
                  label: "Urutkan Z - A",
                  command: () => sortUsers('desc')
               }
            ]
         }
      ]
      // ini fungsi untuk nge sorting secara asc atau desc
      const sortUsers = (order) => {
         const sortedUsers = [...users_].sort((a, b) => {
         return order === "asc" ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
         });
         setUsers_(sortedUsers);
         setSortOrder(order);
      };

      const [userConfirm, setUserConfirm] = useState("");
      const handleConfirm = (username) => {
         setUserConfirm(username);
         setVisible(true);
      }

      // mendapatkan informasi user dan menampilkan ke dalam popup dialog
      const showInfoUser = async() => {
         const  nama_user = value.replace("@", "").replace(/\s+$/, "").toLowerCase();
      }

   return (
      <div className="wrapper">
         <div className="flex flex-nowrap">

            {/* sidebar */}
            <Sidebar />

            {/* Data -> Users */}
            <div className="container mx-auto">
               <div className="bg-[var(--secondary-color)] rounded-md p-3 ps-5">

                  <BreadCrumb model={items_breadcrumb} home={items_breadcrumb_home} className="!text-[.7rem]"/>

                  <div className="mt-5 flex flex-nowrap gap-2 item-center">
                     <Mention
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        suggestions={filteredUsers}
                        field="username"
                        onSearch={searchUsers} 
                        itemTemplate={itemTemplate} 
                        placeholder="ketik @ untuk mencari"
                        className="!w-full !p-0 !pb-0 !m-0" 
                     />
                     <button type="button" onClick={showInfoUser} className="rounded-md px-5 font-extrabold hover:bg-gray-800 focus:bg-gray-800 py-0 cursor-pointer border-[1.5px]">
                       <i className="pi pi-search"></i>
                     </button>
                  </div>

                  <div className="data-users-vertikal p-3 mt-5">
                  <Menubar model={sorting_items} className="mb-5"/>
                  <Toast ref={toast} />
                  <ConfirmDialog
                     group="declarative"
                     visible={visible}
                     onHide={() => setVisible(false)}
                     message="Apakah anda yakin ingin menghapus nomor ini?"
                     header="Confirmation"
                     icon="pi pi-exclamation-triangle"
                     accept={accept}
                     reject={reject}
                     style={{ width: '50vw' }}
                     breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
                  />
                  <ul className="space-y-4">
                     {users_.map(user => (
                        <li key={user.id} className="flex items-center space-x-4 p-3 !border-gray-700 border rounded text-[1rem]">
                           <img src={user.image} alt={user.username} className="w-12 h-12 rounded-full object-cover" />
                           <div>
                              <p className="font-bold">{user.username}</p>
                              <p className="text-gray-500 text-[.8rem]">{user.company}</p>
                           </div>
                           <Button onClick={() => handleConfirm(user.username)} icon="pi pi-trash" className="!ms-auto !bg-red-400 !text-white !border-0 !outline-0"/>
                        </li>
                     ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}