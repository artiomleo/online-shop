import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import UserManager from "./scenes/userManager";
import AuditManager from "./scenes/auditManager";
import AlertManager from "./scenes/alertManager";
import SettingsManager from "./scenes/settingsManager";
import MyEditor from "./scenes/productManager.jsx";
import { checkPermision } from '../../api/requests';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  materialIcons: {
    fontFamily: "Material Icons",
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: "24px" /* Preferred icon size */,
    display: "inline-block",
    lineHeight: "1",
    textTransform: "none",
    letterSpacing: "normal",
    wordWrap: "normal",
    whiteSpace: "nowrap",
    direction: "ltr"
  },
  product: {
    width: "70%"
  },
  paper: {
    padding: "20px"
  },
  editor: {
    padding: "10px",
    // width:"100%",
    marginBottom: "50px"
  },
  fab: {
    margin: theme.spacing.unit,
    float: "right"
  }
});

class AdminComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsData: []
    };
    this.handleDetails = this.handleDetails.bind(this);
  }
  state = {
    open: false,
    scene: ""
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleUserButton = () => {
    this.setState({ scene: "user" });
  };
  handleProductButton = () => {
    this.setState({ scene: "product" });
  };
  handleAuditButton = () => {
    //this.setState({ scene: "audit" });
  };
  handleAlertButton = () => {
    this.setState({ scene: "alert" });
  };
  handleSettingsButton = () => {
    this.setState({ scene: "settings" });
  };
  handleDetails = () => {
    this.setState({ detailsData: this.state.editorState });
  };

  componentWillMount(){
    checkPermision().then(res=>{
        if(res.status !== 200)
        window.location.assign("/")
    })
  }

  handleScene = () => {
    const { classes } = this.props;
    if (this.state.scene === "user") {
      return <UserManager />;
    } else if (this.state.scene === "product") {
      return (
        <div className={classes.product}>
          <MyEditor onChange={this.handleDetails} />
        </div>
      );
    } else if (this.state.scene === "audit") {
      return (
        <div>
          <AuditManager />
        </div>
      );
    } else if (this.state.scene === "alert") {
      return <AlertManager />;
    } else if (this.state.scene === "settings") {
      return <SettingsManager />;
    }
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem onClick={this.handleUserButton} button key={"but1"}>
              <ListItemIcon>
                <i className="material-icons">people</i>
              </ListItemIcon>
              <ListItemText primary={"Utilizatori"} />
            </ListItem>
            <ListItem onClick={this.handleProductButton} button key={"but2"}>
              <ListItemIcon>
                <i className="material-icons">shopping_basket</i>
              </ListItemIcon>
              <ListItemText primary={"Produs"} />
            </ListItem>
            <ListItem onClick={this.handleAuditButton} button key={"but3"}>
              <ListItemIcon>
                <i className="material-icons">poll</i>
              </ListItemIcon>
              <ListItemText primary={"Audit"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem onClick={this.handleAlertButton} button key={"but4"}>
              <ListItemIcon>
                <i className="material-icons">notifications_active</i>
              </ListItemIcon>
              <ListItemText primary={"Notificari"} />
            </ListItem>
            <ListItem onClick={this.handleSettingsButton} button key={"but5"}>
              <ListItemIcon>
                <i className="material-icons">settings</i>
              </ListItemIcon>
              <ListItemText primary={"Setari"} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          {this.handleScene()}
        </main>
      </div>
    );
  }
}

AdminComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AdminComponent);
