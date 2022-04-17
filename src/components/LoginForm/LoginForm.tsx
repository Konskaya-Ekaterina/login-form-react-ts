import {useState, ChangeEvent, FormEvent} from 'react';
import './LoginForm.scss'

export default function LoginForm() {
  const [formType, setFormType] = useState('registration');
  const [formInfo, setFormInfo] = useState('Введите свой email и придумайте пароль');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [emailWarning, setEmailWarning] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [passwordRepeatWarning, setPasswordRepeatWarning] = useState('');

  function validateEmail(email: string): boolean {
    const regexp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
  }

  function changeFormType(type: string): void {
    setEmail('');
    setPassword('');
    setPasswordRepeat('');
    setEmailWarning('');
    setPasswordWarning('');
    setPasswordRepeatWarning('');

    switch (type) {
      case 'restore':
        setFormInfo('Введите свой email для восстановления пароля');
        break
      case 'entry' :
        setFormInfo('Введите свои логин и пароль');
        break
      default:
        setFormInfo('Введите свой email и придумайте пароль');
    }
    setFormType(type)
  }

  function handleEmailInput(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
    setEmailWarning('');
  }

  function handlePasswordInput(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value.toString());
    setPasswordWarning('');
    setPasswordRepeatWarning('');
  }

  function handlePasswordRepeatInput(event: ChangeEvent<HTMLInputElement>): void {
    setPasswordRepeat(event.target.value.toString());
    setPasswordWarning('');
    setPasswordRepeatWarning('');
  }

  function submitForm(event: FormEvent): void {
    event.preventDefault();

    if (formType === 'registration') {
      const emailIsValid = validateEmail(email);

      if (!emailIsValid) {
        setEmailWarning('Неправильный формат email');
      }

      if (password.length < 8) {
        setPasswordWarning('Пароль должен содержать минимум 8 символов');
      }

      if (!!passwordRepeat && password !== passwordRepeat) {
        setPasswordWarning('Пароли не совпадают');
        setPasswordRepeatWarning('Пароли не совпадают');
      }

      const formIsValid: boolean =
          emailIsValid &&
          !!password &&
          !!passwordRepeat &&
          !emailWarning &&
          !passwordWarning &&
          !passwordRepeatWarning

      if (!formIsValid) {
        return
      } else {
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
        setEmailWarning('');
        setPasswordWarning('');
        setPasswordRepeatWarning('');

        setFormInfo('Регистрация прошла успешно. Теперь вы можете войти в личный кабинет')
        setFormType('entry')
        console.log({email: email, password: password});
      }
    } else if (formType === 'entry') {

      if (email && password) {
        setFormInfo('Вход выполнен успешно')
        setEmail('');
        setPassword('');
      } else {
        if (!email) {
          setEmailWarning('Вы не ввели email');
        }
        if (!password) {
          setPasswordWarning('Вы не ввели пароль');
        }
      }
    } else {
      if (email) {
        const emailIsValid = validateEmail(email);

        if (emailIsValid) {
          setFormInfo('Письмо с инструцией по восстановлению пароля выслано на указанную почту')
          setEmail('');
        } else {
          setEmailWarning('Неправильный формат email');
        }
      } else {
        setEmailWarning('Вы не ввели email');
      }
    }
  }

  return (
      <form id="login-form" className="form" onSubmit={submitForm}>
        <p className="form__info">{formInfo}</p>
        <div className="form__field">
          <input
              type="email"
              id="login-form__email"
              className="form__input"
              style={{backgroundImage: `url(${window.location.origin}/icon-email.svg)`, backgroundPosition: '8px 14px'}}
              autoComplete="email"
              value={email}
              onInput={handleEmailInput}
          />
          <label htmlFor="login-form__email" className="form__label"
                 style={email ? {top: '-15px', left: '6px'} : {}}>
            E-mail
            <sup
                className="form__required-mark"
                style={formType === 'registration' ? {visibility: 'visible'} : {visibility: 'hidden'}}
            > *</sup>
          </label>
          <div
              className="form__warning-message"
              style={emailWarning ? {visibility: 'visible'} : {visibility: 'hidden'}}
          >
            {emailWarning}
          </div>
        </div>
        <div className="form__field" hidden={formType === 'restore'}>
          <input
              type="password"
              id="login-form__password_new"
              className="form__input"
              style={{backgroundImage: `url(${window.location.origin}/icon-lock.svg)`, backgroundPosition: '9px 12px'}}
              value={password}
              onInput={handlePasswordInput}
          />
          <label htmlFor="login-form__password_new" className="form__label"
                 style={password ? {top: '-15px', left: '6px'} : {}}>
            Пароль
            <sup
                className="form__required-mark"
                style={formType === 'registration' ? {visibility: 'visible'} : {visibility: 'hidden'}}
            > *</sup>
          </label>
          <div
              className="form__warning-message"
              style={passwordWarning ? {visibility: 'visible'} : {visibility: 'hidden'}}
          >
            {passwordWarning}
          </div>
        </div>
        <div className="form__field" hidden={formType !== 'registration'}>
          <input
              type="password"
              id="login-form__password_repeat"
              className="form__input"
              style={{backgroundImage: `url(${window.location.origin}/icon-lock.svg)`, backgroundPosition: '9px 12px'}}
              value={passwordRepeat}
              onInput={handlePasswordRepeatInput}
          />
          <label htmlFor="login-form__password_repeat" className="form__label"
                 style={passwordRepeat ? {top: '-15px', left: '6px'} : {}}>
            Повторите пароль
            <sup className="form__required-mark"
                 style={formType === 'registration' ? {visibility: 'visible'} : {visibility: 'hidden'}}
            > *</sup>
          </label>
          <div
              className="form__warning-message"
              style={passwordRepeatWarning ? {visibility: 'visible'} : {visibility: 'hidden'}}
          >
            {passwordRepeatWarning}
          </div>
        </div>
        <div className="form__btn_restore"
             style={formType === 'entry' ? {visibility: 'visible'} : {visibility: 'hidden'}}
             onClick={() => changeFormType('restore')}
        >Забыли пароль?
        </div>
        <button
            type="submit"
            form={"login-form"}
            id="login-form__btn_submit"
            className="form__btn_submit"
        >
          <span>{formType === 'registration' ? "ЗАРЕГИСТРИРОВАТЬСЯ" : formType === 'entry' ? 'ВОЙТИ' : 'ОТПРАВИТЬ'}</span>
          <span className="form__btn_submit_background"></span>
        </button>
        <p className="form__btn_change-type">
          <span hidden={formType !== 'registration'} onClick={() => changeFormType('entry')}>Уже есть аккаунт?</span>
          <span hidden={formType !== 'entry'} onClick={() => changeFormType('registration')}>Нет аккаунта?</span>
        </p>
      </form>
  );
}