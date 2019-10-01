import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { getUser, getOrders, getOrderItems } from "../../api/requests";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import "./login.css";
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    width: "60%",
    height: "100vh",
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 10,
    margin: "10% auto",
    backgroundColor: "#eeeeee"
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
  },
  table: {
    minWidth: 700
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    display: "flex"
  },
  expansionPanel: {
    margin: "7px 0"
  },
});

const TAX_RATE = -0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items
    .map(({ price, quantity, discount }) => discount !==1 ? price * quantity - (price * quantity* discount) : price * quantity* discount)
    .reduce((sum, i) => sum + i, 0);
}

function priceRow(qty, unit) {
  return qty * unit;
}

class Account extends React.Component {
  state = {
    user: [],
    orders: [],
    orderItems: [],
    expanded: null,
  };

  getOrdersItems(idx) {
    const userId = idx.userId;
    const orderId = idx.orderId;
    getOrderItems({
      userId: userId,
      orderId: orderId
    }).then(res => {
      if (res.status === 200) {
        res.text().then(res => {
          let items = JSON.parse(res);
          console.log(items)
          this.setState({ orderItems: items });
        });
      }
    });
  }

  componentDidMount() {
    const username = sessionStorage.getItem("username");

    getUser({
      username: username
    })
      .then(result => {
        if (result.status === 200) {
          result.text().then(res => {
            result = JSON.parse(res);
            this.setState({ user: result });
          });
        } else if (result.status === 400) {
        } else if (result.status === 401) {
        }
      })
      .then(res => {
        getOrders().then(res => {
          if (res.status === 200) {
            res.text().then(res => {
              let orders = JSON.parse(res);
              console.log(orders)
              this.setState({ orders: orders });
            });
          }
        });
      });
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const invoiceSubtotal = subtotal(this.state.orderItems);
    const { expanded } = this.state;
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;
    return (
      <div className={classes.box}>
        <Paper className={classes.root} elevation={1} component="div">
          <div key="accountWrapper" className={classes.account}>
            <Typography variant="h4" color="primary">
              Nume:
            </Typography>
            <br />
            <Typography variant="h5" color="secondary">
              {this.state.user.username}
            </Typography>
            <br />
            <Typography variant="h4" color="primary">
              Email:
            </Typography>
            <br />
            <Typography variant="h5" color="secondary">
              {this.state.user.email}
            </Typography>
          </div>
          <div
            key="ordersWrapper"
            className={classes.history}
            onClick={this.getOrders}
          >
            <br />
            <br />
            <br />
            <Typography variant="h4" color="primary">
              Istoric comenzi:
            </Typography>
            {this.state.orders.map((idx, row) => (
              <ExpansionPanel
                key={row}
                expanded={expanded === `${row}`}
                onChange={this.handleChange(`${row}`)}
                onClick={() => this.getOrdersItems(idx)}
                className={classes.expansionPanel}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading} component="div">
                    <span className="orderFlex">
                      {idx.createdAt.replace("T", "    ").slice(0, 22)}
                    </span>
                    <span style={{ color: "green" }}>Cod comanda:</span>
                    <span className="orderFlex"> {idx.orderId}</span>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Produs</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Pret</TableCell>
                        <TableCell align="right">Discount</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.orderItems.map(row => (
                        <TableRow key={row.id}>
                          <TableCell>
                            <Link to={`product/${row.productName}`}>
                              {row.productName}
                            </Link>
                          </TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell align="right">
                            {row.discount}
                          </TableCell>
                          <TableCell align="right">
                            {ccyFormat(priceRow(row.price, row.quantity,row.discount||1))}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={3}>Subtotal</TableCell>
                        <TableCell align="right">
                          {ccyFormat(invoiceSubtotal)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Discount</TableCell>
                        <TableCell />
                        <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                          0
                        )} %`}</TableCell>
                        <TableCell align="right">
                          {ccyFormat(invoiceTaxes)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell align="right">
                          {ccyFormat(invoiceTotal)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        </Paper>
      </div>
    );
  }
}

Account.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withStyles(styles)(Account);
