import React, {useState, useEffect} from 'react'
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@mui/material';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import {MuiChipsInput} from 'mui-chips-input';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination.jsx';
import useStyles from './styles';
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function useQuery(){
    return new URLSearchParams(useLocation().search);
}
const Home = () => {
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    // define the hooks
    // [dispatch] means effect only re-run when the dispatch value changes 
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]); // tags = [europe, usa] -> 'europe, usa
    const navigate = useNavigate();
   
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
            console.log(windowDimensions.width);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const searchPost = ()=>{
        if(search.trim() || tags){
            // dispatch -> fetch search post 
            dispatch(getPostsBySearch({search, tags: tags.join(',')}))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            navigate("/");
        }

    }
    const handlePress = (e)=>{
        //press enter
            if(e.keyCode === 13){
                // search the post
                search();
            }
    }   
    const handleAdd= (tag)=> setTags([...tags, tag]);
    const handleDelete = (tagToBeDelete) => setTags(tags.filter((tag) => tag !== tagToBeDelete))
    
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container direction={windowDimensions.width <= 600 ? 'column-reverse' : 'row'}
                   className={ classes.gridContainer } justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} >
                       <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField
                            name='search'
                            label='Search Memories'
                            variant='outlined'
                            fullWidth
                            onKeyPress={handlePress}
                            value={search}
                            onChange={(e) => setSearch(e.target.value) }

                        />
                        <MuiChipsInput
                        label='Search Tags'
                        value={tags}
                        style={{margin: '10px 0'}}
                        variant='outlined'
                        onAddChip={handleAdd}
                        onDeleteChip={handleDelete}
                        />
                        <Button className={classes.searchButton} variant="contained" color='primary' onClick={searchPost}>Search</Button>
                       </AppBar>
                       
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                        <Paper elevation={6} className={classes.pagination}>
                             <Pagination page={page}/>
                         </Paper>
                        )}
                       
                    </Grid>

                </Grid>
            </Container>

        </Grow>
    )
}

export default Home;