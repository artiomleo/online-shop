import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { getDiscounts, getUsers, getProducts } from '../../../api/requests';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TableRow } from '@material-ui/core';

const menuStyle ={
  width:'100%',
}

const styles = theme => ({
  root: {
    // display: 'flex',
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    
    // flexBasis: '33.33%',
    // flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    float:"right"
  },
  panels: {
    display: 'flex'
  },
  
});

class AuditManager extends React.Component {
  constructor() {
    super();
    
    this.state = {
    open: false,
    expanded: null,
    users: [],
    discounts: [],
    filteredDiscounts: [],
    products: []

  };
}

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };


  componentDidMount() {

    getProducts().then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          console.log(res)
          this.setState({ products: res });
        });
      }
    });

      getDiscounts().then(response => {
          if (response.status === 200) {
              response.text().then(response => {
                  var res = JSON.parse(response);
                  this.setState({ discounts: res });
                  this.setState({ filteredDiscounts: res });
        // const result = res.filter(word => word.clientId === id);

                  console.log(res);                  
                  
              })
          }
      });

      getUsers().then(response => {
        if (response.status === 200) {
            response.text().then(response => {
                var res = JSON.parse(response);
                    this.setState({ users: res });
                    console.log(res);
            })
        }
       });

  }

  handleDiscounts = (id)=> {
    const result = this.state.discounts.filter(word => word.clientId === id);

console.log("result");
    return (
      
      <div>
     
     <Typography>
     ID {result.productId} Valoare {this.state.discounts.value}
       </Typography>
     
     </div>
    )
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>

{this.state.users.map((row,idx) => 
  <TableRow key={idx}>

<ExpansionPanel style={menuStyle} expanded={expanded === 'panel'+idx} onChange={this.handleChange('panel'+idx)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{row.name}</Typography>
            <Typography className={classes.secondaryHeading}> &nbsp;&nbsp;&nbsp; Id:{row.id}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails >
 
      {this.state.filteredDiscounts.map((rowa,idxa) =>            

                  <Typography  component="div" key ={idxa}>
                  
                    {row.id === rowa.clientId ? "ID."+rowa.productId +" Valoare"+rowa.value: ""}
                    
                  </Typography>
      )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </TableRow>
        )}
      </div>
    );
  }
}

AuditManager.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AuditManager);