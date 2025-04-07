import { useState, useRef, useEffect } from "react";

import Sidebar from "../Layouts/Sidebar";

import { BreadCrumb } from "primereact/breadcrumb";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from "primereact/inputmask";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { TransactionPembelian } from "../Server/TransactionPembelian";

export default function Buy() {

   const [company, setCompany] = useState("");
   const [jumlahPulsa, setJumlahPulsa] = useState("");
   const [visible, setVisible]= useState(false)
   const toast = useRef(null)

   const items_breadcrumb = [
      { label: 'Dashboard', url: '/' },
      { label: 'Pembelian', url: "/data/transaction/buy" }]
      ;
   const items_breadcrumb_home = { icon: 'pi pi-home', url: '/' }


   const accept = async () => {
      if (company === "" || jumlahPulsa === "") {
         toast.current.show({ severity: 'warn', summary: 'Peringatan', detail: "Nomor / jumlah pembayaran tidak boleh kosong", life: 1000 });
      } else {
         try {
            await TransactionPembelian("transaction-pembelian", company, jumlahPulsa);
            toast.current.show({ severity: 'info', summary: 'Sukses menambahkan data transaksi', detail: "Transaksi pembayaran sukses", life: 1000 });

            setCompany(""); setJumlahPulsa("");

            setTimeout(() => {
               window.location.reload();
            }, 1500);
         }
         catch (error) {
            toast.current.show({ severity: 'error', summary: 'Gagal menambahkan data transaksi', detail: error.message, life: 1000 });
         }
            
      }
   }

   const reject = () => {
      toast.current.show({ severity: 'error', summary: 'Gagal menambahkan data transaksi', detail: "Transaksi pembayaran dibatalkan", life: 2000 });
   }
   return (
      <>
         
         <section className="flex flex-nowrap">

            {/*  sidebar */}
            <Sidebar />

            <div className="BuySection h-full w-full">
               <div className="container mx-auto p-3 px-5 bg-[var(--secondary-color)]">
                  
                  <BreadCrumb model={items_breadcrumb} home={items_breadcrumb_home} />

                  <h2 className="text-lg sm:text-xl font-extrabold mt-4">
                     Transaksi Pembelian
                  </h2>

                  <FloatLabel className="mt-8">
                     <InputMask id="company" onChange={(e) => setCompany(e.target.value)} mask="9999-9999-9999" placeholder="08xx-xxxx-xxxx"></InputMask>
                     <label htmlFor="company">masukkan nomor</label>
                  </FloatLabel>

                  <FloatLabel className="mt-10">
                     <InputNumber id="number-input" className="w-full" value={jumlahPulsa} onValueChange={(e) => setJumlahPulsa(e.value)}/>
                     <label htmlFor="number-input">Jumlah Pembayaran</label>
                  </FloatLabel>
 
                  <div className="flex justify-center md:justify-start mt-10">
                     <Button onClick={() => setVisible(true)} icon="pi pi-check" label="Tambahkan Data"
                        className=" !text-white py-2 w-full md:w-auto !justify-center flex !font-extrabold !bg-teal-700 rounded-sm cursor-pointer hover:!bg-teal-800 focus:!bg-teal-800"
                     />
                  </div>

                  <Toast ref={toast} />
                     <ConfirmDialog
                        group="declarative"
                        visible={visible}
                        onHide={() => setVisible(false)}
                        message="Apakah Anda yakin ingin menambahkan data transaksi pemabayaran ini?"
                        header="Konfirmasi"
                        icon="pi pi-exclamation-triangle"
                        accept={accept}
                        reject={reject}
                        style={{ width: '50vw' }}
                        breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
                     />
                  
               </div>
            </div>
         </section>

      </>
   )
}