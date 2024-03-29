import {Link, Navigate, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, CITIES, PASSWORD_VALID_ERROR} from '../../const';
import {Helmet} from 'react-helmet-async';
import React, {FormEvent, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthData} from '../../types/auth-data';
import {loginAction} from '../../store/api-actions';
import {toast} from 'react-toastify';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {changeCity} from '../../store/offer-data/offer-data';
import {getCity} from '../../store/offer-data/selectors';

function LoginPage(): JSX.Element {
  const currentAuthorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentCity = useAppSelector(getCity);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const randomCityIndex = Math.floor(Math.random() * 6);
  const randomCity = CITIES[randomCityIndex];

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  if(currentAuthorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main}/>;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const password = passwordRef.current.value;

      if(!password.match(/\d/g) || !password.match(/[a-zA-Z]/g)) {
        toast.error(PASSWORD_VALID_ERROR);
      }
      else {
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });
      }
    }
  };

  const handleChangeCity = (e: React.MouseEvent<HTMLAnchorElement>, cityId: number) => {
    e.preventDefault();
    if(cityId !== currentCity.id) {
      dispatch(changeCity({cityId}));
    }
    navigate(AppRoute.Main);
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" ref={loginRef} type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" ref={passwordRef} type="password" name="password" placeholder="Password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" onClick={(e) => handleChangeCity(e,randomCity.id)} href="/">
                <span>{randomCity.title}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
