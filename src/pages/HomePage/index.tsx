import { Fragment, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { StoryType } from "../../types";
import { getStories } from "../../utils/RequestNews";
import Story from "../../components/Story";
import Icon from "../../components/icons/icon";

const HomePage = () => {
    const [stories, setStories] = useState<StoryType[]>();
    const [isLoading, setIsLoading] = useState(false);

    const apiCall = () => {
        setIsLoading(true);
        getStories()
            .then((stories) => {
                setStories(stories);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }
    useEffect(() => {
        apiCall()
    }, [])
    useEffect(() => {
        const id = setInterval(async () => {
            apiCall()
        }, 60000)
        return () => clearInterval(id);
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner animation="border" variant="secondary" />
            ) : (
                <div className="mainPageContainer">
                    <div>                   
                        {
                        stories?.map((story) => (
                            <Fragment key={story.id} >
                                <Story {...story} />
                            </Fragment>
                        ))}
                    </div>
                    <div className="mainPageButtonWrapper">
                        <Button
                        variant="secondary"
                        className="mainPageButton"
                        onClick={() => apiCall()}>
                            <Icon  className='icon' size={40} name='repeat'/>
                            Refresh
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default HomePage;