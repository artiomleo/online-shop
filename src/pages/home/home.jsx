import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import ProductCard from "../../components/productPage/productCard/productCard";
import { getProducts } from "../../api/requests.js";
import "./home.css";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "50px 20px"
  },
  paper: {
    width: "200px",
    position: "fixed",
    padding: theme.spacing.unit * 2,
    textAlign: "left",
    margin: "10px 0",
    color: theme.palette.text.primary,
    minWidth: "200px",
  },
  paper1: {
    width: "200px",
    position: "fixed",
    padding: theme.spacing.unit * 2,
    textAlign: "left",
    margin: "400px 0",
    color: theme.palette.text.primary,
    minWidth: "200px"
  },
  paper3: {
    width: "200px",
    position: "fixed",
    padding: theme.spacing.unit * 2,
    textAlign: "left",
    margin: "250px 0",
    color: theme.palette.text.primary,
    minWidth: "200px"
  },
  presentationWrapper: {
    marginTop: "50px"
  },
  productGrid: {
    textAlign: "center",
    padding: "10px 25px"
  },
  checkbox: {
    fontSize: "12px",
    textAlign: "center"
  },
  switch: {
    marginLeft: "0px"
  },
  checkoboxWrapper: {
    marginLeft: "20px",
    color:"primary"
  }
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showProducts: [],
      username: [],
      productsShow: [],
      switches: {
        suprafete: true,
        instrumentar: true,
        maini: true,
        octenidina: true
      },
      subcat: {
        concentrat: false,
        gata: false,
        dezinfectie: false,
        curatare: false,
        ingrijire: false
      }
    };
  }

  switchBoxChange = name => event => {
    let a = event.target.checked;
    var con = this.state.subcat.concentrat;
    var gata = this.state.subcat.gata;
    if (con === false && gata === false || a ===false)
    this.setState(prevState => ({
      subcat: {
        ...prevState.subcat,
        [name]: a
      }
    }));
    if (con === false && gata === true && a ===true)
    this.setState(prevState => ({
      subcat: {
        ...prevState.subcat,
        [name]: a,
        ["gata"]:false
      }
    }));
    if (con === true && gata === false && a ===true)
    this.setState(prevState => ({
      subcat: {
        ...prevState.subcat,
        [name]: a,
        ["concentrat"]:false
      }
    }));

  };

  checkBoxChange = name => event => {
    let a = event.target.checked;
    this.setState(prevState => ({
      subcat: {
        ...prevState.subcat,
        [name]: a
      }
    }));
  };

  switchChange = name => event => {
    let a = event.target.checked;

    this.setState(prevState => ({
      switches: {
        ...prevState.switches,
        [name]: a
      }
    }));
  };

  filterCheckboxes(filter) {
    var switches = [];
    var cats = filter.subCategory.split(",");
    if (this.state.subcat.concentrat === true) switches.push("concentrat");
    if (this.state.subcat.gata === true) switches.push("gata");
    if (this.state.subcat.dezinfectie === true) switches.push("dezinfectie");
    if (this.state.subcat.curatare === true) switches.push("curatare");
    if (this.state.subcat.ingrijire === true) switches.push("ingrijire");
    var aux = 0;
    for (let j in cats) {
      for (let i in switches) {
        if (cats[j].includes(switches[i])) {
          aux++;
        }
      }
    }
    if (switches.length === 0) return 1;
    if (aux === switches.length && aux !== 0) return 1;
    else return 0;
  }

  filterMainCategory(filter) {
    var filter = filter.category;
    var mystate = this.state.switches;

    if (mystate[filter] === true) return 1;
    return 0;
  }

  componentDidMount() {
    getProducts().then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          this.setState({ products: res });
          this.setState({ productsShow: res });
        });
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} className={classes.presentationWrapper}>
            <Grid container spacing={24}>
              <Grid item md={2} sm={3} xs={10}>
                <Card className={classes.paper + " labelField"} elevation={3}>
                  <Typography component="p" color="primary">
                    <Switch
                      color="primary"
                      className={classes.switch}
                      checked={this.state.switches.suprafete}
                      onChange={this.switchChange("suprafete")}
                      value="suprafete"
                    />
                    Suprafete
                  </Typography>
                  <Typography component="p" color="primary">
                    <Switch
                      color="primary"
                      className={classes.switch}
                      checked={this.state.switches.instrumentar}
                      onChange={this.switchChange("instrumentar")}
                      value="instrumentar"
                    />
                    Instrumentar
                  </Typography>
                  <Typography component="p" color="primary">
                    <Switch
                      color="primary"
                      className={classes.switch}
                      checked={this.state.switches.maini}
                      onChange={this.switchChange("maini")}
                      value="maini"
                    />
                    Maini
                  </Typography>
                  <Typography component="p" color="primary">
                    <Switch
                      color="primary"
                      className={classes.switch}
                      checked={this.state.switches.octenidina}
                      onChange={this.switchChange("octenidina")}
                      value="octenidina"
                    />
                    Octenidina
                  </Typography>
                </Card>

                <Card className={classes.paper3 + " labelField"} elevation={3}>
                  <FormGroup className={classes.checkoboxWrapper}>
                    <FormControlLabel
                    color="primary"
                      control={
                        <Switch
                          checked={this.state.subcat.concentrat}
                          onChange={this.switchBoxChange("concentrat")}
                          value="concentrat"
                          color="primary"
                          className={{ checkbox: classes.checkbox }}
                        />
                      }
                      label="Concentrat"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.subcat.gata}
                          onChange={this.switchBoxChange("gata")}
                          value="gata"
                          color="primary"
                        />
                      }
                      label="Gata de utilizare"
                    />
                      </FormGroup>
                      </Card>
                      <Card className={classes.paper1 + " labelField"}elevation={3}>
                  <FormGroup className={classes.checkoboxWrapper}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.subcat.dezinfectie}
                          onChange={this.checkBoxChange("dezinfectie")}
                          value="dezinfectie"
                          color="primary"
                        />
                      }
                      label="Dezinfectie"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.subcat.curatare}
                          onChange={this.checkBoxChange("curatare")}
                          value="curatare"
                          color="primary"
                        />
                      }
                      label="Curatare"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.subcat.ingrijire}
                          onChange={this.checkBoxChange("ingrijire")}
                          value="ingrijire"
                          color="primary"
                        />
                      }
                      label="Ingrijire"
                    />
                  </FormGroup>
                </Card>
              </Grid>

              <Grid item md={10} sm={9} xs={10} className={classes.productGrid}>
                {this.state.productsShow
                  .filter(filter => {
                    return (
                      this.filterCheckboxes(filter) &&
                      this.filterMainCategory(filter)
                    );
                  })

                  .map((row, idx) => (
                    <ProductCard
                      key={idx}
                      titleProp={row.name}
                      imgProp={row.image}
                      shortDescriptionProp={row.shortDescription}
                    />
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
