import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from 'axios';
import Course from "../components/Course";

function Coursepage() {
  const courses = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const [newCourseData, setNewCourseData] = useState({
    course_id: '',
    course_tags: [],
    title: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourseData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
// console.log(newCourseData);
  const handleAddCourse = async () => {
    try {
      setIsLoading(true);
      // Make an Axios request to add a new course
      const response = await axios.post('http://localhost:8800/add/course', newCourseData);
      console.log(response.data); // Handle success response
      // Clear input fields after successful addition
      setNewCourseData({
        course_id: '',
        course_tags: [],
        title: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding course:', error); // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagsChange = (e) => {
    const { value } = e.target;
    // Split the input string by comma and trim any spaces
    const tagsArray = value.split(',').map(tag => tag.trim());
    setNewCourseData(prevData => ({
      ...prevData,
      course_tags: tagsArray
    }));
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 m-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Courses</h1>
      </div>
      <form onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                handleAddCourse();
              }}>
      <div className="flex mb-4">
        <input
          type="text"
          name="course_id"
          value={newCourseData.course_id}
          required
          onChange={handleInputChange}
          placeholder="Course ID"
          className="mr-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="title"
          value={newCourseData.title}
          required
          onChange={handleInputChange}
          placeholder="Course Title"
          className="mr-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="description"
          required
          value={newCourseData.description}
          onChange={handleInputChange}
          placeholder="Course Description"
          className="mr-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="course_tags"
          value={newCourseData.course_tags.join(', ')} // Join tags array with comma and space
          onChange={handleTagsChange}
          placeholder="Course Tags (comma-separated)"
          className="mr-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
         type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Course'}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {courses.map((course) => (
          <Course course={course} key={course.courseid}/>
        ))}
      </div>
      </form>
    </div>
  );
}

export default Coursepage;

export const coursesloader = async () => {
  const res = await axios.get('http://localhost:8800/fetch/courses/all');
  return res.data;
}
