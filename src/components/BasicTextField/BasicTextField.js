import * as React from 'react';
import TextField from '@mui/material/TextField';

const BasicTextField = ({variant, onChange, onKeyDown, placeholder, sx, fullWidth=false, multiline=false, rows=1, label="", value="" ,defaultValue="", InputProps, inputProps, maxLength}) => {
    // variant = outlined | filled | standard
    return (
        <TextField variant={variant} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} sx={sx} fullWidth={fullWidth} multiline={multiline} rows={rows} maxLength={maxLength} label={label} InputProps={InputProps} inputProps={inputProps} defaultValue={defaultValue} value={value}/>

    );
}

// export default BasicTextField;
export default BasicTextField