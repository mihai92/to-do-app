import React, {useState, useEffect} from 'react';
import '../styling/Notifications.css';


const NotificationItem = ({message, onAccept, onReject}) =>{
    return(
        <div className='notification-item'>
            <p>{message}</p>
            <button onClick={() => onAccept()}>Accept</button>
            <button onClick={() => onReject()}>Reject</button>
        </div>
    );
};

export default NotificationItem;