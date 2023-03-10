import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { CommentType, StoryType } from "../../types";
import { getCommnets, getStory } from "../../utils/RequestNews";
import CommentItem from "../../components/Comment";
import { toast } from "react-toastify";

const NewsPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [story, setStory] = useState<StoryType>();
    const [comments, setComments] = useState<CommentType[]>();
    const navigate = useNavigate();
    if (!id) throw new Error();

    useEffect(() => {
        getStory(+id)
            .then((newsItem) => {
                setStory(newsItem);
                setIsLoading(false);
            })
            .then(() => {
                !!story?.kids.length &&
                    getCommnets(story.kids)
                        .then((comms) => {
                            setComments(comms);
                            setIsLoading(false);
                        })

            })
            .catch(() => {
                toast.error('Got an error, lets try once more')
                setIsLoading(false);
            });
    }, [])

    if (!story) return (<div>There is no such story</div>);


    return (
        <>
            {isLoading ? (
                <Spinner animation="border" variant="secondary" />
            ) : (
                <Card
                    bg={'dark'}
                    text='white'
                    style={{ marginTop: '20px' }}
                >
                    <Card.Body>
                        <Card.Title>{story.title} by {story.by}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            {story.url}
                            <div>{new Date(story.time * 1000).toLocaleDateString('ru', {
                                hour: 'numeric',
                                minute: 'numeric'
                            })}
                            </div>
                        </Card.Subtitle>
                        <Card.Text>
                            {story.title}
                        </Card.Text>
                        <span>
                            {`${story?.kids && story?.kids?.length > 0 ? story?.kids?.length : 0} comment(s)`}
                            {story?.kids?.length&&
                                <CommentItem children={story.kids}/>
                            }

                        </span>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            variant='secondary'
                            onClick={() => navigate(-1)}>
                            Back to news
                        </Button>
                    </Card.Footer>
                </Card>
            )}
        </>
    );
}

export default NewsPage;