import * as React from 'react';
import TextField from '@mui/material/TextField';

const BasicTextField = ({variant, onChange, placeholder, sx}) => {
    // variant = outlined | filled | standard
    return (
        <TextField variant={variant} onChange={onChange} placeholder={placeholder} sx={sx}/>
    );
}

export default BasicTextField;