import CustomButton from "@/components/Button/button";
import CustomInput from "@/components/InputText/InputText";

const LoginForm = ({ handleLogin }) => {
  return (
    <>
      {/* Login form */}
      <form className="sign-in-form">
        <h2 className="title">Sign in</h2>
        {/* Add your login input fields here */}
          <CustomInput type="text" placeholder="Username" iconClass="fas fa-user" />
          <CustomInput type="password" placeholder="Password" iconClass="fas fa-lock" />
        {/* Add your login logic here */}
        <CustomButton text="Login" onClick={handleLogin} />
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
    </>
  );
};

export default LoginForm;
