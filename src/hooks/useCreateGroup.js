import { useState } from 'react';
import { supabase } from '../supabaseClient';

const useCreateGroup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createGroup = async (leader_id) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('user_group')
                .insert([
                    { leader_id: leader_id },
                ]);
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
        createGroup,
        loading,
        error,
    };
};

export default useCreateGroup;
