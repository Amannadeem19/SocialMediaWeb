import { makeStyles} from "@mui/styles";


export default makeStyles((theme) =>({
    appBar: {
      position: 'relative',
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
      heading: {
        position:'absolute',
        color: 'Black',
        
      },
      image: {
        // marginLeft: '15px',
        borderRadius: 10,
      },
      // [theme.breakpoints.down('sm')]:{
      //   mainContainer:{
      //     flexDirection: 'column',
      //   }
      // }
     
     
}))