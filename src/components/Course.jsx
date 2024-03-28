import React from 'react'
import { NavLink,Outlet,useLoaderData  } from "react-router-dom";
export default function Course(props) {
    // console.log(props.course)
    let {
        courseid,
        title,
        description,
    }=props.course;
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
    <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-56">
      <img
        src="https://images.unsplash.com/photo-1543013309-0d1f4edeb868?q=80&w=1991&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="card-image"
        className="object-cover w-full h-full"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
          {courseid}
        </h1>
        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
          {title}
        </p>
      </div>
      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
       {description}
      </p>
    </div>
    <div className="p-6 pt-0">
      <button
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        type="button"
      >
        <NavLink to={`${courseid}`}>continue learning</NavLink> 
      </button>
    </div>
  </div>
  )
}
