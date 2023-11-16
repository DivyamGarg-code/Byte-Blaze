import React, { useState, useEffect } from 'react';
import { PermissionPopUp } from '../components/PopUp';

const dummyData = {
    "2023-01-01": {
        "R-1": {
            "9-10": {
                "state": "free",
                "occupant": "ACM"
            },
            "10-11": {
                "state": "free",
                "occupant": "ACM"
            },
            "11-12": {
                "state": "free",
                "occupant": "ACM"
            },
        },
        // "R-2": {
        //     "9-10": "booked",
        //     "10-11": "free",
        //     "11-12": "pending",
        // },
        // "R-3": {
        //     "9-10": "free",
        //     "10-11": "free",
        //     "11-12": "booked",
        // },
        // "R-4": {
        //     "9-10": "pending",
        //     "10-11": "booked",
        //     "11-12": "free",
        // },
    },
};


function TableComponent() {
    const [userInfo, setUserInfo] = useState({
        title: '',
        description: '',
        club: '',
        request_by: '',
        sid: '',
        mobile: '',
        room:'',
        time_slot:''
    });
    const handleSlotClick = (room, time_slot, status) => {
        if (status === "free") {
            userInfo.room=room;
            userInfo.time_slot=time_slot;
            console.log(room, time_slot, status);
            console.log("Open the Pop Up");
            togglePopUp();
        }
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
    const [popUpState, setPopUpState] = useState(false);
    const togglePopUp = () => {
        setPopUpState(!popUpState);
    }
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const data = await fetch("http://localhost:3000/getroomdat/roomd");
        const json = await data.json();
        console.log(json);
        // setTableData(json.resobj);
    }
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
                    {timeSlots.map((timeSlot) => (
                        <tr key={timeSlot} className="border">
                            <td className="border px-4 py-2">{timeSlot}</td>
                            {Object.keys(tableData).map((room) => (
                                <td key={`${room}-${timeSlot}`} className="border px-4 py-2">
                                    {/* {console.log(tableData[room][timeSlot])} */}
                                    {/* <button
                                        className={`${tableData[room][timeSlot] === 'booked' ? 'bg-red-500 cursor-not-allowed' : tableData[room][timeSlot] === 'pending' ? 'bg-yellow-500 cursor-not-allowed' : tableData[room][timeSlot] === 'free' ? 'bg-green-500' : 'bg-yellow-500 cursor-not-allowed'} 
                                         text-white font-bold py-2 px-4 rounded`}
                                        onClick={() => {
                                            handleSlotClick(room, timeSlot, tableData[room][timeSlot]);
                                        }}
                                    >
                                        {tableData[room] && tableData[room][timeSlot]
                                            ? tableData[room][timeSlot]
                                            : 'Free Slot'}
                                    </button> */}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {popUpState ? <PermissionPopUp togglePopUp={togglePopUp} userInfo={userInfo} setUserInfo={setUserInfo}/> : ""}
        </div>
    );
}

export default TableComponent;
