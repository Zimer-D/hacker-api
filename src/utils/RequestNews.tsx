import axios from 'axios';
import { toast } from 'react-toastify'

export const getStory = async (id: number) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/item/${id}.json?print=pretty`);
        const story = res.data
        return story;
    } catch (error) {
        toast.error('Error while getting a news article.');
    }
};

export const getStories = async () => {
    try {
        const { data: storyIds } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/newstories.json?print=pretty`
        );
        const stories = await Promise.all(storyIds.slice(0, 100).map(getStory));
        return stories;
    } catch (error) {
        toast.error('Error while getting list of news.');
    }
};

export const getCommnets = async (commentsIds: number[]) => {
    try {
        const comments = await Promise.all(commentsIds.map(getStory))
        return comments;
    } catch (error) {
        toast.error('Error while getting list of comments.');
    }
}