import { Fragment, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { CommentType } from "../types";
import { getCommnets } from "../utils/RequestNews";
import parse from 'html-react-parser';
const CommentChild = (comment: CommentType) => {
    const [answers, setAnswers] = useState<CommentType[]>();
    const [isLoading, setIsLoading] = useState(false);
    const requestAnswers = (children: number[]) => {
        setIsLoading(true);
        getCommnets(children)
            .then((comms) => {
                console.log(comms)
     debugger;
                setAnswers([ ...(comms as CommentType[])]);
                setIsLoading(false);
            })
            .catch(() => {
                toast.error('Got an error, lets try once more')
                setIsLoading(false);
            });
    }
    if (isLoading) { return <Spinner animation="border" variant="secondary" /> }
    console.log(22, comment)
    return (
        <Card
            bg={'dark'}
            text='white'
            style={{ marginTop: '20px' }}
        >
            <Card.Body>
                <Card.Title>{comment.by}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <div>{new Date(comment.time * 1000).toLocaleDateString('ru', {
                        hour: 'numeric',
                        minute: 'numeric'
                    })}
                    </div>
                </Card.Subtitle>
                <div>
                    {parse(comment.text)}
                </div>
                <span
                style={{cursor:'pointer'}}
                    onClick={(e) => comment?.kids?.length > 0 ? requestAnswers(comment?.kids): e.preventDefault}
                >
                    {`${comment?.kids?.length?? 0} answer(s)`}
        
                    {answers?.map((answer) => {
                        debugger
                   return(

                    <Fragment key={answer.id}>         
                            <CommentChild {...answer} />
                        </Fragment>
                   )
})}
                </span>
            </Card.Body>
        </Card>
    );
}

export default CommentChild;