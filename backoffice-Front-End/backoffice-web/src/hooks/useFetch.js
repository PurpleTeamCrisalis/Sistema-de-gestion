import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch(error => console.error(error));
    }, []);

    return {data};
}