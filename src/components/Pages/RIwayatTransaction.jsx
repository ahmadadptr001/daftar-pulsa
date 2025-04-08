import React, {useState, useRef, useEffect} from "react";
import Sidebar from "../Layouts/Sidebar";
import { Message } from 'primereact/message';
import { Button } from "primereact/button";
import { BreadCrumb } from "primereact/breadcrumb";

import logo from "/public/phone.png";
import { ReadData } from "../Server/ReadData";

export default function RiwayatTransaction() {

   const items_breadcrumb = [
      { label: 'Dashboard', url: '/' },
      { label: 'Riwayat', url: "/data/transaction/riwayat" }]
      ;
   const items_breadcrumb_home = { icon: 'pi pi-home', url: '/' }


   // gap otomatis pada content riwayat
   const wrapperRef = useRef(null);
   const [isWrapped, setIsWrapped] = useState(false);

   useEffect(() => {
      const wrapper = wrapperRef.current;

      const checkWrap = () => {
         if (!wrapper) return;

         const childrenEls = wrapper.children;
         if (childrenEls.length < 2) return;

         const firstTop = childrenEls[0].offsetTop;
         for (let i = 1; i < childrenEls.length; i++) {
         if (childrenEls[i].offsetTop > firstTop) {
            setIsWrapped(true);
            return;
         }
         }
         setIsWrapped(false);
      };
      checkWrap();
      window.addEventListener("resize", checkWrap);
      return () => window.removeEventListener("resize", checkWrap);
   }, []);


   const [dataRiwayatTransaction, setDataRiwayatTransaction] = useState([])

   useEffect(() => {
      const dataRiwayat = async () => {
         const data = await ReadData("riwayat-transaction");
         
   
         setDataRiwayatTransaction(data);
      }
      dataRiwayat()
   }, [])

   const ContentRiwayat = ({status, username, company, jumlahTransaksi}) => (
      <div className="flex items-center w-full">
          <img alt="logo" src={logo} className="mix-blend-darken" width="32" />
          <div ref={wrapperRef} className={`flex flex-wrap ${isWrapped ? 'gap-0' : 'gap-2'} ml-3`}>
            <Button
               label={username}
               tooltip={company}
               className="!p-0 !m-0 !text-sm !bg-transparent focus:border-none focus:outline-none !border-none !outline-none !font-extrabold !text-blue-600"
               />
            <span><mark>[{status}]</mark> Rp.{jumlahTransaksi}</span>
            
          </div>
      </div>
  );
  

   return (
      <>
         <section className="flex flex-nowrap">

            <Sidebar />

            <div className="RiwayatTransaction w-full h-full">

               <div className="container mx-auto p-3 px-5 bg-[var(--secondary-color)]">
                  
                  <BreadCrumb model={items_breadcrumb} home={items_breadcrumb_home} className="!text-[.7rem]"/>

                  <h2 className="text-lg sm:text-xl font-extrabold mt-7">
                     Riwayat Transaksi
                  </h2>

                  <div className="flex justify-end">
                  <button
                     className="px-4 py-2 mb-2 mt-5 sm:mt-0 rounded-sm outline-1 text-[.8rem] outline-red-400 bg-red-400 hover:bg-red-500 focus:scale-105 text-white"
                     >
                        Hapus Riwayat <i className="pi pi-trash"></i> 
                     </button>
                  </div>

                  <div className="riwayat-wrapper mt-5">

                     {dataRiwayatTransaction.length === 0 ? (
                        <div className="card">
                           <Message
                              style={{border: 'solid #ccc', borderWidth: '0 0 0 6px'}}
                              className="border-primary justify-start w-full"
                              severity="info"
                              text="Belum ada riwayat transaksi yang tersedia."
                           />
                        </div>
                     ) : (
                        dataRiwayatTransaction
                           .filter((data) => data && data.status && data.username && data.company && data.jumlahTransaksi)
                           .map((data, index) => (
                              <div className="card mb-2" key={index}>
                                 <Message
                                    style={{border: 'solid #696cff', borderWidth: '0 0 0 6px', color: '#696cff'}}
                                    className="border-primary justify-start w-full !text-[.9rem]"
                                    severity="info"
                                    content={
                                       <ContentRiwayat
                                          status={data.status}
                                          username={data.username}
                                          company={data.company}
                                          jumlahTransaksi={data.jumlahTransaksi}
                                       />
                                    }
                                 />
                              </div>
                           ))
                     )}

                  
                     
                  </div>

               </div>

            </div>

         </section>
      </>
   )
}