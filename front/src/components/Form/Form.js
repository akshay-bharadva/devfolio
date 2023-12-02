import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase64 from "react-file-base64";
import useStyles from './styles';
import {createPost, updatePost} from "../../actions/posts";
import {useHistory} from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const initialPostState = {
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    }
    const [postData, setPostData] = useState(initialPostState);
    const post = useSelector(state => currentId ? state.posts.posts.find(p => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);
    
    
    const handlerSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({...postData, name: user?.result?.name }, history));
        }

        clearFormHandler();
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to Create You Own Memories and Like Other's Memories
                </Typography>
            </Paper>
        )
    }

    const clearFormHandler = () => {
        setPostData(initialPostState);
        setCurrentId(null);
    }

    return <Paper className={classes.paper} elevation={6}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handlerSubmit}>
            <Typography variant="h6">{currentId ? 'Editing a Memory' : 'Creating a Memory'}</Typography>
            <TextField
                name="title"
                variant="outlined"
                label="Post Title"
                fullWidth
                value={postData.title}
                onChange={(e) => setPostData({...postData, title: e.target.value})}
            />
            <TextField
                name="message"
                variant="outlined"
                label="Message"
                fullWidth
                multiline
                rows={4}
                value={postData.message}
                onChange={(e) => setPostData({...postData, message: e.target.value})}
            />
            <TextField
                name="tags"
                variant="outlined"
                label="Tags"
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
            />
            <div className={classes.fileInput}>
                <FileBase64 type="file" multilple={false} onDone={({ base64 }) => setPostData({...postData, selectedFile: base64})}/>
            </div>
            <Button
                className={classes.buttonSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth>
                Submit
            </Button>
            <Button
                onClick={clearFormHandler}
                variant="contained"
                color="secondary"
                size="small"
                fullWidth>
                Clear
            </Button>
        </form>
    </Paper>
}

export default Form;
