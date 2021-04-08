import React, { useState } from 'react';
import { loginApi, resetPasswordApi } from '../../../api/user';
import useAuth from '../../../hooks/useAuth';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default function LoginForm( props ) {
    const { showRegisterForm, onCloseModal } = props;
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await loginApi(formData);
            setLoading(false);

            if( response?.jwt ) {
                login( response.jwt )
                toast.success('Correcto');
                onCloseModal();
            } else {
                toast.error('Email o contraseña son incorrectos');
            }
        }
    });

    const resetPassword = () => {
        formik.setErrors({});
        const validateEmail = Yup.string().email().required();

        if ( !validateEmail.isValidSync(formik.values.identifier) ) {
            formik.setErrors({ identifier: true });
        } else {
            console.log('Email validado');
            resetPasswordApi( formik.values.identifier );
        }

    };

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="identifier"
                type="text"
                placeholder="Correo electronico"
                onChange={formik.handleChange}
                error={formik.errors.identifier}
            />
            <Form.Input 
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange={formik.handleChange}
                error={formik.errors.password}
            />

            <div className="actions">
                <Button type="button" basic onClick={showRegisterForm}>
                    Registrarse
                </Button>

                <div>
                    <Button type="submit" className="submit" loading={loading}>
                        Ingresar
                    </Button>
                    <Button type="button" onClick={resetPassword}>
                        ¿Has olvidado la contraseña?
                    </Button>
                </div>
            </div>
        </Form>
    )
}


function initialValues() {
    return {
        identifier: '',
        password: ''
    }
}

function validationSchema() {
    return {
        identifier: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
    }
}