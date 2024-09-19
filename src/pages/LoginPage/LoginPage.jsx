import { Typography } from "@mui/material";
import { useEffect } from "react";
import { toggleSignInUpMode } from "../../assets/js/toggleSignInUpMode";
import CustomButton from "../../components/Button/CustomButton";
import loginIcon from "./../../assets/LoginAsset/login.svg";
import regIcon from "./../../assets/LoginAsset/reg.svg";
import LoginForm from "./../LoginPage/LoginForm";
import RegisterForm from "./../LoginPage/RegisterForm";

const LoginPage = () => {
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
            <LoginForm />
            {/* register form */}
            <RegisterForm />
          </div>
        </div>
        {/* panels transition for login and register */}
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <Typography
                variant="h3"
                component="h2"
                className="title"
                sx={{ color: "#fff" }}
              >
                NEW HERE ?
              </Typography>
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
              <Typography
                variant="h3"
                component="h2"
                className="title"
                sx={{ color: "#fff" }}
              >
                ONE OF US ?
              </Typography>
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
