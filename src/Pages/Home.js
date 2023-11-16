import React, { useState, useEffect } from 'react';

const dummyData = {
    "2023-01-01": {
        // "R-1": {
        //     "9-10": {
        //         "state": "free",
        //         "occupant": "ACM"
        //     },
        //     "10-11": {
        //         "state": "free",
        //         "occupant": "ACM"
        //     },
        //     "11-12": {
        //         "state": "free",
        //         "occupant": "ACM"
        //     },
        // },
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


function TableComponent() {
    const handleSlotClick = (room, timeSlot, status) => {
        console.log(room, timeSlot, status);
    };

    const getFormattedDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    };

    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(getFormattedDate(new Date()));
    const [tableData, setTableData] = useState({});
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        // Fetch or use the dummyData here


        const currentDate = new Date();
        const nextFourDates = Array.from({ length: 4 }, (_, index) => {
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + index);
            return getFormattedDate(newDate);
        });

        const selectedData = dummyData["2023-01-01"] || {};
        setTableData(selectedData);

        // Extract unique time slots from the available data
        // for (let date in dummyData) {
        //     // console.log(`Date: ${date}`);
        // }
        for (let room in selectedData) {
            setTimeSlots(Object.keys(selectedData[room]));
            break;
        }
        setDates(nextFourDates);
    }, [selectedDate]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div className="container px-4 mt-8">
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
                        {Object.keys(tableData).map((room) => (
                            <th key={room} className="border px-4 py-2">
                                {room}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {console.log(tableData)}
                    {timeSlots.map((timeSlot) => (
                        <tr key={timeSlot} className="border">
                            <td className="border px-4 py-2">{timeSlot}</td>
                            {Object.keys(tableData).map((room) => (
                                <td key={`${room}-${timeSlot}`} className="border px-4 py-2">
                                    <button
                                        className={`font-bold py-2 px-4 rounded bg-blue-300`}
                                        onClick={() => {
                                            handleSlotClick(room, timeSlot, tableData[room][timeSlot]);
                                        }}
                                    >
                                        {tableData[room] && tableData[room][timeSlot]
                                            ? tableData[room][timeSlot]
                                            : 'Free Slot'}
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
