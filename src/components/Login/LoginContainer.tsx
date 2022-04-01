import backgroundImage from "../../assets/img/main-menu/main-menu-background.gif";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm";
import React from "react";
import { connect } from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {login, registration} from "../../redux/auth-reducer";
import {NavLink} from "react-router-dom";

class LoginContainer extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        this.state = {haveAccount: false}
    }

    render() {

        return (
            <div className={styles.container}>
                <section className={styles.imageContainer}>
                    <img src={backgroundImage} alt={'#'}/>
                </section>
                <section className={styles.sectionContainer}>
                    <div className={styles.backLinkContainer}>
                        <NavLink to="/main_menu" className={({ isActive }) =>  isActive ? `${styles.active}` : ""}>
                            <div className={styles.backLink}><span>{'<'}</span></div>
                        </NavLink>
                    </div>
                    <div>
                        <h1>{this.state.haveAccount ? 'Войти в аккаунт' : 'Создать аккаунт'}</h1>
                    </div>
                        <div>
                            <LoginForm signUp={this.props.signUp}
                                       login={this.props.login}
                                       haveAccount={this.state.haveAccount}
                            />
                            <div className={styles.subButton}>
                                <button onClick={() => this.setState({haveAccount: !this.state.haveAccount})}>
                                    {!this.state.haveAccount ? 'Уже есть аккаунт' : 'Создать аккаунт'}
                                </button>
                            </div>
                        </div>
                </section>
            </div>
        )
    }


}

let mapStateToProps = (store: AppStateType) => {
    return {
        auth: store.auth
    }
}

export default connect(mapStateToProps, {login, signUp: registration})(LoginContainer)