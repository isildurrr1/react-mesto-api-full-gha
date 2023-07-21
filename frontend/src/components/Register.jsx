import AuthForm from "./AuthForm";
const Register = ({handleRegister, formValue, setFormValue}) => {
  return(
    <div className="auth__container">
      <h3 className="auth__title">Регистрация</h3>
      <AuthForm buttonText="Зарегистрироваться" onSubmit={handleRegister}/>
      <a href="/sign-in" className="auth__link">Уже зарегистрированы? Войти</a>
    </div>
  );
}

export default Register;