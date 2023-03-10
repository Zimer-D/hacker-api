import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StoryType } from "../types";
import { getStories } from "./RequestNews";

const useDataFetcher = () => {
    const [stories, setStories] = useState<StoryType[]>();
    const [isLoading, setIsLoading] = useState(false);


    const apiCall = () => {
        getStories()
            .then((stories) => {
                setStories(stories);
                setIsLoading(false);
            })
            .catch(() => {
                toast.error('Got an error, lets try once more')
                setIsLoading(false);
            });
    }
    useEffect(() => {
        setIsLoading(true);
        apiCall()
    }, [])
    useEffect(() => {
        setIsLoading(true);
        const id = setInterval(async () => {
            apiCall()
        }, 60000)
        return () => clearInterval(id);
    }, []);

    return { isLoading, stories };
};

export default useDataFetcher;