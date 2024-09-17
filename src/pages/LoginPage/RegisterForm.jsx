import CustomButton from '../../components/Button/CustomButton';
import CustomInput from '../../components/InputText/CustomInput';

const RegisterForm = ({ handleRegister }) => {
  return (
    <>
      <form className="sign-up-form">
        <h2 className="title">Sign up</h2>
        {/* sử dụng component CustomInput */}
        <CustomInput
          type="text"
          placeholder="Username"
          iconClass="fas fa-user"
        />
        <CustomInput
          type="email"
          placeholder="Email"
          iconClass="fas fa-envelope"
        />
        <CustomInput
          type="password"
          placeholder="Password"
          iconClass="fas fa-lock"
        />

        {/* sử dụng component CustomButton với className mặc định là 'btn' */}
        <CustomButton text="Sign up" onClick={handleRegister} />

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
    </>
  );
};

export default RegisterForm;
