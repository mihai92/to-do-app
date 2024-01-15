import React, { useState, useEffect } from "react";
import '../styling/GroupMembers.css';
import MenuButton from "./MenuButton";
import Popup from "reactjs-popup";
const url = "http://localhost:5000/members";
const urlDeleteMember = "http://localhost:5000/member";
const invitationUrl = "http://localhost:5000/invite";
const groupUpdateUrl = "http://localhost:5000/group";  // Endpoint for updating group name
const token = sessionStorage.getItem("user-info");

const GroupMembers = ({ groupId, groupName }) => {
    const [open, setOpen] = useState(false);
    const [nickname, setNickname] = useState('');
    const [members, setMembers] = useState([]);
    const [editingGroupName, setEditingGroupName] = useState(false);
    const [newGroupName, setNewGroupName] = useState(groupName);

    useEffect(() => {
        if (groupId) {
            fetchMembers(groupId);
        }
    }, [groupId,members]);

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
            const response = await fetch(`${invitationUrl}/${groupId}/${nickname}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
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

    const handleGroupNameClick = () => {
        setEditingGroupName(true);
    };

    const handleGroupNameSubmit = async () => {
        try {
            const response = await fetch(`${groupUpdateUrl}/${groupId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Nume: newGroupName }),
            });

            if (response.ok) {
                // Handle successful group name update here
                alert('Group name updated successfully.');
                setEditingGroupName(false);
            } else {
                const data = await response.json();
                alert(data.Message || 'Error updating group name.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Failed to update group name due to a network error.');
        }
    };

    const handleGroupNameKeyDown = (e) => {
        // Handle "Enter" key press to submit the group name
        if (e.key === 'Enter') {
            handleGroupNameSubmit();
        }
    };

    const handleDeleteMember = async (idMember) => {
        try {
            const response = await fetch(`${urlDeleteMember}/${groupId}/${idMember}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                fetchMembers();
                console.log(data.Message || 'Member deleted successfully.');
            } else {
                console.error(data.Message || 'Error deleting member.');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="GroupMembers">
            <div className="GroupMembersTop" onClick={handleGroupNameClick}>
                {editingGroupName ? (
                    <input
                        type="text"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        onBlur={handleGroupNameSubmit}
                        onKeyDown={handleGroupNameKeyDown}
                        autoFocus
                    />
                ) : (
                    <span className="textgrouptop">{newGroupName}</span>
                )}
            </div>
            {members.map((member) => (
                <MenuButton key={member.Id_Membru} label={member.Nickname} onClick={() => handleDeleteMember(member.Id_Membru)} />
            ))}
            <MenuButton cclass="AddNewMember" label="AddNewMember" onClick={() => setOpen(true)} />

            <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
                <div className='modalgroupmembers'>
                    <div className="toplabelpopupgroupmembers">
                    Send member invitation
                  </div>
                  <div className='content'>
                    <input
                        className='input'
                        type="nickname"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                    <div className='buttonspopup'>
                    <button className='buttonpopup1'onClick={() => handleSendInvitation(nickname)}>Send Invitation</button>
                    <button className='buttonpopup1'onClick={() => setOpen(false)}>Cancel</button>
                    </div>
                </div>
            </Popup>
        </div>
    );
};

export default GroupMembers;