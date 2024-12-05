import React from 'react';
import 'react-calendar/dist/Calendar.css';
import { MdOutlineUpcoming } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { MdIncompleteCircle } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";


export default function SideBar() {
return (
    <>
{/* Side Bar */}
  <div className=''>
    <nav className="bg-white shadow-lg h-screen top-0 left-0 min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto">
    <div>
    <ul className="mt-3">
      <li>
        <a href="/" className="text-black hover:text-red-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
          <MdOutlineDashboard   className="w-[18px] h-[18px] mr-4"/>
          <span>Dashboard</span>
        </a>
      </li>
      <li>
        <a href="/" className="text-black hover:text-red-600 text-sm flex items-center mt-3 hover:bg-blue-50 rounded px-4 py-3 transition-all">
          <FaTasks className="w-[18px] h-[18px] mr-4"/>
          <span>Tasks</span>
        </a>
      </li>
      <li>
        <a href="/" className="text-black hover:text-red-600 text-sm flex items-center mt-3 hover:bg-blue-50 rounded px-4 py-3 transition-all">
          <BiCategory className="w-[18px] h-[18px] mr-4"/>
          <span>Task Categories</span>
        </a>
      </li>
      <li>
        <a href="/" className="text-black hover:text-red-600 text-sm flex items-center mt-3 hover:bg-blue-50 rounded px-4 py-3 transition-all">
          <MdOutlineUpcoming  className="w-[18px] h-[18px] mr-4"/>
          <span>Upcoming Tasks</span>
        </a>
      </li>
      <li>
        <a href="/" className="text-black hover:text-red-600 text-sm flex items-center mt-3 hover:bg-blue-50 rounded px-4 py-3 transition-all">
          <MdIncompleteCircle    className="w-[18px] h-[18px] mr-4"/>
          <span>Incomplete Tasks</span>
        </a>
      </li>
      <li>
        <a href="/" className="text-black hover:text-red-600 text-sm flex items-center mt-3 hover:bg-blue-50 rounded px-4 py-3 transition-all">
          <FaCheckCircle   className="w-[18px] h-[18px] mr-4"/>
          <span>Completed Tasks</span>
        </a>
      </li>
    </ul>
    </div>
    </nav>
  </div>
  </>
  );
}
