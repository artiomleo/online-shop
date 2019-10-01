import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Paper, Divider } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';



const styles = theme => ({
  root: {
    display: 'flex',
  },
  setting: {
    width:"100%",
  },
  settingBlock: {
    padding:"25px",
  },
  
});

class SettingsManager extends React.Component {
  state = {
    open: false,
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
    checkedE: true,
    checkedF: true,
    checkedG: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

<div className={classes.setting}>
          <Paper 
          className={classes.paper}>

<div className={classes.settingBlock}>
          <Typography variant="h5">
          Setari generale
          </Typography>
          <FormGroup >
          <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
              color="primary"
            />
          }
          label="Secondary"
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
              value="checkedA"
              color="primary"
            />
          }
          label="Secondary"
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedC}
              onChange={this.handleChange('checkedC')}
              value="checkedA"
              color="primary"
            />
          }
          label="Secondary"
        />
        <Divider />
          <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedG}
              onChange={this.handleChange('checkedG')}
              value="checkedB"
              color="primary"
            />
          }
          label="Primary"
        />
          </FormGroup>
</div>
          </Paper>
          </div>
      </div>
    );
  }
}

SettingsManager.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SettingsManager);