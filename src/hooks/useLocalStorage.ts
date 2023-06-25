import useSWR, { type SWRConfiguration } from 'swr';

export default function useLocalStorage<T>(key: string, options?: SWRConfiguration<T, any>): [T | undefined, (newValue: T) => void] {
    const { data, mutate } = useSWR<T>(key, () => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : undefined;
    }, options);

    const setLocalStorage = (newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        mutate(newValue, false);
    };

    return [data, setLocalStorage];
}