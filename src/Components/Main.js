import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, editTask, setTasksFromStorage } from '../redux/slices/taskSlice';
import { RxUpdate } from "react-icons/rx";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Main() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.tasks.list);

  const initialValues = { id: 0, title: '', date: '', category: '', description: '' };
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(initialValues);
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(editTask(data));
    } else {
      dispatch(addTask(data));
    }
    toggleModal();
    resetForm();
  };

  const resetForm = () => {
    setData(initialValues);
    setIsEditMode(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    setData(task);
    setIsEditMode(true);
    setIsOpen(true);
  };

  // Load from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('taskList');
    if (storedTasks) {
      dispatch(setTasksFromStorage(JSON.parse(storedTasks)));
    }
  }, [dispatch]);

  // Save to localStorage whenever list changes
  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem('taskList', JSON.stringify(list));
    }
  }, [list]);

  return (
    <>
      <div className='container pr-8'>
        <div className='flex text-center justify-center items-center'>
          <div className='w-1/2 text-left'>
            <div className='font-bold text-2xl inline-flex'>
              Hello <img src='hello.gif' className='w-10' alt='hello' /> Dear
            </div>
          </div>
          <div className='w-1/2 text-right mr-8'>
            <button className='button1' onClick={toggleModal}>+ Add New Task</button>
          </div>
        </div>
        <div>
          <div className="font-[sans-serif] overflow-x-auto">
            <table className="min-w-full mt-6 bg-white table-auto">
              <thead className="bg-gray-800 whitespace-nowrap">
                <tr>
                  <th className="p-4 text-left text-sm font-medium text-white">Title</th>
                  <th className="p-4 text-left text-sm font-medium text-white">Category</th>
                  <th className="p-4 text-left text-sm font-medium text-white">Date</th>
                  <th className="p-4 text-left text-sm font-medium text-white">Description</th>
                  <th className="p-4 text-left text-sm font-medium text-white">Actions</th>
                </tr>
              </thead>

              <tbody className="whitespace-nowrap">
                {list.map((task) => (
                  <tr key={task.id} className="even:bg-blue-50">
                    <td className="p-4 text-sm text-black">{task.title}</td>
                    <td className="p-4 text-sm text-black">{task.category}</td>
                    <td className="p-4 text-sm text-black">{task.date}</td>
                    <td className="p-4 text-sm text-black">{task.description}</td>
                    <td className="p-4">
                      <button className="dlt_icon mr-3 hover:text-red-400"><FaEye /></button>
                      <button className="dlt_icon2 mr-3 hover:text-red-400" onClick={() => handleEdit(task)}><RxUpdate /></button>
                      <button className="dlt_icon3 hover:text-blue-600" onClick={() => handleDelete(task.id)}><MdDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
       {/* Modal */}
  <div>
      {isOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isEditMode ? 'Edit Task' : 'Create New Task'}
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4">
            <div className="grid gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Title</label>
                <input type="text" name="title" value={data.title} onChange={handleInputChange} className="w-full p-2 rounded-lg border"
                  placeholder="Type Task Title" required/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Date</label>
                <input type="text" name="date" value={data.date} onChange={handleInputChange} className="w-full p-2 rounded-lg border"
                  placeholder="day-month-year" required/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={data.category}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-lg border"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Walk">Walk</option>
                  <option value="Games">Games</option>
                  <option value="Office Work">Office Work</option>
                  <option value="House Work">House Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Task Description
                </label>
                <textarea name="description" value={data.description} onChange={handleInputChange} className="w-full p-2 rounded-lg border"
                  placeholder="Write task description here" rows="4"></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="w-full btn1 text-white py-2 rounded-lg"
            >
                {isEditMode ? 'Update Task' : 'Add Task'}
                </button>
          </form>
        </div>
      </div>
    )}
      </div>
    </>
  );
}
