import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

import RootLayout from './layouts/RootLayout'
import CoursePage, { coursesloader } from './pages/CoursePage'
import CourseContentPage from './pages/Coursecontentpage'
import Modules from './components/module'
import Hero from './components/hero'
import { coursecontentloader } from './pages/Coursecontentpage'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Hero/>}></Route>
      <Route path="Courses" 
      element={<CoursePage />} 
      loader={coursesloader}
      >
      </Route>
      <Route path="Courses/:courseId" 
      element={<CourseContentPage/>}
      loader={coursecontentloader}
      >
        <Route path=":coursename" element={<Modules />} ></Route>
      </Route>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App