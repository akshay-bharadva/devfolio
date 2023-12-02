import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const Input = ({ half, name, label, type, autoFocus, handleChange, handleShowPassword }) => {
    return (
        <Grid item xs={6} sm={half ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                type={type}
                onChange={handleChange}
                autoFocus={autoFocus}
                variant="outlined"
                required
                fullWidth
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }: null}
            />
        </Grid>
    )
}

export default Input;
