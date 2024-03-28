import React from "react";
import SidebarButton from "./SidebarButton";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink,Outlet } from "react-router-dom";

function Sidebar(params) {
  const {modules} = useSelector((state) => state.coursecontent.courseContent);
  console.log("coures sidebar page data",modules);
  const dispatch = useDispatch()
  return (
    <div className=" grid grid-cols-4  lg:grid-cols-4 lg:gap-8">
      <div className=" lg:col-span-1 rounded-lg bg-gray-200">
      <aside className=" flex flex-col fixed top-0  w-1/4 h-full px-5 py-16 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <div className="flex flex-col justify-between flex-1 mt-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                Modules
              </h2>
              <button className="p-0.5 hover:bg-gray-100 duration-200 transition-colors text-gray-500 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 border rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
            <nav className="mt-4 -mx-3 space-y-3 ">



              {/* side buttons */}

              {
                modules.map((ele)=>{
                  return(<SidebarButton
                    moduledata={ele}
                    key={ele._id}
                  />)
                })
              }
              
            </nav>
          </div>
        </div>
      </aside>
      </div>
   
      <div className="h-32 rounded-lg  col-span-3 m-4">
        <Outlet/>
      </div>
    </div>  
  );
}

export default Sidebar;


