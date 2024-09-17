import { useEffect } from "react";
import logniIcon from "./../../assets/LoginAsset/login.svg";
import regIcon from "./../../assets/LoginAsset/reg.svg";
import { toggleSignInUpMode } from "./../../js/toggleSignInUpMode";
import "./LoginPage.css";

const LoginPage = () => {
  const handleLogin = () => {
    // Handle login logic here
    console.log("Login button clicked");
  };

  const handleRegister = () => {
    // Handle registration logic here
    console.log("Register button clicked");
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
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              {/* Add your login logic here */}
              <button
                className="btn"
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </button>
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            {/* Register form */}
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              {/* logic button register */}
              <button
                className="btn"
                onClick={() => {
                  handleRegister();
                }}
              >
                Sign up
              </button>
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
        {/* panels transition for login and register */}
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                If you don't have an account yet, please click the Sign Up
                button to create a new account and start enjoying our amazing
                features!
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src={logniIcon} className="image" alt="" />
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
