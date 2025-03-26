import Sidebar from "../Layouts/Sidebar";
import dollar from "/public/dollar.png";

export default function Dashboard() {
   return (
      <div className="warapper">
         <div className="flex gap-3 flex-nowrap">
            {/* sidebar */}
            <Sidebar />

            {/* dashboard */}
            <div className="dashboard p-3">
               <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="rounded-md py-4 px-6 bg-[var(--secondary-color)]">
                     
                     <div className="flex justify-between">
                        <span className="label font-extrabold"> Laba </span>
                        <div className="icon">
                           <i className="pi pi-pencil"></i>
                        </div>
                     </div>
 
                     <div className="flex flex-col items-center gap-3">
                        <img src={dollar} alt="dollar image" className="w-[120px]"/>
                        <h1 className="font-extrabold text-[2rem]">20 Rb</h1>
                     </div>

                  </div>
                  
               </div>
            </div>
         </div>
      </div>
   );
}
