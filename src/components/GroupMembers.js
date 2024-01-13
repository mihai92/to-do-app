import React, { useState, useEffect } from "react";
import '../styling/GroupMembers.css';
import MenuButton from "./MenuButton";
import Popup from "reactjs-popup";
const url = "http://localhost:5000/members"
const invitationUrl = "http://localhost:5000/invite"
const token = localStorage.getItem("user-info");

const GroupMembers = ({ groupId, groupName }) => {
    const [open, setOpen] = useState(false);
    const [nickname, setNickname] = useState('');
    const [members, setMembers] = useState([]);


    useEffect(() => {
        if (groupId) {
            fetchMembers(groupId);
        }
    }, [groupId]);

    const fetchMembers = async (groupId) => {
        try {
            const response = await fetch(`${url}/${groupId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMembers(data);
        } catch (error) {
            console.error("Error fetching members", error);
        }
    };

    const handleSendInvitation = async (nickname) => {
        try {
            const response = await fetch(`${invitationUrl}/${groupId}/${nickname}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    // Handle successful invitation here
                    alert('Invitation sent successfully.'); 
                    setOpen(false);
                    setNickname('');
                    } else {
                    alert(data.Message || 'Error sending invitation.');
                    }
                    } catch (error) {
                    console.error('Network error:', error);
                    alert('Failed to send invitation due to a network error.');
                    }
                    };

    return (
        <div className="GroupMembers">
            <div className="GroupMembersTop">
                {groupName}
            </div>
            {members.map((member) => (
                <MenuButton key={member.Id_Membru} label={member.Nickname} />
            ))}
            <MenuButton cclass="AddNewMember" label="AddNewMember" onClick={() => setOpen(true)} />

            <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
                <div className="popup-content">
                    <h2>Send Member Invitation</h2>
                    <input
                        type="nickname"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button onClick={() => handleSendInvitation(nickname)}>Send Invitation</button>
                    <button onClick={() => setOpen(false)}>Cancel</button>
                </div>
            </Popup>
        </div>
    );
};

export default GroupMembers;