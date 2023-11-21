import useForm from '../../hooks/useForm';

const LoginFormKeys = {
    EMAIL: 'email',
    PASSWORD: 'password'
}

export default function Login({
    loginSubmitHandler
}) {
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        [LoginFormKeys.EMAIL]: '',
        [LoginFormKeys.EMAIL]: '',
    });

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmit}>

                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name={LoginFormKeys.EMAIL}
                        placeholder="Sokka@gmail.com"
                        onChange={onChange}
                        value={values[LoginFormKeys.EMAIL]}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name={LoginFormKeys.PASSWORD}
                        onChange={onChange}
                        value={values[LoginFormKeys.PASSWORD]}
                    />

                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    )
}