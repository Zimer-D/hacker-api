import { FC, Fragment, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { CommentType } from "../types";
import { getCommnets } from "../utils/RequestNews";
import CommentChild from "./CommentChild";
import Icon from "./icons/icon";

type CommentItemProps = {
    children: number[]
}

const CommentItem: FC<CommentItemProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState<CommentType[]>();
    const uploadComments = () => {
        setIsLoading(true);
        getCommnets(children)
            .then((comms) => {
                setComments(comms);
                setIsLoading(false);
            })
            .catch(() => {
                toast.error('Got an error, lets try once more')
                setIsLoading(false);
            });
    }


    useEffect(() => {
        uploadComments()
    }, [])

    return (
        <>
            {isLoading ? (
                <Spinner animation="border" variant="secondary" />
            ) : (
                <Fragment>
                    <div style={{ display: 'contents' }} onClick={() => uploadComments()}>
                        {!!isLoading ?
                            <Spinner animation="border" variant="secondary" />
                            :
                            <Icon className='icon' size={40} name='repeat' />
                        }
                    </div>
                    {comments?.map(comment => (
                        <Fragment key={comment.id}>
                            <CommentChild {...comment} />
                        </Fragment>
                    ))}
                </Fragment>
            )

            }
        </>
    );

}

export default CommentItem;