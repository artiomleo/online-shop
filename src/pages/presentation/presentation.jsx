import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Parallax } from "react-parallax";
import Typography from "@material-ui/core/Typography";
import "./presentation.css";
import { Card } from "@material-ui/core";
const styles = theme => ({
  root: {
    margin: "40px auto"
  },
  account: {
    height: "200px"
  },
  box: {
    height: "300px"
  },
  history: {
    height: "150px"
  },
  settings: {
    height: "150px"
  },
  imgLogo: {
    height: "270px",
    width: "auto"
  },
  footer: {
    backgroundColor: "blue"
  },
  paperWrapper: {
    height: "200px",
    position: "relative"
  },
  infoPaper: {
    height: "300px",
    width: "auto",
    zIndex: "1000",
    position: "absolute",
    left: "50%",
    top:'50%',
    transform: "translate(-50%,-50%)",
    padding: "30px"
  },
  inlineStyles: {
    padding: "20px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  },
  paralaxbox:{
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12),0px -2px 4px 1px rgba(0,0,0,0.2),0px -4px 5px 0px rgba(0,0,0,0.14),0px -1px 10px 0px rgba(0,0,0,0.12)",
  }
});

const image2 =
  "https://images.pexels.com/photos/257279/pexels-photo-257279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

class PresenattionPage extends React.Component {
  state = {
    open: false,
    user: []
  };

  componentDidMount(){
    console.clear();
  }

  render() {
    const { classes } = this.props;
    const img = require("../../images/clean.jpg");
    const img2 = require("../../images/med.jpg");
    const img3 = require("../../images/image1.jpg");
    const img4 = require("../../images/image2.jpg");
    const img5 = require("../../images/image3.jpg");

    return (
      <div className={classes.box}>
        <div style={{ textAlign: "center" }}>
          <Parallax bgImage={img2} strength={200} className={classes.paralaxbox}>
            <div style={{ height: 700 }} className="mainLogo">
              <Typography
                component="h2"
                variant="h2"
                style={{ color: "white" }}
                className={classes.inlineStyles}
              >
                Dezinfectanti profesionali pentru domeniul medical si industrial
              </Typography>
            </div>
          </Parallax>
          <div className={classes.paperWrapper}>
            <Card className={classes.infoPaper}>
              <Typography component="h5" variant="h5" color="primary">
                Dezinfectanti profesionali pentru domeniul medical si industrial
              </Typography>
              <img
                className={classes.imgLogo}
                src={img3}
                alt=""
              />
            </Card>
          </div>

          <Parallax bgImage={image2} strength={200} className={classes.paralaxbox}>
            <div style={{ height: 700 }}>
              <Typography
                component="h2"
                variant="h2"
                color="primary"
                className={classes.inlineStyles}
              >
                Dezinfectanti pentru maini
              </Typography>
            </div>
          </Parallax>
          <div className={classes.paperWrapper}>
            <Card className={classes.infoPaper}>
              <Typography component="h5" variant="h5" color="primary">
                Eficienta impotriva patogenilor
              </Typography>
              <img
                className={classes.imgLogo}
                src={img4}
                alt=""
              />
            </Card>
          </div>
          <Parallax
          className={classes.paralaxbox}
            bgImage={
              "https://www.schuelke.com/media/img/specialty-chemicals/weblication/wThumbnails/Key_visual_Specialty_Chemicals-6911b926ab80530gf4646654f56eb415.jpg"
            }
            blur={{ min: -1, max: 3 }}
          >
            <div style={{ height: 700 }}>
              <Typography
                component="h2"
                variant="h2"
                style={{ color: "white" }}
                className={classes.inlineStyles}
              >
                Performanta importriva microbilor
              </Typography>
            </div>
          </Parallax>

          <div className={classes.paperWrapper}>
            <Card className={classes.infoPaper}>
              <Typography component="h5" variant="h5" color="primary">
                Igiena pe primul loc
              </Typography>
              <img
                className={classes.imgLogo}
                  src={img5}
                alt=""
              />
            </Card>
          </div>
          <Parallax
          className={classes.paralaxbox}
            bgImage={img}
            strength={200}
            renderLayer={percentage => (
              <div>
                <div
                  style={{
                    position: "absolute",
                    background: `rgba(255, 125, 0, ${percentage * 1})`,
                    left: "50%",
                    top: "50%",
                    borderRadius: "50%",
                    transform: "translate(-50%,-50%)",
                    width: percentage * 500,
                    height: percentage * 500
                  }}
                />
                <div style={{ height: 700 }}>
                  <Typography
                    component="h2"
                    variant="h2"
                    style={{ color: "white" }}
                    className={classes.inlineStyles}
                  >
                    Dezinfectarea Suprafetelor
                  </Typography>
                </div>
              </div>
            )}
          />
        </div>
        <footer className={classes.footer + " footer"}>
          <Typography component="h4" variant="h4" color="primary">
            Contact:
          </Typography>
          <Typography
            component="p"
            variant="p"
            color="primary"
            style={{ color: "white", display: "inline-block" }}
          >
            S.C. INTERCOOP S.R.L
            <br />
            Sediu:
            <br />
            Loc. Ernei - 547215, Jud.Mures
            <br />
            Str. Principala nr. 376
            <br />
            <br />
            <br />
            J26/1502/1993
            <br />
            RO4275950
          </Typography>
          <Typography
            component="p"
            variant="p"
            color="primary"
            style={{
              color: "white",
              display: "inline-block",
              marginLeft: "30px"
            }}
          >
            Tel/Fax: +40 265 267 708 <br />
            +40 265 265 569 <br />
            mail: office@intercoop.ro <br />
            www.intercoop.ro <br />
            www.arcana-hygiene.com
          </Typography>
         
          <Typography  component="p"
            variant="p"
            color="primary"
            align="center"
            style={{
              color: "white",
              display: "block",
              marginLeft: "30px",
              padding:"0 20px",
              
            }}>
            
          Copyright © 2019 Intercoop
          </Typography>
          
          
          
        </footer>
      </div>
    );
  }
}

PresenattionPage.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withStyles(styles)(PresenattionPage);
