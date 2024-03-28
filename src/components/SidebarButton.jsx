import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SidebarButton(props) {
  const {moduledata} = props;
  // console.log("isActive:",isActive);
  // console.log("moduledata:",moduledata);
  const {
    module_title,
    module_total_score,
  }=moduledata;
  return (
    <NavLink
     to={`${module_title}`}
    >
    <button className={"flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"} >
       
       <div className="flex items-center gap-x-2 ">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 strokeWidth="1.5"
                 stroke="currentColor"
                 className="w-5 h-5"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                 />
               </svg>
               <span>{module_title}</span>
               <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.3 text-sm text-purple-700">
                 {module_total_score}
                </span>
             </div>
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="1.5"
               stroke="currentColor"
               className="w-4 h-4 rtl:rotate-180"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M8.25 4.5l7.5 7.5-7.5 7.5"
               />
             </svg>
             
   </button>
    </NavLink>
    
  )
}
