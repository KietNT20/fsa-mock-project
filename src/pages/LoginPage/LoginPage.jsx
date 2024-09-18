import { useEffect } from "react";
import { toggleSignInUpMode } from "../../assets/js/toggleSignInUpMode";
import CustomButton from "../../components/Button/CustomButton";
import loginIcon from "./../../assets/LoginAsset/login.svg";
import regIcon from "./../../assets/LoginAsset/reg.svg";
import LoginForm from "./../LoginPage/LoginForm";
import RegisterForm from "./../LoginPage/RegisterForm";
// import "./LoginPage.css";

const LoginPage = () => {
  const handleLogin = () => {
    // handle login logic here
    console.log("login button clicked");
  };

  const handleRegister = () => {
    // handle registration logic here
    console.log("register button clicked");
  };

  useEffect(() => {
    const cleanup = toggleSignInUpMode();

    // cleanup function when component unmounts
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            {/* login form */}
            <LoginForm handleLogin={() => handleLogin()} />
            {/* register form */}
            <RegisterForm handleRegister={() => handleRegister()} />
          </div>
        </div>
        {/* panels transition for login and register */}
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>new here ?</h3>
              <p>
                if you don&apos;t have an account yet, please click the sign up
                button to create a new account and start enjoying our amazing
                features!
              </p>
              {/* sử dụng custom button với id và className "btn" và thêm class "transparent" */}
              <CustomButton
                text="sign up"
                id="sign-up-btn"
                className="btn"
                additionalClass="transparent"
              />
            </div>
            <img src={loginIcon} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>one of us ?</h3>
              <p>
                if you already have an account, please click the sign in button
                to log in!
              </p>
              {/* sử dụng custom button với id và className "btn" và thêm class "transparent" */}
              <CustomButton
                text="sign in"
                id="sign-in-btn"
                className="btn"
                additionalClass="transparent"
              />
            </div>
            <img src={regIcon} className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
