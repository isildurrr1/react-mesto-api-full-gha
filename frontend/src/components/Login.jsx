import AuthForm from "./AuthForm";
const Login = ({handleLogin, formValue}) => {
  return(
    <div className="auth__container">
      <h3 className="auth__title">Вход</h3>
      <AuthForm buttonText="Войти" onSubmit={handleLogin}/>
    </div>
  );
}

export default Login;