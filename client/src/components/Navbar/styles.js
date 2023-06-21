
// change its styling 
import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';
import { height } from '@mui/system';

export default makeStyles(() => ({
  appBar: {
   
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    // [theme.breakpoints.down('sm')]: {
    //   flexDirection: 'column',
    // },
  },
  heading: {
   marginLeft:'40px',
    color: 'rgba(0, 180, 185, 0.8)',
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
  
    marginLeft: '10px',
    marginTop: '5px',
    width:'50px',
    height:'70px',
    borderRadius:10
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    // [theme.breakpoints.down('sm')]: {
    //   width: 'auto',
    // },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    // [theme.breakpoints.down('sm')]: {
    //   width: 'auto',
    //   marginTop: 20,
    //   justifyContent: 'center',
    // },
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap:10

  },
  purple: {
    color: deepPurple[200],
    backgroundColor: deepPurple[500],
  },
}));