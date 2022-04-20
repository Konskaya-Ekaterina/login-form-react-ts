import {useState, ChangeEvent, FormEvent} from 'react';
import './LoginForm.scss'

export default function LoginForm() {
  const [formType, setFormType] = useState('registration');
  const [formInfo, setFormInfo] = useState('Введите свой email и придумайте пароль');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [emailWarning, setEmailWarning] = useState('.');
  const [passwordWarning, setPasswordWarning] = useState('.');
  const [passwordRepeatWarning, setPasswordRepeatWarning] = useState('.');

  const passwordNewInput = document.documentElement.querySelector('#login-form__password_new')
  const passwordRepeatInput = document.documentElement.querySelector('#login-form__password_repeat')
  const iconPasswordNew = document.documentElement.querySelector('#icon__password_new')
  const iconPasswordRepeat = document.documentElement.querySelector('#icon__password_repeat')

  function validateEmail(email: string): boolean {
    const regexp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
  }

  function changeFormType(type: string): void {
    setEmail('');
    setPassword('');
    setPasswordRepeat('');
    setEmailWarning('.');
    setPasswordWarning('.');
    setPasswordRepeatWarning('.');
    passwordNewInput?.setAttribute('type', 'password')
    iconPasswordNew?.classList.remove('form__icon_show-password_active')
    passwordRepeatInput?.setAttribute('type', 'password')
    iconPasswordRepeat?.classList.remove('form__icon_show-password_active')

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
    setEmailWarning('.');
  }

  function handlePasswordInput(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value.toString());
    setPasswordWarning('.');
    setPasswordRepeatWarning('.');
  }

  function handlePasswordRepeatInput(event: ChangeEvent<HTMLInputElement>): void {
    setPasswordRepeat(event.target.value.toString());
    setPasswordWarning('.');
    setPasswordRepeatWarning('.');
  }

  function submitForm(event: FormEvent): void {
    event.preventDefault();

    if (formType === 'registration') {
      const emailIsValid = validateEmail(email);

      if (!email) {
        setEmailWarning('Вы не ввели email');
      } else if (!emailIsValid) {
        setEmailWarning('Неправильный формат email');
      }

      if (password.length < 8) {
        setPasswordWarning('Пароль должен содержать минимум 8 символов');
      }

      if (passwordRepeat && password !== passwordRepeat) {
        setPasswordWarning('Пароли не совпадают');
        setPasswordRepeatWarning('Пароли не совпадают');
      }

      if (password && !passwordRepeat) {
        setPasswordRepeatWarning('Введите пароль повторно');
      }

      const formIsValid: boolean =
          !!email &&
          emailIsValid &&
          !!password &&
          !!passwordRepeat &&
          password === passwordRepeat

      if (!formIsValid) {
        return
      } else {
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
        setEmailWarning('.');
        setPasswordWarning('.');
        setPasswordRepeatWarning('.');
        passwordNewInput?.setAttribute('type', 'password')
        iconPasswordNew?.classList.remove('form__icon_show-password_active')
        passwordRepeatInput?.setAttribute('type', 'password')
        iconPasswordRepeat?.classList.remove('form__icon_show-password_active')

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
          setFormType('entry')
          setTimeout(() => {
            setFormInfo('Введите свои логин и пароль')
          }, 3000)
          setEmail('');
        } else {
          setEmailWarning('Неправильный формат email');
        }
      } else {
        setEmailWarning('Вы не ввели email');
      }
    }
  }

  function showPassword(passType: string): void {
    let inputElement
    let iconElement

    if (passType === 'password') {
      inputElement = passwordNewInput
      iconElement = iconPasswordNew
    } else {
      inputElement = passwordRepeatInput
      iconElement = iconPasswordRepeat
    }

    const initialType = inputElement?.getAttribute('type')
    if (initialType === 'password') {
      inputElement?.setAttribute('type', 'text')
      iconElement?.classList.add('form__icon_show-password_active')
    } else {
      inputElement?.setAttribute('type', 'password')
      iconElement?.classList.remove('form__icon_show-password_active')
    }
  }

  return (
      <form noValidate={true} autoComplete='off' id="login-form" className="form" onSubmit={submitForm}>
        <p className="form__info">{formInfo}</p>
        <div
            className='form__fields'
            style={formType === "registration" ? {minHeight: '230px', maxHeight: '230px'} :
                formType === 'entry' ? {minHeight: '140px', maxHeight: '140px'} :
                    {minHeight: '55px', maxHeight: '55px'}}
        >
          <div className="form__field">
            <input
                type="email"
                id="login-form__email"
                className="form__input"
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
                style={emailWarning !== '.' ? {visibility: 'visible'} : {visibility: 'hidden'}}
            >
              {emailWarning}
            </div>
          </div>
          <div className="form__field" hidden={formType === 'restore'}>
            <input
                type="password"
                id="login-form__password_new"
                className="form__input"
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
            <div className={'form__icon_show-password'}
                 id="icon__password_new"
                 onClick={() => showPassword('password')}
            ></div>
            <div
                className="form__warning-message"
                style={passwordWarning !== '.' ? {visibility: 'visible'} : {visibility: 'hidden'}}
            >
              {passwordWarning}
            </div>
          </div>
          <div className="form__field" hidden={formType !== 'registration'}>
            <input
                type="password"
                id="login-form__password_repeat"
                className="form__input"
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
            <div className={'form__icon_show-password'}
                 id='icon__password_repeat'
                 onClick={() => showPassword('password-repeat')}
            ></div>
            <div
                className="form__warning-message"
                style={passwordRepeatWarning !== '.' ? {visibility: 'visible'} : {visibility: 'hidden'}}
            >
              {passwordRepeatWarning}
            </div>
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