import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { login } from "../../api/requests.js";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "./login.css";

export default class Login extends React.Component {
  state = {
    open: false,
    errorMsg: "",
    username: "",
    password: "",
    logged: ""
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      errorMsg: ""
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRegisterButton = () => {};

  onChangeUsername(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  onChangePassword(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  loginButton(e) {
    e.preventDefault();
    login({
      username: this.state.username,
      password: this.state.password
    }).then(result => {
      if (result.status === 200) {
        result.text().then(result => {
          const response = JSON.parse(result);
          sessionStorage.setItem("authToken", response.token);
          sessionStorage.setItem("username", this.state.username);
          
          window.location.assign("/");
        });
      } else if (result.status === 400) {
        this.setState({ errorMsg: "Username sau parola gresite" });
      } else if (result.status === 401) {
        this.setState({ errorMsg: "Username sau parola gresite" });
      }
    });
  }

  render() {
    return (
      <div>
        <IconButton
          //  aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleClickOpen}
          color="primary"
          //  className={classes.loginButton}
        >
          <AccountCircle />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={e => this.loginButton(e)}>
            <DialogTitle id="form-dialog-title">Log in</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Introduceti credentialele pentru logare
                <br />
                <br />
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                type="text"
                fullWidth
                onChange={evt => {
                  this.onChangeUsername(evt);
                }}
              />
              <TextField
                margin="dense"
                id="Password"
                label="Password"
                type="password"
                fullWidth
                onChange={evt => {
                  this.onChangePassword(evt);
                }}
              />
              <p style={{ color: "red", fontSize: "12px" }}>
                {this.state.errorMsg}
              </p>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Login
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}
