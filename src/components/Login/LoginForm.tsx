import {Form, Formik, Field} from "formik";
import * as yup from 'yup';
import styles from "./Login.module.css"

const LoginForm = () => {
    return (
        <Formik
            initialValues={{
                name: '',
                password: '',
                rememberMe: false,
            }}
            validationSchema={SignInSchema}
            onSubmit={(values, { resetForm, setStatus, setSubmitting }) => {

            }}
        >
            {({errors, touched, status}) => (
                <Form>
                    <div className={styles.formInput}>
                        <Field name={'name'} placeholder={'Имя пользователя'}/>
                        {errors.name && touched.name ? <div className={styles.error}>{errors.name}</div> : null}
                        {status && status.messageName ? <div className={styles.error}>{status.messageName}</div> : null}
                    </div>
                    <div className={styles.formInput}>
                        <Field name={'password'} placeholder={'Пароль'} type={'password'}/>
                        {errors.password && touched.password ? <div className={styles.error}>{errors.password}</div> : null}
                        {status && status.messagePassword ? <div className={styles.error}>{status.messagePassword}</div> : null}
                    </div>
                    <div className={styles.formCheckbox}>
                        <Field name={'rememberMe'} type={"checkbox"}/> Запомнить меня
                    </div>
                    <div className={styles.formButton}>
                        <button type="submit">Войти</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

const SignInSchema = yup.object().shape({
    name: yup.string().min(3, 'Слишком короткое!').max(20, 'Слишком длинное!').required('Обязательно заполнить'),
    password: yup.string().min(3, 'Слишком короткий!').max(20, 'Слишком длинный!').required('Обязательно заполнить'),
})

export default LoginForm