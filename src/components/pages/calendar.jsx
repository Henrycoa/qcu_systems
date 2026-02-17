import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, date: new Date(2024, 11, 25), title: 'Team Meeting', color: 'bg-blue-500' },
    { id: 2, date: new Date(2024, 11, 28), title: 'Product Launch', color: 'bg-purple-500' },
    { id: 3, date: new Date(2024, 11, 30), title: 'Client Review', color: 'bg-orange-500' },
  ]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    return day === selectedDate.getDate() &&
           currentDate.getMonth() === selectedDate.getMonth() &&
           currentDate.getFullYear() === selectedDate.getFullYear();
  };

  const getEventsForDate = (day) => {
    return events.filter(event => {
      return event.date.getDate() === day &&
             event.date.getMonth() === currentDate.getMonth() &&
             event.date.getFullYear() === currentDate.getFullYear();
    });
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      
      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`p-2 min-h-20 border border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${
            isSelected(day) ? 'bg-indigo-50 border-indigo-300' : ''
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday(day) 
              ? 'w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center' 
              : isSelected(day) 
              ? 'text-indigo-600' 
              : 'text-gray-700'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className={`text-xs px-1 py-0.5 rounded ${event.color} text-white truncate`}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = events.filter(event => 
    event.date.getDate() === selectedDate.getDate() &&
    event.date.getMonth() === selectedDate.getMonth() &&
    event.date.getFullYear() === selectedDate.getFullYear()
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your schedule and events
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={18} />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 bg-gray-50">
              {dayNames.map(day => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-700">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 bg-white">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-2">
                {selectedDateEvents.map(event => (
                  <div
                    key={event.id}
                    className="bg-white p-3 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${event.color}`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-500 mt-1">All day</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No events scheduled</p>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Upcoming Events</h3>
            <div className="space-y-2">
              {events.slice(0, 3).map(event => (
                <div
                  key={event.id}
                  className="bg-white p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${event.color}`}></div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {event.date.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}