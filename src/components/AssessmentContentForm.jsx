import React, { useState, useRef } from 'react';
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser";
import axios from 'axios';

export default function ProblemContentPage({ moduleId }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [problemPoints, setProblemPoints] = useState(0);
  const [lessonId, setLessonId] = useState(""); // Initialize with an empty string
  const [assessmentId, setAssessmentId] = useState(""); // Initialize with an empty string
  const [assessmentName, setAssessmentName] = useState("");
  const [assessmentTime, setAssessmentTime] = useState(0);
  const [sampleTestCases, setSampleTestCases] = useState([{ input: '', output: '' }]);
  const [hiddenTestCases, setHiddenTestCases] = useState([{ input: '', output: '' }]);
  const [addingToAssignment, setAddingToAssignment] = useState(false);


  const handleAssignment=()=>{
    setAddingToAssignment(false);
    setLessonTitle('');
    setAssessmentName('');
    setAssessmentId('');
    setLessonId('');

  }
  const handleAddSampleTestCase = () => {
    setSampleTestCases([...sampleTestCases, { input: '', output: '' }]);
  };

  const handleRemoveSampleTestCase = (index) => {
    const updatedTestCases = [...sampleTestCases];
    updatedTestCases.splice(index, 1);
    setSampleTestCases(updatedTestCases);
  };

  const handleAddHiddenTestCase = () => {
    setHiddenTestCases([...hiddenTestCases, { input: '', output: '' }]);
  };

  const handleRemoveHiddenTestCase = (index) => {
    const updatedTestCases = [...hiddenTestCases];
    updatedTestCases.splice(index, 1);
    setHiddenTestCases(updatedTestCases);
  };

  const handleCreateContent = async () => {
    // console.log(assessmentId);
    try {
      let responseData;
      if (assessmentId !== '') {
        responseData = await axios.post('http://localhost:8800/add/assessment', {
          module_id: moduleId,
          assessment_id: assessmentId,
          lesson_id: lessonId,
          problem_title: problemTitle,
          problem_description: content,
          sample_test_cases: sampleTestCases,
          hidden_test_cases: hiddenTestCases,
          problem_points:  parseInt(problemPoints)
        });
       
      } else {
        responseData = await axios.post('http://localhost:8800/add/assessment', {
          module_id: moduleId,
          lesson_title: lessonTitle,
          assignment_name: assessmentName,
          total_time: assessmentTime,
          problem_title: problemTitle,
          problem_description: content,
          sample_test_cases: sampleTestCases,
          hidden_test_cases: hiddenTestCases,
          problem_points:  parseInt(problemPoints)
        });
        setAssessmentId(responseData.data.assessment_id);
        // console.log(responseData.data.assessment_id);
        setLessonId(responseData.data.lesson_id);
        
       
      }
      setAddingToAssignment(true);
      // Reset fields except assignment name and time when adding to the same assignment
     
    //   if (addingToAssignment) {
        setProblemTitle("");
        setContent("");
        setProblemPoints("");
        setSampleTestCases([{ input: '', output: '' }]);
        setHiddenTestCases([{ input: '', output: '' }]);
        console.log("something");
        // setAddingToAssignment(false);
    //   }
      //   console.log(responseData.data);
      // Handle success response
    } catch (error) {
      console.error('Error creating problem:', error);
      // Handle error
    }
  };


  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <div>{HTMLReactParser(content)}</div>
            
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Create Lesson Content
              </h1>
              <form onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                handleCreateContent();
              }}>
              <div className="mt-8 grid grid-cols-6 gap-6">

              {addingToAssignment ? null : (
                  <>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="lesson_title" className="block text-sm font-medium text-gray-700">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    id="lesson_title"
                    name="lesson_title"
                    required
                    className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    
                  />
                </div>

                
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="assessment_name" className="block text-sm font-medium text-gray-700">
                        Assessment Title
                      </label>
                      <input
                        type="text"
                        id="assessment_name"
                        name="assessment_name"
                        required
                        className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                        value={assessmentName}
                        onChange={(e) => setAssessmentName(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="assessment_time" className="block text-sm font-medium text-gray-700">
                        Assessment Time
                      </label>
                      <input
                        type="text"
                        id="assessment_time"
                        name="assessment_time"
                        required
                        className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                        value={assessmentTime}
                        onChange={(e) => setAssessmentTime(e.target.value)}
                        
                      />
                    </div>
                  </>
                )}

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="problem_title" className="block text-sm font-medium text-gray-700">
                    Problem Title
                  </label>
                  <input
                    type="text"
                    id="problem_title"
                    name="problem_title"
                    required
                    className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                    value={problemTitle}
                    onChange={(e) => setProblemTitle(e.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="problem_title" className="block text-sm font-medium text-gray-700">
                    Problem Points
                  </label>
                  <input
                    type="number"
                    id="problem_points"
                    name="problem_points"
                    required
                    className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                    value={problemPoints}
                    onChange={(e) => setProblemPoints(e.target.value)}
                  />
                </div>

                <div className="col-span-6">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => setContent(newContent)}
                    className=''
                  />
                </div>

                <div className="col-span-6">
                  <h2 className="text-lg font-semibold mb-2">Sample Test Cases</h2>
                  <div className="space-y-4">
                    {sampleTestCases.map((testCase, index) => (
                      <div key={index} className="flex flex-col">
                        <div className="flex space-x-4">
                          <div className="w-1/2">
                            <label htmlFor={`sample_input_${index}`} className="block text-sm font-medium text-gray-700">
                              Input:
                            </label>
                            <input
                              type="text"
                              id={`sample_input_${index}`}
                              name={`sample_input_${index}`}
                              required
                              value={testCase.input}
                              onChange={(e) => {
                                const updatedTestCases = [...sampleTestCases];
                                updatedTestCases[index].input = e.target.value;
                                setSampleTestCases(updatedTestCases);
                              }}
                              className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                            />
                          </div>
                          <div className="w-1/2">
                            <label htmlFor={`sample_output_${index}`} className="block text-sm font-medium text-gray-700">
                              Output:
                            </label>
                            <input
                              type="text"
                              id={`sample_output_${index}`}
                              name={`sample_output_${index}`}
                              required
                              value={testCase.output}
                              onChange={(e) => {
                                const updatedTestCases = [...sampleTestCases];
                                updatedTestCases[index].output = e.target.value;
                                setSampleTestCases(updatedTestCases);
                              }}
                              className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveSampleTestCase(index)}
                          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddSampleTestCase}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="col-span-6">
                  <h2 className="text-lg font-semibold mb-2">Hidden Test Cases</h2>
                  <div className="space-y-4">
                    {hiddenTestCases.map((testCase, index) => (
                      <div key={index} className="flex flex-col">
                        <div className="flex space-x-4">
                          <div className="w-1/2">
                            <label htmlFor={`hidden_input_${index}`} className="block text-sm font-medium text-gray-700">
                              Input:
                            </label>
                            <input
                              type="text"
                              id={`hidden_input_${index}`}
                              name={`hidden_input_${index}`}
                              value={testCase.input}
                              onChange={(e) => {
                                const updatedTestCases = [...hiddenTestCases];
                                updatedTestCases[index].input = e.target.value;
                                setHiddenTestCases(updatedTestCases);
                              }}
                              className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                            />
                          </div>
                          <div className="w-1/2">
                            <label htmlFor={`hidden_output_${index}`} className="block text-sm font-medium text-gray-700">
                              Output:
                            </label>
                            <input
                              type="text"
                              id={`hidden_output_${index}`}
                              name={`hidden_output_${index}`}
                              value={testCase.output}
                              onChange={(e) => {
                                const updatedTestCases = [...hiddenTestCases];
                                updatedTestCases[index].output = e.target.value;
                                setHiddenTestCases(updatedTestCases);
                              }}
                              className="mt-1 w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveHiddenTestCase(index)}
                          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddHiddenTestCase}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className={`inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 `}
                    // disabled={addingToAssignment}
                  >
                    {addingToAssignment ? "Add Another problem to same assignment" : "Create Problem"}
                  </button>
                </div>
                {
      (addingToAssignment)?<>
      
      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                  onClick={handleAssignment}
                    className={`inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 `}
                    // disabled={addingToAssignment}
                  >
                   No
                  </button>
                </div> 
      </>
      :null
    }
              </div>
              </form>
            </div>
            
          </main>
        </div>
      </section>
    </div>
  );
}
