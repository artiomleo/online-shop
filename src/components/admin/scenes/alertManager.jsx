import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  
});

class AlertManager extends React.Component {
  state = {
    open: false,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

          <Typography paragraph>
          AlertManager
          </Typography>
      </div>
    );
  }
}

AlertManager.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AlertManager);