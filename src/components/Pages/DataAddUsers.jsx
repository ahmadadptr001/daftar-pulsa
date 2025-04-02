import { useState, useRef, useEffect } from "react";

import Sidebar from "../Layouts/Sidebar";
import { BreadCrumb } from "primereact/breadcrumb";
import { InputMask } from "primereact/inputmask";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { CreateData } from "../Server/CreateData";

export default function DataAddUsers() {

   const [username, setUsername] = useState("");
   const [company, setCompany] = useState("")
   const [image, setImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Goq-0zy_b9XL8fpnLxuFi7hSH3BFQUCRGQ&s");

   const items_breadcrumb = [
      { label: 'Data' },
      { label: 'users', url: "/data/users" },
      {label: "add", url:"/data/users/add"}];
   const items_breadcrumb_home = { icon: 'pi pi-home', url: '/' }

   // ini untuk modal confirm nya
   const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
      if (username.trim() === "" || company === "") {
        toast.current.show({ severity: 'warn', summary: 'Gagal Menambahkan Nomor', detail: 'username atau nomor hp tidak boleh kosong', life: 3000 });
      }
      else {
         CreateData("users", username, company, image);
         setUsername("");
         setCompany("");
         setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Goq-0zy_b9XL8fpnLxuFi7hSH3BFQUCRGQ&s")
         toast.current.show({ severity: 'info', summary: 'Terkonfirmasi', detail: 'Nomor berhasil ditambahkan', life: 3000 });
         setTimeout(() => {
            window.location.reload()
         }, 2000);
      }
       
   }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Tidak Terkonfirmasi', detail: 'Nomor batal ditambahkan', life: 3000 });
    }

   return (
      <>
         <section className="flex flex-nowrap">
            
            {/* sidebar */}
            <Sidebar />

            {/* Data add users */}
            <div className="DataAddUsers h-full w-full">
               <div className="container mx-auto p-3 px-5 bg-[var(--secondary-color)]">
                  <BreadCrumb model={items_breadcrumb} home={items_breadcrumb_home} />
                  
                  <p className="text-lg sm:text-2xl font-extrabold my-5">Add Data</p>

                  <div className="form-input mt-10">
                     <FloatLabel className="mb-10">
                        <InputText id="username" onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan Teks"></InputText>
                        <label htmlFor="username">Nama Pengguna</label>
                     </FloatLabel>

                     <FloatLabel className="mb-10">
                        <InputMask id="company" onChange={(e) => setCompany(e.target.value)} mask="9999-9999-9999" placeholder="08xx-xxxx-xxxx"></InputMask>
                        <label htmlFor="company">Nomor HP</label>
                     </FloatLabel>

                     <FloatLabel className="mb-10">
                        <InputText id="image" onChange={(e) => setImage(e.target.value)} placeholder="kosongan jika tida ingin"></InputText>
                        <label htmlFor="image">URL gambar</label>
                     </FloatLabel>

                     <Toast ref={toast} />
                     <ConfirmDialog
                        group="declarative"
                        visible={visible}
                        onHide={() => setVisible(false)}
                        message="Apakah Anda yakin ingin menambahkan nomor ini?"
                        header="Konfirmasi"
                        icon="pi pi-exclamation-triangle"
                        accept={accept}
                        reject={reject}
                        style={{ width: '50vw' }}
                        breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
                     />
                     <div className="card flex justify-center md:justify-start">
                        <Button onClick={() => setVisible(true)} icon="pi pi-check" label="Tambahkan"
                           className=" !text-white py-2 w-full md:w-auto !justify-center flex !font-extrabold !bg-teal-700 rounded-sm cursor-pointer hover:!bg-teal-800 focus:!bg-teal-800"
                        />
                     </div>
                     {/* <button type="button" className="text-center text-white py-2 w-full bg-teal-700 rounded-sm cursor-pointer hover:bg-teal-800 focus:bg-teal-800">Tambahkan</button> */}
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}