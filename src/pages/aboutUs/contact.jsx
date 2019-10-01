import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { email } from '../../api/requests';


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "50px"
  },
  paper: {
    position: "relative",
    padding: "60px",
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  textField: {
    width: "100%",

  },
  button: {
    margin: theme.spacing.unit,
    float: "right",
  },
  msgerror: {
    color: "red",
    fontSize: "12px"
  }

});

class ContactUs extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      errors: {},
      fields: {},

    }
    this.handleChange = this.handleChange.bind(this)
  }



  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
    console.log("THIS!!"+this.state.name);
    
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
  
  onChangeSubject(field, evt) {
    let fields = this.state.fields;
    fields[field] = evt.target.value;
    this.setState({
      subject: evt.target.value,
      fields
    });
  }
  
  onChangeMessage(field, evt) {
    let fields = this.state.fields;
    fields[field] = evt.target.value;
    this.setState({
      message: evt.target.value,
      fields
    });
  }
  

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

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

    if (!fields["subject"]) {
      formIsValid = false;
      errors["subject"] = "Camp obligatoriu!";
    }

    if (!fields["message"]) {
      formIsValid = false;
      errors["message"] = "Camp obligatoriu!";
    }


    this.setState({ errors: errors });
    return formIsValid;
  }

   handleSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
    email({
      name: this.state.name,
      email: 'intercoop.shulke@gmail.com',
      subject: this.state.subject,
      message: this.state.message + '<br>From: '+this.state.name+'<br> Email: ' + this.state.email,
    }).then(result => {
      if (result.status === 200) {
        console.log("done")
        window.location.reload();
      } else if (result.status === 400) {

      } else if (result.status === 401) {

      }
    })
  }
  }

  render() {
    const { classes } = this.props;



    return (
      <div className={classes.root}>
        <Typography variant="h3" color = "primary">
          Contact
          </Typography> <br />
          <form onSubmit={(e) => this.handleSubmit(e)} >
          <TextField
            margin="dense"
            id="name"
            label="Nume"
            type="text"
            name="name"
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
            type="email"
            fullWidth
            onChange={this.onChangeEmail.bind(this, "email")}
            value={this.state.fields["email"]}           
            />
            <span className={classes.msgerror}>
              {this.state.errors["email"]}
            </span>
          <TextField
            margin="dense"
            id="subject"
            label="Subiect"
            type="text"
            fullWidth
            onChange={this.onChangeSubject.bind(this, "subject")}
            value={this.state.fields["subject"]}           
            />
            <span className={classes.msgerror}>
              {this.state.errors["subject"]}
            </span>
           <br /> <br />
          <TextField
            id="outlined-multiline-static"
            label="Mesaj"
            multiline
            rows="4"
            defaultValue=""
            className={classes.textField}
            margin="normal"
            variant="outlined"
            name="message"
            onChange={this.onChangeMessage.bind(this, "message")}
            value={this.state.fields["message"]}           
            />
            <span className={classes.msgerror}>
              {this.state.errors["message"]}
            </span>


          <Button type="submit" variant="outlined" color="primary"
            
            className={classes.button}
            
          >
            Trimite
      </Button>
        </form>
      </div>
    )
  };
};

ContactUs.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ContactUs);