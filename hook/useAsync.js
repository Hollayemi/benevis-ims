"use client";
import { useEffect, useState } from "react";

export function useAsync(asyncFn, args = [], deps = []) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        asyncFn(...args)
            .then((res) => {
                if (isMounted) setData(res);
            })
            .catch((err) => {
                if (isMounted) setError(err);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, deps);

    return { data, error, loading };
}
