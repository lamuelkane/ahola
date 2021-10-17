import Header from '../components/Header'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Register = () => {
    return (
        <div>
            <div className="border">
                <Header />
            </div>
            <div className="registerhero">
                <div className="registerform">
                    <div>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
