import React, { useState, useEffect } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from 'react-calendar';
import { IoIosNotifications } from "react-icons/io";

export default function Header() {
    
    const [currentDate, setCurrentDate] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(now.toLocaleDateString(undefined, options));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Close calendar after selecting a date
  };

  return (
    <div>
          {/* Header */}
    <div className="flex lg:flex-row items-center h-24 w-full bg-gray-500 bsb sm:flex-col sm:h-auto">
      <div className="w-1/4 lg:flex lg:w-1/4 p-4 sm:flex-none sm:w-full">
        <img src='logo2.png' alt='logo' className='w-72 sm:w-28' />
      </div>
      <div className="w-1/2 sm:flex-none sm:w-full">
        <input
          type="email"
          placeholder="Search your task here..."
          className="w-full outline-1 bg-transparent text-white text-md border-gray-200 rounded input-placeholder"
        />
      </div>
      <div className="w-1/4  sm:flex-none sm:w-full">
        <div className='flex text-center justify-center items-center'>
          <div className="w-1/3">
            <button><IoIosNotifications className="icons" /></button>
            <button className="ml-2" onClick={toggleCalendar}>
              <FaCalendarAlt className="icons" />
            </button>
            {showCalendar && (
              <div className="relative bg-white p-2 rounded shadow-md mt-2">
                <Calendar onChange={handleDateChange} value={selectedDate} />
              </div>
            )}
          </div>
          <div className="w-2/3">
            <div className="text-md font-bold text-white">{currentDate}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
