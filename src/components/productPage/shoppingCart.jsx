import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CartItem from "./productCard/cartItem";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import {
  getProduct,
  addOrder,
  email,
  getUser,
  getDiscount
} from "../../api/requests";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import { MySnackbarContentWrapper } from "../snackbar/snackbar.jsx";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    width: "60%",
    maxWidth: "1000px",
    minWidth: "650px",
    paddingTop: "100px",
    paddingBottom: theme.spacing.unit * 10,
    marginTop: "100px",
    margin: "40px auto  ",
    zIndex: "100"
  },
  submitOrder: {
    width: "60%",
    maxWidth: "1000px",
    margin: "0 auto 50px",
    padding: "30px",
    backgroundImage: "linear-gradient(to left, #f6eeeb, #9ccaf0)"
  },
  item: {
    marginBottom: "20px",
    marginTop: "20px"
  },
  sum: {
    width: "100%",
    height: "100%"
  },
  total: {
    float: "right"
  },
  button: {
    float: "left"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    float: "right"
  }
});

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsSend: [],
      discounts: [],
      userID: [],
      email: "",
      user: [],
      open: false,
      emptyCart: true,
      negativeValues: false,
      message:
        '<style>table,th,td{border:1pxsolidblack;}</style></head><body><tablestyle="width:100%"><tr><th>Nume Produs</th><th>Cantitate</th><th>Pret</th></tr><tr><td>Jill/td><td>10</td><td>50</td></tr><tr><td>Eve</td><td>12</td><td>94</td></tr><tr><td>John</td><td>5</td><td>80</td></tr><tdcolspan="3">Total:   500RON</td></table>'
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
  componentDidMount() {
    const username = sessionStorage.getItem("username");

    getUser({
      username: username
    }).then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          this.setState({ suggestions: res });

          this.setState({ user: res });
          this.setState({ userID: res.id });
        });
      }
    });

    if (localStorage) {
      if (localStorage["cart"] != null) {
        // Get the cart
        this.setState({ emptyCart: false });
        var cart = JSON.parse(localStorage["cart"]);
        var products = [];

        for (let i in cart.cartItem) {

          getProduct({ productName: cart.cartItem[i].product }).then(
            response => {
              if (response.status === 200) {
                response.text().then(response => {
                  var res = JSON.parse(response);
                  res.quantity = cart.cartItem[i].quantity;
                  products.push(res);

                  this.setState({
                    products: [...this.state.products, res]
                  });
                  this.setState({
                    productsSend: [...this.state.productsSend, res]
                  });
                });
              }
            }
          );
        }
      }
    }
    // console.clear();
  }
  handleQuantityUpdate = (quant, id) => {
    var prods = this.state.products;

    for (let i in prods) {
      if (prods[i].id === id.id) prods[i].quantity = quant.quant;
    }
    this.setState({
      productsSend: prods
    });
  };

  handleDelete = id => {
    console.log(id);
    var items = this.state.products;
    var cart = JSON.parse(localStorage["cart"]);
    var newCart = cart.cartItems
    console.log(cart.cartItem[2])
    for (let i in items) {
      if (items[i].id === id.id) {
        
        items.splice(i, 1);
        cart.cartItem.splice(i,1)
      }
    }

    this.setState({
      products: items
    });
    localStorage.setItem("cart", JSON.stringify(cart));

  };

  addOrder = () => {
    var prods = this.state.products;
    for (let i in prods) {
      if (prods[i].quantity <= 0) {
      this.setState({open:true,emptyCart:true})
      } else {
        getDiscount({ userId: this.state.userID })
        .then(response => {
          if (response.status === 200) {
            response.text().then(response => {
              var res = JSON.parse(response);
              this.setState({ discounts: res });
            });
          }
        })
        .then(() => {
          if(this.state.negativeValues === true)
          return
          const cartItems = this.state.productsSend;
          const discounts = this.state.discounts;
          if (this.state.products && this.state.products.length !== 0) {
            var orderItem = [];
            for (let i in cartItems) {
              var discount = 1;
              for (let j in discounts) {
                console.log(discounts[j]);
  
                if (cartItems[i].id === discounts[j].productId) {
                  discount = discounts[j].value;
                  console.log("discount", discount);
                }
              }
              orderItem[i] = {
                prodId: cartItems[i].id,
                name: cartItems[i].name,
                quantity: cartItems[i].quantity,
                price: cartItems[i].price,
                discount: discount
              };
              console.log("order:", orderItem);
            }
  
            addOrder(orderItem).then(result => {
              if (result.status === 200) {
                localStorage.removeItem("cart");
                this.setState({ products: [] });
                this.setState({ open: true });
                this.setState({ emptyCart: false });

              }
            });
          } else {
            this.setState({ emptyCart: true });
            this.setState({ open: true });
          }
          email({
            email: this.state.user.email,
            subject: "Confirmare plasare comanda",
            message: this.state.message
          }).then(result => {
            if (result.status === 200) {
            } else if (result.status === 400) {
            } else if (result.status === 401) {
            }
          });
        });
      }
    }
    
  };

  getTotal = () => {
    var prods = this.state.products;
    var sum = 0;
    for (let i in prods) sum += prods[i].price * prods[i].quantity;
    if (sum > 0)
    return sum;
    else return 0
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.root} elevation={3}>
          {this.state.products.map((row, idx) => (
            <div className={classes.item} key={idx}>
              <CartItem
                idProp={row.id}
                imgProp={row.image}
                titleProp={row.name}
                quantityProp={row.quantity}
                priceProp={row.price}
                onQuantChange={this.handleQuantityUpdate}
                onDelete={this.handleDelete}
              />
            </div>
          ))}
        </Card>
        <Card className={classes.submitOrder} elevation={1} component="div">
          <div className={classes.sum}>
            <Typography
              className={classes.total}
              component="h5"
              variant="h5"
              color="secondary"
            >
              Total: {this.getTotal()} RON
            </Typography>
            <div className={classes.send}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.addOrder}
              >
                Trimite comanda
                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                <Icon className={classes.rightIcon}>send</Icon>
              </Button>
            </div>
          </div>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.state.emptyCart === false ? "success" : "error"}
            message={
              this.state.emptyCart === false
                ? "Comanda adaugata cu succes"
                : "A intervenit o eroare"
            }
          />
        </Snackbar>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withStyles(styles)(ShoppingCart);
