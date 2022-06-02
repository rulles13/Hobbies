import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import SignInForm from './SignInForm';

const Log = (props ) => {
    const [registerModal, setRegisterModal] = useState(props.register);
    const [signInModal, setSignInModal] = useState(props.signIn);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setRegisterModal(true);
            setSignInModal(false);
        } else if (e.target.id === "login") {
            setRegisterModal(false);
            setSignInModal(true);
        }
    }
    
    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li onClick={handleModals} id="register" className={registerModal ? "active-btn" : null}>S'inscrire</li>
                    <li onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>Se connecter</li>
                </ul>
                {registerModal && <RegisterForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;