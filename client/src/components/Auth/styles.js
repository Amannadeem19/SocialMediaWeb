import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  },
  root: {
    '& .MuiTextField-root': {
      margin: '8px',
    },
  },
  avatar: {
    margin: '8px',
    backgroundColor: 'rgba(0, 180, 185, 0.8)' ,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '24px',
  },
  submit: {
    margin: '10px 2px 16px',
  },
  googleButton: {
    marginBottom: '16px',
  },
}));