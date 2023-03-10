import { FC } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { StoryType } from "../types";


const Story: FC<StoryType> = (story) => {
    const navigate = useNavigate();
    console.log(story)
    return (
        <Card
            bg={'dark'}
            text='white'
            className="story"
            onClick={()=>navigate(`/${story.id}`)}
        >
            <Card.Title>
                {story.title}
            </Card.Title>
            <Card.Subtitle>
                <div>by{' '}{story.by}</div>
                <div>{new Date(story.time * 1000).toLocaleDateString('ru', {
                    hour: 'numeric',
                    minute: 'numeric'
                })}
                </div>
            </Card.Subtitle>
            <Card.Footer>
                <span>
                   Score: {story.score}
                </span>
            </Card.Footer>

        </Card >
    );
};

export default Story;