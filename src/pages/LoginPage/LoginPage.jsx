
import { useEffect } from "react";
import { toggleSignInUpMode } from "../../assets/js/toggleSignInUpMode";
import LoginForm from "./../LoginPage/LoginForm";
import RegisterForm from "./../LoginPage/RegisterForm";
import PanelTransition from "./PanelsTransition";

const LoginPage = () => {
  useEffect(() => {
    const transitionCSS = toggleSignInUpMode();
    return () => {
      if (transitionCSS) transitionCSS();
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
        <PanelTransition />
      </div>
    </>
  );
};

export default LoginPage;
