import React, { useState, useEffect } from 'react';

const rooms = ["R-1", "R-2", "R-3", "R-4", "R-5"];
const timeSlots = ["9-10", "10-11", "11-12"];

function TableComponent() {
  const handleSlotClick = (room, timeSlot) => {
    console.log(room, timeSlot);
  };

  const getFormattedDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getFormattedDate(new Date()));

  useEffect(() => {
    const currentDate = new Date();
    const nextFourDates = Array.from({ length: 4 }, (_, index) => {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + index);
      return getFormattedDate(newDate);
    });
    setDates(nextFourDates);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="container px-4 mt-8 ">
      <h2 className="text-2xl font-bold mb-4">Room Reservation Table</h2>
      <label>
        Date:
        <select name="date" value={selectedDate} onChange={handleDateChange} className="m-2 border">
          {dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </label>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2"></th>
            {rooms.map((room) => (
              <th key={room} className="border px-4 py-2">
                {room}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot) => (
            <tr key={timeSlot} className="border">
              <td className="border px-4 py-2">{timeSlot}</td>
              {rooms.map((room) => (
                <td key={`${room}-${timeSlot}`} className="border px-4 py-2">
                    {/* For Free Slot */}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      handleSlotClick(room, timeSlot);
                    }}
                  >
                    Free Slot
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;


const dummyData = {
    "2023-01-01": {
      "R-1": {
        "9-10": "free",
        "10-11": "pending",
        "11-12": "booked",
      },
      "R-2": {
        "9-10": "booked",
        "10-11": "free",
        "11-12": "pending",
      },
      "R-3": {
        "9-10": "free",
        "10-11": "free",
        "11-12": "booked",
      },
      "R-4": {
        "9-10": "pending",
        "10-11": "booked",
        "11-12": "free",
      },
    },
  };