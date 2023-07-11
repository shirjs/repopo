// hooks/useManageRequests.js

import { useState } from 'react';
import { supabase } from '../supabaseClient';

const useManageRequests = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const manageRequest = async (id, status) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('group_requests')
                .update({ status: status })
                .eq('id', id);
            
            if (error) {
                throw error;
            }
            setLoading(false);
            return data;
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return {
        manageRequest,
        loading,
        error,
    };
};

export default useManageRequests;
