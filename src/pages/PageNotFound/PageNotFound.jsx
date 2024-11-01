import { PATH } from "@/constant/path";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import saturn from "../../assets/images/saturn.png";
import ufo from "../../assets/images/ufo.png";
import ufo2 from "../../assets/images/ufo2.png";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      {/* UFO Images */}
      <img src={ufo} className="ufo1" />
      <img src={ufo2} className="ufo2" />
      {/* Stars background */}
      <div className="starsBG">
        <div className="container-404">
          <p className="content-404">PAGE NOT FOUND</p>
          <div className="main-404">
            {/* 4 TEXT */}
            <h1 className="head-1">4</h1>
            {/* Saturn image */}
            <img src={saturn} className="saturn" />
            {/* 4 TEXT */}
            <h1 className="head-1">4</h1>
          </div>
          <div className="main2-404">
            {/* TEXT */}
            <p className="oh">UH/OH! You&apos;re lost.</p>
            {/* Button */}
            <Link to={PATH.HOME}>
              <Button size="large" variant="contained" sx={{ color: "#fff" }}>
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Stars background End */}
    </div>
  );
};

export default PageNotFound;
