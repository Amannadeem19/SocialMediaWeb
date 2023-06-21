
import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
     margin: 8,
    },
  },
  paper: {
    padding: 16,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor:'rgba(123,181,255, 1)'
   
  },
  buttonClear: {
    marginBottom: 10,
    backgroundColor:'Red'
   
  },
}));