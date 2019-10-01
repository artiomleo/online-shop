import React from "react";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
const images = require.context("../../../../public/upload", true);
const styles = theme => ({
  card: {
    width: "320px",
    height: "200px",
    margin: "10px ",
    fontWeight:"300",
    padding: "20px",
    position: "relative",
    display: "inline-block",
    textAlign:"left",
    background:"linear-gradient(135deg, #fff8f4 30%,#b6dffa 100%)",
    background:"-moz-linear-gradient(-70deg, #fff8f4 30%,#b6dffa 100%)",
    background:"-webkit-linear-gradient(-70deg, #fff8f4 30%,#b6dffa 100%)"
  },
  cardWraper: {
    display: "inline-block",
    perspective: "2px",
  },
  media: {
    float: "left",
    height: "150px",
    marginLeft: "-20px"
    //width: "40%" // 16:9
  },
  description: {
    marginTop: "20px",
    fontSize: "14px"
  },
  cardTitle: {},
  moreInfo: {
    position: "fixed",
    bottom: "30px",
    right: "20px"
  },
  productImage:{
    height:"150px",
  }
});

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: ""
    };
    this._myHandler = this._myHandler.bind(this);
  }

  _myHandler(props) {
    this.setState({ image: this.props.imgProp });
  }

  render() {
    const { classes, imgProp } = this.props;
    const path = imgProp;
    const img = images(`./${path}` || "");

    return (
      <div className={classes.cardWraper}>
        <Card className={classes.card}>
        <div className={classes.media}>
        <img  className={classes.productImage} src={img} alt="" />

        </div>

          <Typography
            className={classes.cardTitle}
            component="h5"
            variant="h5"
            color="primary"
          >
            {this.props.titleProp}
          </Typography>
          <Typography className={classes.description} component="p" variant="p">
            {this.props.shortDescriptionProp}
          </Typography>
          <Link to={`product/${this.props.titleProp}`}>
            <Button
              onClick={this.handleMore}
              className={classes.moreInfo}
              size="medium"
              color="primary"
            >
              Afla mai mult
            </Button>
          </Link>
        </Card>
      </div>
    );
  }
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  imgProp: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductCard);
