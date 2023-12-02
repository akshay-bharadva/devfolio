import {useState, useRef} from "react";
import {Typography, TextField, Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import useStyles from './styles';
import {commentPost} from "../../../actions/posts";

const Comments = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const clickHandler = async () => {
        const userComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(userComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((cm, index) => (
                        <Typography key={index} gutterBottom variant="subtitle1">
                            <strong>{cm.split(': ')[0]}:</strong>
                            {cm.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result && (
                    <div style={{ width: "70%" }}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                            style={{ marginTop: "10px" }}
                            fullWidth
                            disabled={!comment}
                            variant="contained"
                            color="primary"
                            onClick={clickHandler}>
                            Comment
                        </Button>
                    </div>
                )}

            </div>
        </div>

    )
}

export default Comments;
