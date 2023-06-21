import React from 'react';
import Post from './Post/Post';
import {Grid, CircularProgress} from '@mui/material'
import useStyles from './styles.js';
import {useSelector} from 'react-redux'

const Posts = ({setCurrentId})=>{
  const {posts, isLoading} = useSelector((state) =>  state.posts) // change [] -> {posts} because we return many things
  const classes = useStyles();
  console.log(posts);
  if(!posts.length && !isLoading){
    return 'No Posts'
  }
  return(
  
      isLoading?<CircularProgress/> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}> 
          {
            posts.map((post)=>(
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                <Post post={post} setCurrentId={setCurrentId}/>
              </Grid>
            ))
          }
        </Grid>
      )
    );
}

export default Posts;