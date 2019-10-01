import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import logo from "../../images/pdf.png";
import { getProduct, downloadPdf } from "../../api/requests.js";
import Snackbar from '@material-ui/core/Snackbar';
import {
  MySnackbarContentWrapper
} from "../snackbar/snackbar.jsx";
import "./productPage.css"



const styles = theme => ({
  card: {
    maxWidth: 350,
    margin: "10px ",
    padding: "20px",
    position: "relative",
    display: "inline-block"
  },
  root: {
    width: "60%",
    padding: "140px 80px 80px 80px",
    margin: "20px auto",

  },
  cardWraper: {
    display: "inline-block"
  },
  media: {
    float: "left",
    height: "300px",
    paddingTop: "",
    margin: "30px"
  },
  pdfIcon: {
    height: "20px",
    marginRight: "10px"
  },
  pdfWrapper: {
    marginTop: "10px",
    fontSize: "14px",
    cursor: "pointer",
    display:"flex",
    flexDirection:"row",
    justifyContent:"flexStart"
  },  
  productWrapper: {
    width: "100%",
    fontSize:"15px"
  },
  dialogContent: {
    textAlign: "left"
  },
  description: {
    marginTop: "20px"
  },
  cardTitle: {},
  addOrderBtn: {},
  moreInfo: {
    position: "absolute",
    bottom: "20px",
    right: "20px"
  },
  warn: {
    color: "red"
  },
  submitProductWrapper: {
    paddingTop: "20px",
    float: "right",
    display:"flex",
    width:"100%",
    flexDirection:"row",
    justifyContent:"flex-end",
    itemsAlign:"center",
    flexWrap:"wrap"
  },
  submitProdBtn: {
    margin: "32px 0 0 32px"
  },
  margin: {
    margin: theme.spacing.unit,
    position:"fixed",
    bottom:"20px",
    left:"20px"
  },
  flexCol:{

    width:"170px"
  },
  prodPrice:{
    lineHeight:"90px"
  }
});

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.downloadFile = this.downloadFile.bind(this);
    this.handleClose = this.handleClose.bind(this)
    this.descriptionBlock = [];
    this.queue = [];
    this.state = {
      prod: [],
      pdf: [],
      img: "",
      desc: [],
      quantity: "1",
      showdata: this.descriptionBlock,
      open: false,
      addedProds:0,
      emptyCart: false,
      error: false,
      
    };
  }


  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleAddToCart = () => {
    this.setState({addedProds:1})
    console.log(this.state.quantity);
    
    var check = false;
    var cartItem = {
      product: this.state.prod.name,
      quantity: this.state.quantity
    };
    this.setState({quantityAdded:cartItem.quantity})
    // Check for localStorage
    if (localStorage && this.state.quantity.match(/^[0-99999]+$/) != null) {
      if (localStorage["cart"] != null) {
        // Get the cart
        var cart = JSON.parse(localStorage["cart"]);
        console.log("cart", cart.cartItem);
        var find = 0;
        for (let i in cart.cartItem) {
          if (cart.cartItem[i].product === this.state.prod.name) {
            cart.cartItem[i].quantity = cartItem.quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            check = true;
            

            find = 1;
          }
          
        }
        if (find === 0) {
          cart.cartItem.push(cartItem);
          localStorage.setItem("cart", JSON.stringify(cart));
          check = true;

        }
      } else {
        let cart = {};
        cart.cartItem = [];
        cart.cartItem.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        check = true;
      }
    } else {
      console.log("localStorage not detected, cannot get cart.");
    }
    
    if(check) {
    this.setState({open:true})
    this.setState({emptyCart:false})
    }

    // };
  };

  downloadFile(e) {
    var file = e;
    console.log(e.currentTarget);
    downloadPdf({
      filename: file
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file);
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleQuantity = e => {
    e.preventDefault();
    if(e.target.value < 0 ) {
    this.setState({ error: true });
    // this.setState({ quantity: 1 });
      console.log("warn");
      this.setState({addedProds:0})

    this.setState({ emptyCart: true });
    this.setState({ open: true });
    
    } else {
    this.setState({ error: false });
    this.setState({ quantity: e.target.value });
    }
  };

  renderDescription() {
    const description = this.state.desc;
    var dataToReder = [];
    for (var i = 0; i < description.length; i++) {
      var content = description[i].text;
      let type = description[i].type;
      let inlineRanges = [];

      if (description[i].inlineStyleRanges !== undefined) {
        for (var j = 0; j < description[i].inlineStyleRanges.length; j++) {
          inlineRanges[j] = description[i].inlineStyleRanges[j].style;
        }
      }

      switch (type) {
        case "unstyled":
          let styleT = "p";
          let indentT = "p";
          let styleClass = "black";
          for (var k = 0; k < inlineRanges.length; k++) {
            if (inlineRanges[k] === "RED") {
              styleClass = "red";
            }
            if (inlineRanges[k] === "BOLD") {
              indentT = "b";
              styleClass = "primary";
            }
            if (inlineRanges[k] === "ITALIC") {
              indentT = "i";
            }
            if (inlineRanges[k] === "UNDERLINE") {
              indentT = "u";
            }
          }
          dataToReder.push(
            <div>
              <Typography
                className={""}
                component={`${indentT}`}
                variant={`${styleT}`}
                color="primary"
                style={{ color: styleClass }}
              >
                {content}
              </Typography>
              <br />
            </div>
          );
          break;
        case "unordered-list-item":
          let listItems = [];

          let counter = 0;
          for (var l = i; l < description.length; l++) {
            var listContent = description[l].text;
            var type1 = description[l].type;
            if (type1 === "unordered-list-item") {
              listItems.push(listContent);
              counter++;
            } else {
              break;
            }
          }
          i = i + counter - 1;
          dataToReder.push(
            <Typography component="p" variant="p" color="black">
              <ul>
                {listItems.map((idx, row) => (
                  <li key={idx}>{listItems[row]}</li>
                ))}
              </ul>
            </Typography>
          );

          listItems = [];
          break;
        default:
          break;
      }
    }
    return <div>{dataToReder}</div>;
  }
  componentWillMount() {
    var l = this.props.location.pathname;
    var c = l.replace("/product/", "");
    getProduct({ productName: c }).then(res => {
      if (res.status === 200) {
        res.text().then(res => {
          var prod = JSON.parse(res);
          this.setState({ prod: prod });
          const img = require(`../../../public/upload/${prod.image}`);
          this.setState({ img: img });
          this.setState({ desc: prod.description });
          this.setState({ pdf: prod.pdf });
        });
      } else if (res.status === 400) {
        window.location.assign("/");
      }
    });
    console.clear();
  }
  

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.root + " cardProduct"} elevation={2}>
          <Typography
            className={classes.cardTitle}
            component="h4"
            variant="h4"
            color="primary"
          >
            {this.state.prod.name}
          </Typography>
          <div className={classes.productWrapper}>
            <img className={classes.media} src={this.state.img} alt="" />
            <br />
            {this.renderDescription()}

            {this.state.pdf.map((idx, row) => (
              <div className={classes.pdfWrapper} key={row}>
                <img className={classes.pdfIcon} src={logo} alt="" />
                <Typography
                  onClick={e => {
                    this.downloadFile(this.state.pdf[row]);
                  }}
                  component="p"
                  style={{ lineHeight: "20px" }}
                  variant="p"
                  color="primary"
                  className={classes.pdfDescription}
                >
                  {this.state.pdf[row]}
                </Typography>
              </div>
            ))}

            {
              (sessionStorage.getItem("authToken") === null ||
              sessionStorage.getItem("authToken") === "missing" )? <br/> :(
            <div className={classes.submitProductWrapper}>
            <div className = {classes.flexCol} >
            <Typography
              className={classes.prodPrice}
              component="h5"
              variant="h5"
              color="secondary"
            >Pret: 
             {this.state.prod.price +" "+"RON"}
            </Typography>
            </div>
            <div className = {classes.flexCol} >

              <TextField
                id="standard-number"
                label="Cantitate:"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                defaultValue={1}
                className={classes.textField}
                margin="normal"
                onChange={this.handleQuantity}
                error={this.state.error}
              />
              </div>
              <div className = {classes.flexCol} >

              <Button
                variant="outlined"
                className={classes.submitProdBtn}
                color="primary"
                onClick={this.handleAddToCart}
              >
                Adauga in Cos
              </Button>
              </div>
            </div>)}
          </div>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.state.emptyCart === false ? "success" : "error"}
            message={this.state.addedProds ? ` x${this.state.quantityAdded} buc. ${this.state.prod.name} in cos` : "A intervenit o eroare"}
          />
        </Snackbar>
      </div>
    );
  }
}

ProductPage.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ProductPage);
