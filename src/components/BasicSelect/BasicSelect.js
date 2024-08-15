import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ width, options, onCurrencyChange }) {
    const [curr, setCurr] = React.useState("");

    const handleChange = (event) => {
        const newValue = event.target.value;
        setCurr(newValue);
        if (onCurrencyChange) {
            onCurrencyChange(newValue);
        }
    };

    return (
        <Box sx={{ width: width }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">currency</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={curr}
                    label="currency"
                    onChange={handleChange}
                >
                    {options.map((option , i) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}