import { Typography } from "@mui/material";
import loginIcon from "./../../assets/LoginAsset/login.svg";
import regIcon from "./../../assets/LoginAsset/reg.svg";

const PanelsTransition = () => {
  return (
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
            If you don&apos;t have an account yet, please click the sign up
            button to create a new account and start enjoying our amazing
            features!
          </p>
          <button className="btn transparent" id="sign-up-btn">
            sign up
          </button>
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
            If you already have an account, please click the sign in button to
            log in!
          </p>
          <button className="btn transparent" id="sign-in-btn">
            sign in
          </button>
        </div>
        <img src={regIcon} className="image" alt="" />
      </div>
    </div>
  );
};

export default PanelsTransition;
