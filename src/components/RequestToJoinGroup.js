import React, { useState } from 'react';
import { useUserId } from '../hooks/useUserId';
import useRequestToJoinGroup from '../hooks/useRequestToJoinGroup';

const RequestToJoinGroup = () => {
    const currentUserId = useUserId();
    const { requestToJoinGroup, loading, error } = useRequestToJoinGroup();
    const [groupName, setGroupName] = useState('');
    const [requestSent, setRequestSent] = useState(false);

    const handleRequestToJoinGroup = async () => {
        const request = await requestToJoinGroup(groupName, currentUserId);
        if (request) {
            setRequestSent(true);
        }
    };

    return (
        <div>
            <h1>Request to Join a Group</h1>
            <input
                type="text"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder="Enter group name"
            />
            <button onClick={handleRequestToJoinGroup} disabled={loading}>
                {loading ? 'Sending Request...' : 'Send Request'}
            </button>
            {requestSent && <p>Request to join {groupName} sent!</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default RequestToJoinGroup;
