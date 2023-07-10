import React, { useState } from 'react';
import useCreateGroup from '../hooks/useCreateGroup';
import { useUserId } from '../hooks/useUserId';

const GroupPage = () => {
    const currentUserId = useUserId();
    const { createGroup, loading, error } = useCreateGroup();
    const [groupCreated, setGroupCreated] = useState(false);

    const handleCreateGroup = async () => {
        const newGroup = await createGroup(currentUserId);
        if (newGroup) {
            setGroupCreated(true);
        }
    };

    return (
        <div>
            <h1>Group Page</h1>
            {!groupCreated ? (
                <button onClick={handleCreateGroup} disabled={loading}>
                    {loading ? 'Creating...' : 'Create Group'}
                </button>
            ) : (
                <p>Group successfully created!</p>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default GroupPage;
