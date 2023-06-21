import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { AppBar, Avatar, Toolbar, Typography , Button} from '@mui/material';
import {useDispatch} from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';
import decode from 'jwt-decode';
import memorieslogo from '../../images/memories-Logo.png';
import memoriestext from '../../images/memories-Text.png';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}
const Navbar = () => {
    // for finding the size 
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

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location =useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    console.log(user);

    const logout = () => {
        dispatch({type: 'LOGOUT'})
        navigate('/')
        setUser(null)
    }
    useEffect(()=>{
        // using google signin
        const token =user?.token
        

        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
            
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    return (
        
        <AppBar direction={windowDimensions.width <= 600 ? 'column' : 'row'} className={classes.appBar}  position='static' color='inherit' style={{height: '100px', width:'100%'}}>
   <Link  to="/" className={classes.brandContainer}>
        <img src={memoriestext} alt="icon" height='45px'/>
    <img className={classes.image} src={memorieslogo} alt="memories" />
    </Link>
    <Toolbar className={classes.toolbar} width = {windowDimensions.width <= 600 ? 'auto' : '100%'}>
    {
        user ? (
            <div className={classes.profile} justify={windowDimensions.width <= 600 ? 'center' : 'space-between'} width = {windowDimensions.width <= 600 ? 'auto' : '400px'} marginTop = {windowDimensions.width <= 600 && '20px'}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>Logout</Button>
            </div>
        ) : (
            <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
        )

    }
   
    </Toolbar>
    </AppBar>
     
  );
}
export default Navbar;