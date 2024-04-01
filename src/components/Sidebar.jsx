import React, { useState } from "react"; 
import SidebarButton from "./SidebarButton";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Outlet } from "react-router-dom";

function Sidebar(params) {
  const { modules } = useSelector((state) => state.coursecontent.courseContent);
  const {courseid } =  useSelector((state) => state.coursecontent.courseContent);
  console.log("coures sidebar page data", modules);
  let [isModuleContent, setisModuleContent] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');
  const dispatch = useDispatch();
  // console.log(courseid);
  const   handleCloseModule = async () => {
    setisModuleContent(false);
    setNewModuleName('');
  }
  const   handleAddModule = async () => {
  
    // Clear input field
    try {
      const response = await axios.post("http://localhost:8800/add/module", {
        module_title: newModuleName ,
        course_id : courseid
     
      });
      console.log("Module created successfully:", response.data);
      // const new_module_id = response.data.module_id;
      // modules.push(new_module_id);
      // const new_course_data = {
      //   courseid,
      //   modules

      // }
      // dispatch(setCourseData(new_course_data));
   
    } catch (error) {
      console.error("Error creating module:", error);
    }
    setNewModuleName('');
    setisModuleContent(false);
  };

  return (
    <div className="grid grid-cols-4 lg:grid-cols-4 lg:gap-8">
      <div className="lg:col-span-1 rounded-lg bg-gray-200">
        <aside className="flex flex-col fixed top-0 w-1/4 h-full px-5 py-16 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
          <div className="flex flex-col justify-between flex-1 mt-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                  Modules
                </h2>
                <button onClick={() => { setisModuleContent(true); }} className="p-0.5 hover:bg-gray-100 duration-200 transition-colors text-gray-500 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 border rounded-lg">
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
                {modules.map((ele) => (
                  <SidebarButton
                    moduledata={ele}
                    key={ele._id}
                  />
                ))}
              </nav>
            </div>
            {isModuleContent && (
              <div className="mt-4">
              <form onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                handleAddModule();
              }}>
                <input
                  type="text"
                  value={newModuleName}
                  required
                  onChange={(e) => setNewModuleName(e.target.value)}
                  placeholder="Enter new module name"
                  className="w-full p-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add
                </button>
                <button
                  onClick={handleCloseModule}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Close
                </button>
                </form>
              </div>
            )}
          </div>
        </aside>
      </div>

      <div className="h-32 rounded-lg col-span-3 m-4">
        <Outlet/>
      </div>
    </div>
  );
}

export default Sidebar;
