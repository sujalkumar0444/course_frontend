import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useParams,useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {setCourseData} from '../redux/slices/couresContentSlice'


export default function CourseContentPage() {
  const { courseId } = useParams();
  const dispatch = useDispatch()
  
  const course_data = useLoaderData();
  console.log("hehe",course_data);
  dispatch(setCourseData(course_data));
  return (
    <Sidebar/>
  )
}


export const coursecontentloader = async ({params}) => {
  let {courseId}=params;
  let modulesdata=await axios.get(`http://localhost:8800/fetch/courses/${courseId}`);
  
  return modulesdata.data;
};