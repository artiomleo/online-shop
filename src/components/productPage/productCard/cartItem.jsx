import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {DeleteOutlined } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from "@material-ui/core/Snackbar";
import { MySnackbarContentWrapper } from "../../snackbar/snackbar.jsx";

import "./cart.css"

const images = require.context("../../../../public/upload", true);

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    width: "70%",
    minWidth:"700px",
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 15,
    margin: "60px auto",
    
  },
  item: {
    minWidth:"620px",
    maxWidth:"1000px",
    height: "200px",
    margin:"auto",
    background:"linear-gradient(135deg, #fff8f4 30%,#b6dffa 100%)",
    background:"-moz-linear-gradient(-70deg, #fff8f4 30%,#b6dffa 100%)",
    background:"-webkit-linear-gradient(-70deg, #fff8f4 30%,#b6dffa 100%)",
    paddingRight:"30px",
    position:"relative"
  },
  photo: {
    maxWidth: 150
  },
  cartItemDescription:{
    padding:"30px 0 0 0"
  },
  media: {
    float: "left",
    height: "200px",
    minWidth: "220px"
  },
  name: {
    width: "210px",
    float: "left"
  },
  quantity: {
    width: "100px",
    float: "left"
  },
  discount: {
    width: "90px",
    fontSize:"16px"
  },
  textField: {
    margin:0,
    width: 100
  },
  deleteIcon:{
    position:"absolute",
    right:"10px",
    top:"10px"
  }
});

class CartItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      quant:this.props.quantityProp,
      openSnack: false,
      emptyCart:false,
    };
    this._myHandler = this._myHandler.bind(this);
  }
  _myHandler(props) {
    this.setState({ image: this.props.imgProp });
  }

  handleCloseSnackBar = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnack: false });

  }

  handleChange = idx => event => {
     var quant = event.target.value
     var id = this.props.idProp
    this.setState({ quant: quant });
    this.props.onQuantChange({quant},{id})

    if(quant < 0) {
      this.setState({ openSnack: true,emptyCart:true });
    }
    console.log(this.state.quant);
  };

  handleDelete = event =>{
    var id = this.props.idProp
    this.props.onDelete({id})
  }
 

  costCalc = () => {};


  

  render() {
    const { classes, imgProp } = this.props;
    const path = imgProp;
    const img = images(`./${path}`);
    return (
      <div >
        <Card className={classes.item} component = "div">
          <img className={classes.media} alt="" src={img} />
          <div className={classes.cartItemDescription}>
          <IconButton onClick={this.handleDelete} className={classes.deleteIcon} aria-label="Delete">
          <DeleteOutlined color="error" >delete</DeleteOutlined>
      </IconButton>
          <Typography
            className={classes.cardTitle}
            component="h5"
            variant="h5"
            color="primary"
          >
            {this.props.titleProp}
          </Typography>
          <div className="cart-item-info">
            <TextField
              label="Cantitate"
              defaultValue={this.props.quantityProp}
              onChange={this.handleChange()}
              InputProps={{ inputProps: { min: 1 ,step :1 } }}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
          
          <div className={classes.discount}>
            {this.props.priceProp} RON
          </div>
         
          <Typography
           
            component="h5"
            variant="h5"
            color="secondary"
          >
          Total: {this.state.quant*this.props.priceProp} RON
          </Typography>
          </div>
          </div>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnack}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackBar}
        >
          <MySnackbarContentWrapper
            onClose={this.handleCloseSnackBar}
            variant={this.state.emptyCart === false ? "success" : "error"}
            message={
              this.state.emptyCart === false
                ? this.state.feature+" "+this.state.option+" cu succes"
                : "A intervenit o eroare"
            }
          />
        </Snackbar>
      </div>
    );
  }
}

CartItem.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  imgProp: PropTypes.object.isRequired
};

export default withStyles(styles)(CartItem);
