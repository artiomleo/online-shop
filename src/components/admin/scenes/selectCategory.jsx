import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const styles = theme => ({
  root: {
    display: "flex",
    scene: "",
    category: "",
    subcategory: ""
  }
});

class SelectCategory extends React.Component {
  state = {
    open: false
  };

  handleChange = name => event => {
    if (this.state.subcategory === "Industria Farmaceutica") {
      this.setState({ category: "Domeniul Industrial" });
    }
    this.setState({ [name]: Number(event.target.value) });
  };

  handleCategory = () => {
    this.setState({ scene: "category" });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <form className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Categorie</InputLabel>
          <Select
            native
            value={this.state.category}
            onChange={this.handleChange("category")}
            input={<Input id="age-native-simple" />}
          >
            <option value="" />
            <option value={1}>Domeniul Medical</option>
            <option value={2}>Domeniul Industrial</option>
            <option value={3}>Octenidina</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Subcategorie</InputLabel>
          <Select
            value={this.state.subcategory}
            onChange={this.handleChange("subcategory")}
            input={<Input />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={4}>Suprafete</MenuItem>
            <MenuItem value={5}>Instrumentar</MenuItem>
            <MenuItem value={6}>Mâini și piele</MenuItem>
            <MenuItem value={7}>Stomatologie</MenuItem>
            <MenuItem value={8}>Accesorii</MenuItem>
            <MenuItem value={9}>Industria Farmaceutica</MenuItem>
            <MenuItem value={10}>Octinisept</MenuItem>
            <MenuItem value={11}>Octenisan</MenuItem>
            <MenuItem value={12}>Moctenidol apa de gura</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SelectCategory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SelectCategory);
