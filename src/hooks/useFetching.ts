import { useState } from "react";

export const useFetching = (callback : () => Promise<void>) => {
    const [isPostsLoading, setIsLoading] = useState(false);
    const [postError, setError] = useState('');

    const fetchCallback = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetchCallback, isPostsLoading, postError] as const;
}