import React from "react";
import { NavLink,Outlet,useLoaderData  } from "react-router-dom";
import axios from 'axios';
import Course from "../components/Course";

function Coursepage() {
  const courses = useLoaderData();
  console.log(courses);
  let key=1;
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 m-4">
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      {courses.map((course) => (
        <Course course={course} key={course.courseid}/>
      ))}
    </div>
    </div>
    
  );
}

export default Coursepage;

export const coursesloader = async () => {
  const res = await axios.get('http://localhost:3000/api/courses/all')
  // console.log(res.data);
  return res.data;
}
