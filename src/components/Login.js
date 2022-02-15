import React from 'react';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!password || !password) {
            return;
        }
        props.handleLogin({
            password: password,
            email: email,            
        });
        setEmail('')
        setPassword('')
    }    

    return (
        <section className='login'>

            <h3 className="popup__title">Вход</h3>
            <form className="popup__form" onSubmit={handleSubmit}>
                <input
                    id="login-email-input"
                    className="popup__input popup__input_theme_dark"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required 
                    value={email || ''} 
                    onChange={handleChangeEmail} />
                <span id="email-input-error" className="popup__error"></span>

                <input
                    id="login-password-input"
                    className="popup__input popup__input_theme_dark"
                    type="password"
                    autoComplete="on"
                    name="password"
                    placeholder="Пароль"
                    required 
                    value={password || ''}
                    onChange={handleChangePassword} />
                <span id="password-input-error" className="popup__error"></span>

                <button className="popup__button popup__button_theme_white" type="submit">Войти</button>
            </form>

        </section>
    )
}

export default Login;