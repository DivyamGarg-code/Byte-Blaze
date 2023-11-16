import React, { useState, useEffect } from 'react';
import { PermissionPopUp } from '../components/PopUp';



function TableComponent() {
    const [userInfo, setUserInfo] = useState({
        title: "",
        description: "",
        club: "",
        request_by: "",
        sid: "",
        mobile: "",
        room:"",
        time_slot:""
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

    // const getFormattedDate = (date) => {
    //     const day = date.getDate().toString().padStart(2, '0');
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //     const year = date.getFullYear().toString();
    //     return `${day}-${month}-${year}`;
    // };

    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
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
        // console.log(json);
        setTableData(json.resobj);
       
        // console.log(Object.keys(json.resobj));
        // for(let key in json.resobj){
        //     console.log(json.resobj[key]);
        //     setTableData(json.resobj[key]);
        //     break;
        // }
    }
    useEffect(() => {
        // Fetch or use the dummyData here
        console.log(tableData);
        console.log(Object.keys(tableData)); // Dates
        setDates(Object.keys(tableData));
         for (let date in tableData) {
            console.log(`Date: ${date}`);
            setSelectedDate(date);
            for (let room in tableData[date]) {
                setTimeSlots(Object.keys(tableData[date][room]));
                break;
            }
            break;
        }

    }, [tableData]);

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
                                    {console.log(tableData[room][timeSlot].state)}
                                    {/* <button
                                        className={`${tableData[room][timeSlot].state === 'booked' ? 'bg-red-500 cursor-not-allowed' : tableData[room][timeSlot].state === 'pending' ? 'bg-yellow-500 cursor-not-allowed' : tableData[room][timeSlot].state === 'free' ? 'bg-green-500' : 'bg-yellow-500 cursor-not-allowed'} 
                                         text-white font-bold py-2 px-4 rounded`}
                                        onClick={() => {
                                            handleSlotClick(room, timeSlot, tableData[room][timeSlot].state);
                                        }}
                                    >
                                        {tableData[room][timeSlot].state}
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
