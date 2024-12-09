import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, editTask, setTasksFromStorage } from '../redux/slices/taskSlice';
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";

export default function Main({ searchQuery }) {
const dispatch = useDispatch();
const list = useSelector((state) => state.tasks.list);
const initialValues = { id: 0, title: '', date: '', category: '', description: '', status: false };
const [isOpen, setIsOpen] = useState(false);
const [data, setData] = useState(initialValues);
const [isEditMode, setIsEditMode] = useState(false);

const toggleModal = () => setIsOpen(!isOpen);

const handleInputChange = (e) => {
    const { name, value } = e.target; 
    const isCheckbox = e.target.type === 'checkbox'; 
    setData((prev) => ({ ...prev, [name]: isCheckbox ? e.target.checked : value }));
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

    useEffect(() => {
        const storedTasks = localStorage.getItem('taskList');
        if (storedTasks) {
            dispatch(setTasksFromStorage(JSON.parse(storedTasks)));
        }
    }, [dispatch]);

    useEffect(() => {
        if (list.length > 0) {
            localStorage.setItem('taskList', JSON.stringify(list));
        }
    }, [list]);

    const filteredList = list.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.status ? 'Completed' : 'Incomplete' ).toLowerCase().includes(searchQuery.toLowerCase())
      );
const printt = () => {
  window.print()
}
    return (
<>
<div className="container pr-8">
<div className="flex text-center justify-center items-center">
    <div className="w-1/2 text-left">
        <div className="font-bold text-2xl inline-flex">Hello <img src="hello.gif" className="w-10" alt="hello" /> Dear</div>
    </div>
    <div className="w-1/2 text-right mr-8">
        <button className="button1" onClick={toggleModal}>+ Add New Task</button>
    </div>
</div>
<div>
<div className="font-[sans-serif]">
  <div className='overflow-x-auto'>
  <table className="min-w-full mt-6 bg-white table-auto">
    <thead className="bg-gray-800 whitespace-nowrap">
      <tr className="text-center text-white font-medium p-4 text-sm">
        <th className='p-4'>Title</th>
        <th className='p-4'>Category</th>
        <th className='p-4'>Date</th>
        <th className='p-4'>Description</th>
        <th className='p-4'>Status</th>
        <th className='p-4'>Actions</th>
      </tr>
    </thead>
    <tbody className="whitespace-nowrap">
      {filteredList.map((task) => (
      <tr key={task.id} className="even:bg-blue-50 text-center  text-sm text-black">
        <td className="p-4">{task.title}</td>
        <td className="p-4">{task.category}</td>
        <td className="p-4">{task.date}</td>
        <td className="p-4">{task.description}</td>
        <td className="p-4">{task.status ? 'Completed ✅' : 'Incomplete ❌'}</td>
        <td className="p-4">
        <button className="dlt_icon2 mr-3 hover:text-green-400" onClick={() => handleEdit(task)}><RxUpdate /></button>
        <button className="dlt_icon3 hover:text-red-600" onClick={() => handleDelete(task.id)}><MdDelete /></button>
        </td>
      </tr>
    ))}
    </tbody>
  </table>
  </div>
</div>
<div className='mt-5 flex justify-center'>
<button type="button" onClick={printt} className="button2">Print Todo Tasks</button>
</div>
</div>
</div>

  {/* Modal */}
<div>
    {isOpen && (
<div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
  <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
     <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{isEditMode ? 'Edit Task' : 'Create New Task'}</h3>
      <button onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <select name="category" value={data.category} onChange={handleInputChange} className="w-full p-2 rounded-lg border">
          <option value="" disabled>Select category</option>
          <option value="Walk">Walk</option>
          <option value="Games">Games</option>
          <option value="Office Work">Office Work</option>
          <option value="House Work">House Work</option>
          <option value="Other">Other</option>
          </select>
          </div>
          <div>
          <label className="block mb-2 text-sm font-medium">Task Description</label>
          <textarea name="description" value={data.description} onChange={handleInputChange} className="w-full p-2 rounded-lg border"
          placeholder="Write task description here" rows="4"></textarea>
          </div>
          <label class="relative cursor-pointer">Task Status:
          <input type="checkbox" className="sr-only peer" id="taskStatusSwitch"    name="status" checked={data.status} onChange={handleInputChange}/>
            <div class="w-[170px] h-7 flex items-center bg-gray-300 rounded-full text-[9px] peer-checked:text-[#007bff] text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer after:content-['Incomplete'] peer-checked:after:content-['Completed'] peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-20 after:transition-all peer-checked:bg-[#007bff]">
            </div>
          </label>
          </div>
          <button type="submit" className="w-full btn1 text-white py-2 rounded-lg">
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
