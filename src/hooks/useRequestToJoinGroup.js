import { useState } from 'react';
import { supabase } from '../supabaseClient';

const useRequestToJoinGroup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestToJoinGroup = async (groupName, userId) => {
        setLoading(true);
        try {
            const { data: existingRequests, error: fetchError } = await supabase
                .from('group_requests')
                .select('status')
                .eq('group_name', groupName)
                .eq('user_id', userId);

            if (fetchError) {
                throw fetchError;
            }

            // If no existing request
            if (!existingRequests.length) {
                const { data, error: insertError } = await supabase
                    .from('group_requests')
                    .insert([
                        { group_name: groupName, user_id: userId, status: 'Pending' },
                    ]);

                if (insertError) {
                    throw insertError;
                }

                return data;
            } else if (existingRequests[0].status === 'Rejected') {
                // If the existing request is 'Rejected', update it to 'Pending'
                const { data, error: updateError } = await supabase
                    .from('group_requests')
                    .update({ status: 'Pending' })
                    .eq('group_name', groupName)
                    .eq('user_id', userId);

                if (updateError) {
                    throw updateError;
                }

                return data;
            } else {
                throw new Error('You have already requested to join this group.');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        requestToJoinGroup,
        loading,
        error,
    };
};

export default useRequestToJoinGroup;
