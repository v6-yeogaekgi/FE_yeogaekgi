import * as React from 'react';
import TextField from '@mui/material/TextField';

const BasicTextField = ({variant, onChange, onKeyDown, placeholder, sx, fullWidth=false, multiline=false, rows=1, label="", defaultValue="", InputProps}) => {
    // variant = outlined | filled | standard
    return (
        <TextField variant={variant} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} sx={sx} fullWidth={fullWidth} multiline={multiline} rows={rows} label={label} InputProps={InputProps} defaultValue={defaultValue}/>

    );
}

// export default BasicTextField;
export default TextField