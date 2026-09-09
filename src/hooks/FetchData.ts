import { useCallback, useEffect, useState } from "react";

 type ApiResponse<T> = {
    data: T[];
    count: number;
};

type GetData<TQuery, TResult> = (
    queryData?: TQuery
) => Promise<ApiResponse<TResult>>;


export function useFecthData<TQuery, TResult>(getData: GetData<TQuery, TResult>, queryData?: TQuery){

    const [results, setResults] = useState<TResult[]>([]);
    const [count, setCount] = useState(0);

    const fetchData = useCallback( async () => {
        try {
            let response: ApiResponse<TResult>;
            if (queryData) {
                response = await getData(queryData);
                setResults(response.data);
                setCount(response.count);
            }
            else{
                const response = await getData();
                setResults(response.data);
                setCount(response.count);
            }
           
        } catch (error) {
            console.error("Fetch error : "+error);
        }
    },[getData, queryData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return{
        results,
        count,
        refresh: fetchData
    }
}