import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { getUser } from "../../api/requests";


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    width: "800px",
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 10,
    margin: "40px auto"
  },
  account: {
    height: "200px"
  },
  box: {
    height: "300px"
  },
  history: {
    height: "150px"
  },
  settings: {
    height: "150px"
  }
});

class OrderHistory extends React.Component {
  state = {
    open: false,
    user: []
  };

  componentDidMount(){
      const username = sessionStorage.getItem( 'username' );
    getUser({
      username: username
  }).then( result => {
      if(result.status === 200){
          this.setState({ user: result})
      } else if ( result.status === 400 ){
           
      } else if ( result.status === 401 ){

      }
  } )
}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.box}>
        
      </div>
    );
  }
}

OrderHistory.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withStyles(styles)(OrderHistory);
