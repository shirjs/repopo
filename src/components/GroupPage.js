import React, { useState } from 'react';
import useCreateGroup from '../hooks/useCreateGroup';
import { useUserId } from '../hooks/useUserId';
import useGroupLeadership from '../hooks/useGroupLeadership';
import GroupRequests from './GroupRequests';

const GroupPage = () => {
    const currentUserId = useUserId();
    const leaderGroupName = useGroupLeadership();
    const { createGroup, loading, error } = useCreateGroup();
    const [groupCreated, setGroupCreated] = useState(false);
    const [groupName, setGroupName] = useState('');

    const handleCreateGroup = async () => {
        const newGroup = await createGroup(currentUserId, groupName);
        if (newGroup) {
            setGroupCreated(true);
        }
    };

    return (
        <div>
            <h1>Group Page</h1>
            <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
            />
            {!groupCreated ? (
                <button onClick={handleCreateGroup} disabled={loading || !groupName}>
                    {loading ? 'Creating...' : 'Create Group'}
                </button>
            ) : (
                <p>Group successfully created!</p>
            )}
            {error && <p>Error: {error}</p>}
            {leaderGroupName && <GroupRequests groupName={leaderGroupName} />}
        </div>
    );
};

export default GroupPage;
