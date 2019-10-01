import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { register, getUsers, getProducts } from '../../../api/requests'
import Autocomplete from './autocomplete';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    overflowX: 'auto',
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  margin: {
    margin: theme.spacing.unit,
  },
  tableHead: {
  },
  addDialog: {
    padding: "10px",
  },
  addUser: {
    cursor: "pointer",
    float: "right",
    backgroundColor: "green",
    borderRadius: "50%",
    padding: "8px",
  },

});

class UserManager extends React.Component {
  state = {
    open: false,
    openUpdate: false,
    openUpdateById: false,
    users: [],
    products: [],
    prodName: [],
    username: '',
    name: '',
    email: '',
    password: '',
    id: '',
    admin: ''
  };

  componentDidMount() {
    getProducts().then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          this.setState({ products: res });

          for (let i = 0; i < res.length; i++) {
            this.setState({ prodName: [...this.state.prodName, this.state.products[i].name] });
          }

        });
      }
    });
    getUsers().then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          this.setState({ users: res });
        })
      }
    });
  }

  registerButton(e) {
    this.handleAddUserClose();
    e.preventDefault();
    register({
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }).then(result => {
      if (result.status === 200) {
      } else if (result.status === 400) {

      } else if (result.status === 401) {

      }
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <Autocomplete />

      </div>
    );
  }
}

UserManager.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(UserManager);