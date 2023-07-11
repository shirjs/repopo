// components/GroupRequests.js
import { supabase } from '../supabaseClient';

import React, { useEffect, useState } from 'react';
import useManageRequests from '../hooks/useManageRequests';

const GroupRequests = ({ groupName }) => {
    const [requests, setRequests] = useState([]);
    const { manageRequest, loading, error } = useManageRequests();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        const { data, error } = await supabase
            .from('group_requests')
            .select('*')
            .eq('group_name', groupName)
            .eq('status', 'Pending');
        
        if (error) {
            console.log('Error fetching requests: ', error);
        } else {
            setRequests(data);
        }
    };

    const handleApprove = async (id) => {
        await manageRequest(id, 'Approved');
        fetchRequests();
    };

    const handleReject = async (id) => {
        await manageRequest(id, 'Rejected');
        fetchRequests();
    };

    return (
        <div>
            <h2>Pending Requests</h2>
            {requests.map(request => (
                <div key={request.id}>
                    <p>Request from user {request.user_id}</p>
                    <button onClick={() => handleApprove(request.id)} disabled={loading}>Approve</button>
                    <button onClick={() => handleReject(request.id)} disabled={loading}>Reject</button>
                </div>
            ))}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default GroupRequests;
