import './../css/login.css'

type Props = {}

export default function SignUp({}: Props) {
  return (
    <div className="login">
        <div className="center">
        <h1>Sign up</h1>
            <form method="post">
                <div className="txt_field">
                    <input type="text" name="name" required />
                    <label>Name</label>
                </div>
                <div className="txt_field">
                    <input type="text" name="username" required />
                    <label>Username</label>
                </div>
                <div className="txt_field">
                    <input type="password" name="password" required />
                    <label>Password</label>
                </div>
                <input type="submit" value="Login" />
                <div className="signup_link"> 
                    Already a member?
                    <a href="/">
                        Login
                    </a>
                </div>
            </form>
        </div>

    </div>
  )
}