import React from 'react'
import {Grid, TextField, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Input = ({name, handleChange, label, half, autoFocus, type, handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                variant="outlined" 
                InputProps={name === 'password' ? {
                    endAdornment:(
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>   
                        </InputAdornment>
                    )
                }:null}
            />
    </Grid>
  )
}

export default Input;