import React, {useState, useEffect} from 'react';
import '../styling/Notifications.css';


const NotificationItem = ({message, onAccept, onReject}) =>{
    return(
        <div className='notification-container'>
        <div className='notification-item'>
            <p>{message}</p>
            <button className='button' onClick={() => onAccept()}>Accept</button>
            <button className='button' onClick={() => onReject()}>Reject</button>
        </div>
        </div>
    );
};

export default NotificationItem;