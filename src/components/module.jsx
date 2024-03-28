import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import { useState } from "react";
import CourseContentForm from "./CourseContentForm";
import ProblemContentPage from "./problemContentPage";


function Modules() {
  let [isdropdown,setIsdropdown] = useState(false);
  let [islessoncontent,setislessoncontnent ] = useState(false);
  let [isProblemContent,setisProblemContent] = useState(false);
  let [isAssissmentContent,setisAssissmentContent] = useState(false);
  function handleDropdown(){
    setIsdropdown(!isdropdown);
  }
  let modulename = useParams().coursename;
  // modulename = modulename.replace(/ /g, "_");
  let {modules:modulesdata} = useSelector((state) => state.coursecontent.courseContent);
  modulesdata = modulesdata.filter((ele)=>ele.module_title === modulename);
  modulesdata=modulesdata[0].lessons;
  console.log("----modulesdata",modulesdata); 
  // /console.log("modulename "+modulename);
  return (
  <>

    <div>
        {
          modulesdata.map((ele)=>{
            console.log("----ele",ele);
            return (
              <div key={ele._id} className="hover:scale-105 hover:elevation-0 transition-transform
              flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-88 m-2">
          <div className="p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 mb-4 text-gray-900"
            >
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clipRule="evenodd"
              ></path>
              <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z"></path>
            </svg>
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
               {ele.lesson_title}  
            </h5>
          </div>
          <div className="p-6 pt-0">
            <a href="#" className="inline-block">
              <button
                className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                type="button"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                type="button"
              >
                Edit 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </button>
            </a>
          </div>
            </div>
            )
            
          })
        }   
         
    </div>
    <div className="m-4">
    <div  onClick={handleDropdown} className="inline-flex items-center overflow-hidden rounded-md border bg-blue-100">
      <a
        href="#"
        className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
      >
        Edit
      </a>
  
      <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
        <span className="sr-only">Menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  
    {(isdropdown)?
        <div
        className="absolute z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
        role="menu"
    >
      <div className="p-2">
        <button
          onClick={()=>{setislessoncontnent(true);setisAssissmentContent(false);setIsdropdown(false);setisProblemContent(false)}}
          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          role="menuitem"
          
        >
          Add Lesson Content
        </button>
  
        <button
          onClick={()=>{setisProblemContent(true);setisAssissmentContent(false);setislessoncontnent(false);setIsdropdown(false);}}
          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          role="menuitem"
        >
          Add problem
        </button>
  
        <button
          onClick={()=>{setisAssissmentContent(true);setisProblemContent(false);setislessoncontnent(false);setIsdropdown(false);}}
          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          role="menuitem"
        >
          Add Assissment
        </button>
  
  
      </div>
    </div>
    :null
    }
    
    {
      (islessoncontent)?<>
      <section class={"rounded-3xl shadow-2xl transition-all duration-300 ease-in-out"+`absolute   top-24  ${islessoncontent ? 'absolute' : 'hidden'}`}>
        <button onClick={()=>{setislessoncontnent(false);}}>close</button>
        <CourseContentForm></CourseContentForm>
        </section>
      </>
      :null
    }

  {
      (isProblemContent)?<>
      <section class={"rounded-3xl shadow-2xl transition-all duration-300 ease-in-out"+`absolute   top-24  ${isProblemContent ? 'absolute' : 'hidden'}`}>
        <button onClick={()=>{setisProblemContent(false);}}>close</button>
        <ProblemContentPage></ProblemContentPage>
        </section>
      </>
      :null
    }

  {
      (isAssissmentContent)?<>
      <section class={"rounded-3xl shadow-2xl transition-all duration-300 ease-in-out"+`absolute   top-24  ${isAssissmentContent ? 'absolute' : 'hidden'}`}>
        <button onClick={()=>{setisAssissmentContent(false);}}>close</button>
        <ProblemContentPage></ProblemContentPage>
        </section>
      </>
      :null
    }

  </div>
  </>
    
  );
}

export default Modules;
