import React, {useState, useRef} from 'react';
import {Typography, TextField, Button, Divider} from '@mui/material';
import {useDispatch } from 'react-redux';
import useStyles from './styles';
import {commentPost} from '../../actions/posts';

const CommentSection = ({post}) => {
    const currentUser = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentRef = useRef();
    const handleClick = async () =>{
        const finalComment = `${currentUser.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments);
        setComment('');
        commentRef.current.scrollIntoView({behavior: 'smooth'})

    }
    console.log('current post'+ post);
    return(
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {/* when the comments for the specific post is done  */}
                    {
                        comments.map((comment, index) => (
                          <div>
                          <Typography key={index} gutterBottom variant='subtitle1'>
                               <strong> {comment.split(': ')[0]} </strong>
                               {comment.split(':')[1]}
                            </Typography>

                            <Divider gutterBottom/>
                        </div>
                        ))
                    }
                    <div ref={commentRef}/>
                </div>
                {currentUser?.result?.name && (
                        <div style={ { width : '400px' }}>
                            <Typography gutterBottom variant='h6'>Write a comment</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                rows={4}
                                multiline
                                label="Comment"
                                value={comment}
                                onChange={(e)=> setComment(e.target.value)}
                            />
                        <Button style={{ marginTop: '10px'}} color='primary' variant='contained' fullWidth disabled={!comment} onClick={handleClick}>

                            Comment
                        </Button>
                        </div>
                )}
            </div>
        </div>
    );
}

export default CommentSection;

