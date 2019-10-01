import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import { withStyles, FormControl, InputLabel, Select } from "@material-ui/core";
import {
  getUsers,
  register,
  getUser,
  update,
  getProducts,
  addDiscount
} from "../../../api/requests";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import { MySnackbarContentWrapper } from "../../snackbar/snackbar.jsx";
import "./productManager.css";

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: "#0080c5",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const styles = theme => ({
  root: {},

  addUser: {
    cursor: "pointer",
    float: "right",
    backgroundColor: "",
    borderRadius: "50%",
    padding: "8px"
  },
  msgerror: {
    color: "red",
    fontSize: "12px"
  }
});

class Example extends React.Component {
  // state = {
  //     username:'',
  //     name:'',
  //     email:'',
  //     password:'',
  //     id:'',
  //     admin: ''
  //   };

  componentDidMount() {
    getProducts().then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          this.setState({ products: res });

          for (let i = 0; i < res.length; i++) {
            this.setState({
              prodName: [...this.state.prodName, this.state.products[i].name]
            });
          }
        });
      }
    });
    getUsers().then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          this.setState({ suggestions: res });
          for (let i = 0; i < res.length; i++) {
            this.setState({ users: res });
          }
        });
      }
    });
  }

  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: [],
      users: [],
      userFiltered: [],
      user: [],
      products: [],
      prodName: [],
      username: "",
      name: "",
      email: "",
      password: "",
      confpassword: "",
      errors: {},
      fields: {},
      id: "",
      admin: "",
      clientId: "",
      productId: "",
      value: "",
      quantity: "",
      open: false,
      openUpdate: false,
      openUpdateById: false,
      openDiscount: false,
      openSnack: false,
      emptyCart:true,
      feature: '',
      option: ''

    };
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.users.filter(
          lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.name;

  // Use your imagination to render suggestions.
  renderSuggestion(suggestion) {
    // this.setState({
    //     suggestion: name
    // });
    return <div>{suggestion.name}</div>;
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    if(this.state.value.length === 0){
      this.setState({
        suggestions: this.state.users
      });
    }
    
  };

  onChangeUsername(field, evt) {
    let fields = this.state.fields;
    fields[field] = evt.target.value;
    this.setState({
      username: evt.target.value,
      fields
    });
  }

  onChangeName(field, evt) {
    let fields = this.state.fields;
    fields[field] = evt.target.value;
    this.setState({
      name: evt.target.value,
      fields
    });
  }

  onChangeEmail(field, evt) {
    let fields = this.state.fields;
    fields[field] = evt.target.value;
    this.setState({
      email: evt.target.value,
      fields
    });
  }

  onChangePassword(field, evt) {
    let fields = this.state.fields;
    fields[field] = evt.target.value;
    this.setState({
      password: evt.target.value,
      fields
    });
  }
  onChangeConfPassword(field, evt) {
    let fields = this.state.fields;
    fields[field] = evt.target.value;
    this.setState({
      confpassword: evt.target.value,
      fields
    });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //username
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "Camp obligatoriu!";
    }

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Camp obligatoriu!";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z\s]+$/)) {
        formIsValid = false;
        errors["name"] = "Doar litere!";
      }
    }
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Camp obligatoriu";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email invalid!";
      }
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Camp obligatoriu!";
    }
    if (typeof fields["password"] !== "undefined") {
      if (fields["password"].length < 6) {
        formIsValid = false;
        errors["password"] = "Minim 6 caractere!";
      }
    }
    if (!fields["confpassword"]) {
      formIsValid = false;
      errors["confpassword"] = "Camp obligatoriu!";
    }
    if (typeof fields["confpassword"] !== "undefined") {
      if (fields["confpassword"] !== fields["password"]) {
        formIsValid = false;
        errors["confpassword"] = "Parola nu coincide!";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  onChangeAdmin(evt) {
    this.setState({
      admin: evt.target.value
    });
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  handleAddUserOpen = () => {
    this.setState({ open: true });
  };

  handleAddUserClose = () => {
    this.setState({ open: false });
  };

  handleUpdateUserOpen = () => {
    this.setState({ openUpdate: true });
  };

  handleCloseUpdateDiscountOpen = (row) => {
    this.setState({ clientId: row.id });
    this.setState({ openDiscount: true });
  };

  handleCloseUpdateDiscountClose = () => {
    addDiscount({
      clientId: this.state.clientId,
      productId: this.state.productId,
      value: this.state.value/100
    }).then(result => {
      if (result.status === 200) {
        this.setState({ openSnack: true,emptyCart:false });
        this.setState({ option: "modificat" });
        this.setState({ feature: "Discount" });
      } else if (result.status === 400) {
        this.setState({ openSnack: true,emptyCart:true });
      } else if (result.status === 401) {
        this.setState({ openSnack: true,emptyCart:true });
      }
    });
    this.setState({ openDiscount: false });
  };

  handleCloseUpdateDiscountCloseWindow = () => {
    this.setState({ openDiscount: false });

  }

  handleUpdateUserClose = () => {
    getUser({
      username: this.state.username
    }).then(result => {
      if (result.status === 200) {
        result.text().then(result => {
          const response = JSON.parse(result);
          this.setState({ user: response });
          this.setState({
            name: response.name,
            email: response.email,
            password: response.password,
            confpassword: response.confpassword,
            admin: response.admin
          });
          this.setState({ openUpdate: false });
    this.setState({ openUpdateById: true });
        });
      } else if (result.status === 400) {
        this.setState({ errorMsg: "Username gresit" });
        this.setState({ openSnack: true,emptyCart:true });
      } else if (result.status === 401) {
        this.setState({ errorMsg: "Username gresit" });
        this.setState({ openSnack: true,emptyCart:true });
      }
    });
    
  };

  handleUpdateClose = () => {
    this.setState({ openUpdate: false });

  };

  handleCloseUpdateById = () => {
    this.setState({ openUpdateById: false });

  };

  handleClose = () => {
    this.setState({ open: false });

  };

  registerButton(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      this.handleAddUserClose();
      register({
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confpassword: this.state.confpassword
      }).then(result => {
        if (result.status === 200) {
          this.setState({ openSnack: true,emptyCart:false });
            this.setState({ option: "adaugat" });
            this.setState({ feature: "Utilizator" });
        } else if (result.status === 400) {
          this.setState({ openSnack: true,emptyCart:true });
        } else if (result.status === 401) {
          this.setState({ openSnack: true,emptyCart:true });

        }
      });
    }
  }

  updateUser(e) {
    e.preventDefault();
    update({
      id: this.state.user.id,
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confpassword: this.state.confpassword,
      admin: this.state.admin
    }).then(result => {
      if (result.status === 200) {
        this.setState({ openSnack: true,emptyCart:false });
            this.setState({ option: "modificat" });
            this.setState({ feature: "Utilizator" });
            this.setState({ openUpdateById: false });

      } else if (result.status === 400) {
        this.setState({ openSnack: true,emptyCart:true });
      } else if (result.status === 401) {
        this.setState({ openSnack: true,emptyCart:true });
      }
    });
  }

    handleQuantity(evt){
      var quant = evt.target.value;
      this.setState({value :quant})
    }


      handleChange = name => event => {
        
        this.setState({ [name]: event.target.value });
      };
      handleQuantity = name => event => {
        
        this.setState({ [name]: event.target.value });
      };

      handleCloseSnackBar = (e, reason) => {
        if (reason === "clickaway") {
          return;
        }
        this.setState({ openSnack: false });

      }
    
    render() {
        const { classes } = this.props;

        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
          placeholder: "Cauta client ...",
          value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <div className={classes.root}>

            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />

            <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead} >
          <TableRow>
            <CustomTableCell>username
            
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
         
        >
 <form onSubmit =  { (e) => this.registerButton(e)} >

          <DialogTitle id="form-dialog-title">Adauga user
          <div class={classes.addUser}>
          <i 
           onClick={this.handleAddUserClose} 
           class="material-icons"
           >
                close
</i></div>
          </DialogTitle>
          
          <DialogContent>
          <TextField
            margin="dense"
            id="username"
            label="username"
            type="text"
            fullWidth
            onChange={this.onChangeUsername.bind(
              this,
              "username"
            )}
            value={this.state.fields["username"]}          />
             <span className={classes.msgerror}>
                          {this.state.errors["username"]}
                        </span>
          <TextField
            margin="dense"
            id="name"
            label="Nume"
            type="text"
            fullWidth
            onChange={this.onChangeName.bind(this, "name")}
            value={this.state.fields["name"]}  
                    />
            <span className={classes.msgerror}>
              {this.state.errors["name"]}
            </span>

          <TextField
            margin="dense"
            id="email"
            label="E-mail"
            type="e-mail"
            fullWidth
            onChange={this.onChangeEmail.bind(this, "email")}
            value={this.state.fields["email"]}            />
            <span className={classes.msgerror}>
              {this.state.errors["email"]}
            </span>

          <TextField
            margin="dense"
            id="password"
            label="Parola"
            type="password"
            fullWidth
            onChange={this.onChangePassword.bind(this, [
              "password"
            ])}
            value={this.state.fields["password"]}
          />
          <span className={classes.msgerror}>
            {this.state.errors["password"]}
          </span>          
          <TextField
                          margin="dense"
                          id="confpassword"
                          label="Confirma Parola"
                          type="password"
                          fullWidth
                          // onChange = { evt => { this.onChangeConfPassword( evt ) } }
                          onChange={this.onChangeConfPassword.bind(this, [
                            "confpassword"
                          ])}
                          value={this.state.fields["confpassword"]}
                        />
                        <span className={classes.msgerror}>
                          {this.state.errors["confpassword"]}
                        </span>
          </DialogContent>
          <DialogActions>
            <Button  
            type="submit"
            className={classes.addDialog} 
            onClick={e => this.registerButton(e)}
            color="primary"
          >
              Adauga
            </Button>
          </DialogActions>
          </form>

        </Dialog>

        <Dialog
          open={this.state.openUpdate}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
         
        >


          <DialogTitle id="form-dialog-title">Modifica User
          <div class={classes.addUser}>
          <i 
           onClick={this.handleUpdateClose} 
           class="material-icons"
           >
                close
</i></div>
          </DialogTitle>
          
          <DialogContent>
          <TextField
            margin="dense"
            id="username"
            label="username"
            type="text"
            fullWidth
            onChange={this.onChangeUsername.bind(
              this,
              "username"
            )}          />
         
          </DialogContent>
          <DialogActions>
            <Button  
            type="submit"
            className={classes.addDialog} 
            onClick={this.handleUpdateUserClose} 
            color="primary">
              Modifica
            </Button>
          </DialogActions>
          

        </Dialog>

        <Dialog
          open={this.state.openUpdateById}
          onClose={this.handleCloseUpdateById}
          aria-labelledby="form-dialog-title"
         
        >
 <form  onSubmit =  { (e) => this.updateUser(e)}  >
          <DialogTitle id="form-dialog-title">Modifica user
          <div class={classes.addUser}>
          <i 
           onClick={this.handleCloseUpdateById} 
           class="material-icons"
           >
                close
</i></div>
          </DialogTitle>
          
          <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label={this.state.user.name}
            type="text"
            fullWidth
            onChange={
              this.onChangeName.bind(this, "name")
            }
                      />
          <TextField
            margin="dense"
            id="email"
            label={this.state.user.email}
            type="e-mail"
            fullWidth
            onChange={this.onChangeEmail.bind(this, "email")}
            />
          <TextField
            margin="dense"
            id="password"
            label="Parola"
            type="password"
            fullWidth
            onChange={evt => {
              this.onChangePassword.bind(this, "password");
            }}          />
           <TextField
            margin="dense"
            id="confpassword"
                          label="Confirma Parola"
                          type="password"
                          fullWidth
                          onChange={evt => {
                            this.onChangeConfPassword.bind(
                              this,
                              "confpassword"
                            );
                          }}
                        />
                        <TextField
                          margin="dense"
            id="admin"
            label="Admin true/false"
            type="text"
            fullWidth
            onChange={evt => {
              this.onChangeAdmin(evt);
            }}         
             />
          </DialogContent>
          <DialogActions>
            <Button  
            type="submit"
            className={classes.addDialog} 
            onClick={this.handleUpdateUserClose} 
            color="primary"
            >
              Actualizeaza date
            </Button>
          </DialogActions>
          </form>

        </Dialog>
        
        <Dialog
          open={this.state.openDiscount}
          onClose={this.handleCloseUpdateDiscountCloseWindow}
          aria-labelledby="form-dialog-title"
         
        >
        
          <DialogTitle id="form-dialog-title">Modifica discount
          <div class={classes.addUser}>
          <i 
           onClick={this.handleCloseUpdateDiscountCloseWindow} 
           class="material-icons"
           >
                close
</i>
</div>
          </DialogTitle>
          
          <DialogContent>


          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Alege produs</InputLabel>
      
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange('productId')}
            inputProps={{
              name: 'age',
              id: 'age-native-simple',
            }}
          >
                       <option value="" />

                       {this.state.products.map((row, idx) =>

            <option 
            key={idx}
            value={row.id}>{row.name}</option>
                      )}
          </Select>
          <TextField
              id="standard-number"
              label="Valoare discount"
              type="text"
              className={classes.textField}
              margin="normal"
              onChange={this.handleQuantity('value') }
              />
        </FormControl>

          </DialogContent>
          <DialogActions>
            <Button  
            type="submit"
            className={classes.addDialog} 
            onClick={this.handleCloseUpdateDiscountClose} 
            color="primary"
            >
              Modifica
            </Button>
          </DialogActions>
          

        </Dialog>
        
        
            </CustomTableCell>
            <CustomTableCell align="right">Nume</CustomTableCell>
            <CustomTableCell align="right">E-mail</CustomTableCell>
            <CustomTableCell align="right">  
            <div className={classes.addUser}>
            <i 
            onClick={this.handleAddUserOpen} 
            className={" material-icons"}>
                person_add
</i>
<i  onClick={this.handleUpdateUserOpen}
className="material-icons">
                update
</i></div>
</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
{this.state.suggestions.map((row,idx) =>            
 <TableRow className={classes.row} key={row.id}>
       
              <CustomTableCell align="right">{row.username}</CustomTableCell>
              <CustomTableCell align="right">{row.name}</CustomTableCell>
              <CustomTableCell align="right">{row.email}</CustomTableCell>
              <CustomTableCell align="right">
              <i 
              onClick={()=>this.handleCloseUpdateDiscountOpen(row)}
              className="material-icons">
                settings
</i>
        </CustomTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
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

Example.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Example);
