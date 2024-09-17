import { useEffect } from 'react';
import { toggleSignInUpMode } from '../../assets/js/toggleSignInUpMode';
import loginIcon from './../../assets/LoginAsset/login.svg';
import regIcon from './../../assets/LoginAsset/reg.svg';
import LoginForm from './LoginForm';
import './LoginPage.css';
import RegisterForm from './RegisterForm';

const LoginPage = () => {
  const handleLogin = () => {
    // Handle login logic here
    console.log('Login button clicked');
  };

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Register button clicked');
  };

  useEffect(() => {
    const cleanup = toggleSignInUpMode();

    // Cleanup function when component unmounts
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            {/* Login form */}
            <LoginForm handleLogin={() => handleLogin()} />
            {/* Register form */}
            <RegisterForm handleRegister={() => handleRegister()} />
          </div>
        </div>
        {/* panels transition for login and register */}
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                If you don&apos;t have an account yet, please click the Sign Up
                button to create a new account and start enjoying our amazing
                features!
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src={loginIcon} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                If you already have an account, please click the Sign In button
                to log in!
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src={regIcon} className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
