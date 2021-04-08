import React, {useState} from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth( props ) {

    const { onCloseModal, setTitleModal } = props;
    const [showLogin, setShowLogin] = useState(true);

    const showLoginForm = () => {
        setShowLogin(true);
        setTitleModal('Iniciar Sesion');
    };

    const showRegisterForm = () => {
        setShowLogin(false);
        setTitleModal('Crear nuevo Usuario');
    };

    return showLogin 
        ? <LoginForm 
            showRegisterForm={showRegisterForm}
            onCloseModal={onCloseModal}
        /> 
        : <RegisterForm 
            showLoginForm = {showLoginForm}
        />
}
