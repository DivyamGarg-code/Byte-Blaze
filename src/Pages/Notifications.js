// src/components/Notification.js

import React from 'react';

const NotificationEntry = ({ title, description, clubName, sid, branch, request_by, mobile, room_no, timeSlot, onAccept, onReject }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{`Club: ${clubName}`}</span>
        <span className="text-sm text-gray-500">{`Student ID: ${sid}`}</span>
        <span className="text-sm text-gray-500">{`Branch: ${branch}`}</span>
        <span className="text-sm text-gray-500">{`Requested By: ${request_by}`}</span>
        <span className="text-sm text-gray-500">{`Mobile: ${mobile}`}</span>
        <span className="text-sm text-gray-500">{`Room No: ${room_no}`}</span>
        <span className="text-sm text-gray-500">{`Time Slot: ${timeSlot}`}</span>
      </div>
      <div className="flex items-center">
        <button
          className="bg-green-500 text-white px-4 py-2 mr-2 rounded focus:outline-none"
          onClick={onAccept}
        >
          Accept
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none"
          onClick={onReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

const NotificationPage = () => {
  const notifications = [
    {
      id: 1,
      title: 'Notification 1',
      description: 'Description for Notification 1',
      clubName: 'Club A',
      sid: '12345',
      request_by: 'Divyam',
      mobile: '1234',
      branch: 'Computer Science',
      room_no: 'R-3',
      timeSlot: '10-11',
    },
    {
      id: 2,
      title: 'Notification 2',
      description: 'Description for Notification 2',
      clubName: 'Club B',
      sid: '67890',
      request_by: 'Divyam',
      mobile: '1234',
      branch: 'Electrical Engineering',
      room_no: 'R-2',
      timeSlot: '9-10',
    },
    {
      id: 3,
      title: 'Notification 3',
      description: 'Description for Notification 3',
      clubName: 'Club C',
      sid: '67890',
      request_by: 'Divyam',
      mobile: '1234',
      branch: 'Electrical Engineering',
      room_no: 'R-1',
      timeSlot: '9-10',
    },
  ];

  const handleAccept = (id) => {
    // Handle accept logic
    console.log(`Notification ${id} accepted`);
  };

  const handleReject = (id) => {
    // Handle reject logic
    console.log(`Notification ${id} rejected`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Notifications</h1>
      {notifications.map((notification) => (
        <NotificationEntry
          key={notification.id}
          {...notification}
          onAccept={() => handleAccept(notification.id)}
          onReject={() => handleReject(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationPage;
