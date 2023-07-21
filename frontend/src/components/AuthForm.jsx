import React from "react";
const AuthForm = ({buttonText, onSubmit}) => {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formValue);
  }
  return(
    <form className="auth__form" onSubmit={handleSubmit} noValidate>
      <input type="email" id="email" name="email" className="auth__input" placeholder="Email" value={formValue.email} onChange={handleChange}/>
      <input type="password" id="password" name="password" className="auth__input" placeholder="Пароль" value={formValue.password} onChange={handleChange}/>
      <button className="auth__button" type="submit">{buttonText}</button>
    </form>
  );
}

export default AuthForm;