export async function useSearch<T extends Object>(key: keyof T, search_term: string, list: T[]): Promise<T[]> {

    const query = search_term.toLowerCase();
    if (query.trim() === "") {
        return list;
    }
    else{
        return list.filter((item) => {
            return String(item[key]).toLowerCase().includes(query)
        })
    }
}