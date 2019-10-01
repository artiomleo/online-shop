import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import blue from "@material-ui/core/colors/blue";
import Login from "../login/login.jsx";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import IntegrationAutosuggest from "../../pages/home/searchbar/searchbar.jsx";
import { Grid } from "@material-ui/core";
import "./header.css";

const primary = blue[500]; // #F44336

const logo = require("../../images/intercoopLogo.jpg");

const styles = theme => ({
  root: {
    width: "100%"
  },
  appbar: {
    backgroundColor: "white",
    color: "#0080c5",
    position: "fixed"
  },
  grow: {
    float: "left",
    margin: "0 20px",
    cursor: "pointer",
    padding: "10px 0"
  },
  link: {
    color: "#0080c5"
  },
  media: {
    height: "50px",
    width: "200px",
    backgroundImage: "url(" + logo + ")",
    float: "left",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down('xs')]: {
     display:"none",
    },
    //paddingTop: '56.25%', // 16:9,
    //marginTop:'30'
  },
  login: {},
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  loginButton: {
    // position: "absolute",
    right: "50px"
  },
  search: {
    zIndex: "2000",
    borderRadius: theme.shape.borderRadius,
    top: "0px",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "250px"
    }
  },  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    // position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  avatar: {
    margin: 10
  },
  cart: {
    //position:"absolute",
    right: "410px",
    top: 0,
    lineHeight: "65px"
  },

  orangeAvatar: {
    color: "#fff",
    backgroundColor: "#f4dc42",
    position: "",
    right: "",
    marginTop: ""
  },
  toolbar: {
    marginLeft: "10%",
    [theme.breakpoints.down("xs")]: {
      marginLeft:"0",
     
    }
  },
  badge: {
    top: "-5px",
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  },
  adminPop: {
    marginTop: "50px"
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      badge: 0
    };
  }
  state = {
    auth: true,
    anchorEl: null
  };

  handleLogoutPopup = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLogoutPopupClose = () => {
    this.setState({ anchorEl: null });
  };
  

  logout = () => {
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    localStorage.removeItem("username");
    window.location.assign("/");
    //    window.location.assign( '/' );
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleHome = () => {
    window.location.assign("/");
  };
  handleAboutUs = () => {
    window.location.assign("/AboutUs");
  };

  handleCartMenu = () => {
    window.location.assign("/cart");
  };

  handleMyAccClick = () => {
    window.location.assign("/account");
  };

  handleLoginButton = () => {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    // const label = sessionStorage.getItem( 'username' ).charAt(0).toUpperCase();
    if (
      sessionStorage.getItem("authToken") === null ||
      sessionStorage.getItem("authToken") === "missing"
    ) {
      return (
        <div>
          <Grid
            item
            container
            xs={6}
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Login />
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid
              item
              xs={6}

            >
              <span className={classes.cart} onClick={this.handleCartMenu}>
                <IconButton aria-label="Cart">
                  {/* <Badge
                badgeContent={4}
                color="primary"
                classes={{ badge: classes.badge }}
              > */}
                  <ShoppingCartIcon />
                  {/* </Badge> */}
                </IconButton>
              </span>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <span
                className="loginWrapper"
                // aria-owns={anchorEl ? 'simple-menu' : undefined}
                // aria-haspopup="true"
                onClick={this.handleLogoutPopup}
              >
                <Avatar className={classes.orangeAvatar}>
                  {sessionStorage
                    .getItem("username")
                    .charAt(0)
                    .toUpperCase()}
                </Avatar>
              </span>
          
            <Menu
              className={classes.adminPop}
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleLogoutPopupClose}
            >
              <MenuItem onClick={this.handleMyAccClick}>Contul meu</MenuItem>
              <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
            </Grid>
          </Grid>
        </div>
      );
    }
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
          <IconButton className={classes.menuButton} color="primary" aria-label="Menu"></IconButton>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item md={8} xs={12}>
                <Link className={classes.link} to={"/"}>
                  <div className={classes.media} />
                </Link>
                <Link className={classes.link} to={"/"}>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.grow}
                  >
                    Home
                  </Typography>
                </Link>
                <Link className={classes.link} to={"/products"}>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.grow}
                  >
                    Products
                  </Typography>
                </Link>
                <Link className={classes.link} to={"/AboutUs"}>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.grow}
                  >
                    About Us
                  </Typography>
                </Link>
              </Grid>
              <Grid
              className="Grid1"
                item
                xs={12}
                container
                md={4}
              >
                  <Grid
                  className="Grid1"
                    item
                    xs={8}
                    x={8}
                  >
                  <IntegrationAutosuggest />
                  </Grid>
                  <Grid
                    className="Grid1"
                    item
                    xs={4}
                    x={4}
                  >
                    {this.handleLoginButton()}
                 </Grid>
                </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
