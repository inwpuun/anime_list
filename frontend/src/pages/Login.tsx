import { ChangeEvent, useState } from 'react';
import './../css/login.css'
import { client } from '../axios';
import { useNavigate } from 'react-router-dom';

type Props = {}

async function loginUser(username: string, password: string): Promise<void> {
    try {
        const response = await client.post('user/userLogin', {
            username,
            password
        });
    
        // Handle the response data
        const { token } = response.data;
        // Store the token in local storage or a state management solution
        console.log(token)
        localStorage.setItem('token', token);
        
        // Redirect to another page or perform other actions on successful login

    } catch (error) {
        // Handle error
        console.error(error);
        // Display an error message to the user or perform other error handling actions
    }
  }
  
  

export default function Login({}: Props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = () => {
        loginUser(username, password);
        navigate('/home');
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await client.post('/user/userLogin');
    //         console.log(response)
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
        
    //     fetchData();
    // }, []);

    return (
        <div className="login">
            <div className="center">
            <h1>Login</h1>
                <form method="post" onSubmit={() => handleLogin()}>
                    <div className="txt_field">
                    <input type="text" name="username" required value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                    <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" name="password" required value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        <label>Password</label>
                    </div>
                    <input type="submit" value="Login" />
                    <div className="signup_link"> 
                        Not a member? 
                        <a href="signup">
                            Signup
                        </a>
                    </div>
                </form>
            </div>

        </div>
    )
}