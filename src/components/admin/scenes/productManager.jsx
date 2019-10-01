import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw
} from "draft-js";
import "./productManager.css";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import {  Card, Button ,Divider} from "@material-ui/core";
import {
  addProduct,
  reqUrl,
  getProducts,
  updateProduct,
  deleteProduct
} from "../../../api/requests.js";
import axios from "axios";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
import { MySnackbarContentWrapper } from "../../snackbar/snackbar.jsx";

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  product: {
    width: "80%",
    position: "absolute"
  },
  msgerror: {
    color: "red",
    fontSize: "12px"
  },
  paper: {
    width: "50%",
    padding: "20px",
    display: "table-cell",
  },
  input: {
    width: "70%"
  },
  editor: {
    padding: "10px",
    marginBottom: "50px",
    marginTop: "50px",
    width: "70%"
  },
  fab: {
    margin: 0,
    position: "relative",
    bottom: 20,
    left: 15
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  textField: {
    minWidth: "400px"
  },
  select: {
    minWidth: "400px"
  },
  divider:{
    margin : "30px 0"
  }
});

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      detailsContent: [],
      products: [],
      productModify: 0,
      productPrice: "",
      titleField: "",
      fileField: "/",
      priceField: 0,
      pdfField: [],
      pdfName: [],
      selesctedFile: "",
      shortDescription: "",
      loaded: "",
      formRef: React.createRef(),
      uploadStatus: false,
      file: null,
      pdf: null,
      category: "",
      open: false,
      emptyCart:true,
      subcat: [],
      subcategory: {
        concentrat: false,
        gata: false,
        dezinfectie: false,
        curatare: false,
        ingrijire: false
      },
      errorContainer: {
        titleErr: "",
        pretErr: "",
        descriereErr: "",
        categoriErr: "",
        pozaErr: "",
        pdfErr: "",
        modificErr: "",
        option: ""
      },

      warn: "black",
      aux: []
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.onChangeFileInput = this.onChangeFileInput.bind(this);
    this.onChangePdfInput = this.onChangePdfInput.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => {
      this.setState({ editorState });
      const contentState = editorState.getCurrentContent();
      let rawData = convertToRaw(contentState);
      this.setState({ detailsContent: rawData.blocks });
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  componentDidMount() {
    getProducts().then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          this.setState({ products: res });
        });
      }
    });
  }
  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }
  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    const formPdf = new FormData();
    if(this.state.file!==null || undefined)
  {  formData.append("file", this.state.file);
    formData.append("filename", this.state.file.name);
    for (const files of this.state.pdfField) {
      formPdf.append("files", files);
    }
    console.log("aux", this.state.aux);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post(`${reqUrl}uploadImage`, formData, config)
      .then(res => {
        if (res.status === 200) {
        }
      })
      .then(
        axios.post(`${reqUrl}uploadPdf`, formPdf, config).then(res => {
          if (res.status === 200) {
            this.setState({ open: true,emptyCart:false });
            this.setState({ option: "adaugat" });

          }else{
            this.setState({ open: true,emptyCart:true });

          }
        })
      )
      .catch(error => {});
    }else{
      this.setState({ open: true,emptyCart:true });

    }
  }
  onChangeFileInput(e) {
    this.setState({
      file: e.target.files[0]
    });
  }

  onChangePdfInput(e) {
    let file = e.target.files[0];
    let name = e.target.files[0].name;
    this.setState(prevState => ({
      pdfField: [...prevState.pdfField, file]
    }));
    this.setState(prevState => ({
      pdfName: [...prevState.pdfName, name]
    }));

    console.log("here", this.state.pdfName);
  }

  handleAdd(e) {
    e.preventDefault();
    const subcategory = this.state.subcat.toString();
    if(this.state.file!==null)
    addProduct({
      name: this.state.titleField,
      image: this.state.file.name,
      pdf: this.state.pdfName,
      shortDescription: this.state.shortDescription,
      description: this.state.detailsContent,
      category: this.state.category,
      subcategory: subcategory,
      price: this.state.priceField
    }).then(result => {
      if (result.status === 200) {
       this.setState({open:true,emptyCart:false})
      } else if (result.status === 400) {
        this.setState({open:true,emptyCart:true})
      }

      this.setState({open:true,emptyCart:1})
    });
    else
    this.setState({open:true,emptyCart:1})
  }

  handleTitle = evt => {
    this.setState({ titleField: evt.target.value });
    if (evt.target.value === "") {
      this.setState(prevState => ({
        errorContainer: {
          ...prevState.errorContainer,
          titleErr: "Camp obligatoriu!"
        }
      }));
    } else {
      this.setState(prevState => ({
        errorContainer: {
          ...prevState.errorContainer,
          titleErr: ""
        }
      }));
    }
  };
  handlePrice = evt => {
    var errr = "";
    this.setState({ priceField: evt.target.value });
    if (evt.target.value < 0) {
      errr = "Format invalid!";
    } else if (evt.target.value === "") {
      errr = "Camp obligatoriu!";
    }
    this.setState(prevState => ({
      errorContainer: {
        ...prevState.errorContainer,
        pretErr: errr
      }
    }));
  };
  handlePdf = evt => {
    this.setState({ pdfField: evt.target.value });
  };
  handleShortDescription = evt => {
    this.setState({ shortDescription: evt.target.value });
    var errr = "";
    if (evt.target.value.length >= 255) {
      errr = "Maxim 255 de caractere!";
    } else if (evt.target.value.length <= 10) {
      errr = "Minim 10 caractere!";
    }

    this.setState(prevState => ({
      errorContainer: {
        ...prevState.errorContainer,
        descriereErr: errr
      }
    }));
  };

  handleChange = name => event => {
    var errr = "";
    this.setState({ [name]: event.target.value });
    if (event.target.value < 0) {
      errr = "Format invalid!";
    } else if (event.target.value === "") {
      errr = "Camp obligatoriu!";
    }
    this.setState(prevState => ({
      errorContainer: {
        ...prevState.errorContainer,
        modificErr: errr
      }
    }));

    console.log(event.target.value);
  };

  handleUpdateProduct = () => {
    updateProduct({
      id: this.state.productModify,
      price: this.state.productPrice
    }).then(result => {
      if (result.status === 200) {
        this.setState({ open: true,emptyCart:false });
        this.setState({ option: "modificat" });
      } else if (result.status === 400) {
      } else if (result.status === 401) {
      }
    });
  };

  handleDeleteProduct = () => {
    deleteProduct({
      id: this.state.productModify
    }).then(result => {
      if (result.status === 200) {
        this.setState({ open: true,emptyCart:false });
            this.setState({ option: "sters" });
      } else if (result.status === 400) {
      } else if (result.status === 401) {
      }
    });
  };

  checkBoxChange = name => event => {
    const checkbox = event.target.checked;
    const selectedSubcategories = this.state.subcat;

    if (!selectedSubcategories.includes(name) && checkbox === true) {
      selectedSubcategories.push(name);
    } else if (selectedSubcategories.includes(name) && checkbox === false) {
      for (let i in selectedSubcategories) {
        if (selectedSubcategories[i] === name)
          selectedSubcategories.splice(i, 1);
      }
    }
    this.setState({ subcat: selectedSubcategories });
    this.setState(prevState => ({
      subcategory: {
        ...prevState.subcategory,
        [name]: checkbox
      }
    }));
  };
  handleCategoryChange = evt => {
    this.setState({ category: evt.target.value });
    var errr = "";
    if (evt.target.value === "") {
      errr = "Categorie obligatorie!";
    }

    this.setState(prevState => ({
      errorContainer: {
        ...prevState.errorContainer,
        categoriErr: errr
      }
    }));
  };
  render() {
    const { editorState } = this.state;
    const { classes } = this.props;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <div className={classes.product}>
        <Card className={classes.paper}>
          <Typography variant="h5" color = "secondary">Adaugare produs</Typography>
          <form onSubmit={this.onFormSubmit}>
            <p>Selectează poza</p>
            <input
              type="file"
              name="myImage"
              onChange={this.onChangeFileInput}
            />

            <Divider className={classes.divider}/>
            <p>Selectează un pdf</p>
            <input type="file" name="myPdf" onChange={this.onChangePdfInput} />

            <br />
            <br />
            {this.state.pdfField.map((idx, row) => (
              <p key={idx}>{this.state.pdfField[row].name}</p>
            ))}

            <button type="submit">Upload</button>
          </form>

          <Divider className={classes.divider}/>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="cat">Categorie</InputLabel>
            <Select
              value={this.state.category}
              onChange={this.handleCategoryChange}
              inputProps={{
                name: "cat",
                id: "cat"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"suprafete"}>Suprafețe</MenuItem>
              <MenuItem value={"instrumentar"}>Instrumentar</MenuItem>
              <MenuItem value={"maini"}>Mâini</MenuItem>
              <MenuItem value={"octenidina"}>Octenidina</MenuItem>
            </Select>
            <p className={classes.msgerror}>
              {this.state.errorContainer.categoriErr}
            </p>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.subcategory.concentrat}
                  onChange={this.checkBoxChange("concentrat")}
                  value="concentrat"
                  color="primary"
                  className={{ checkbox: classes.checkbox }}
                />
              }
              label="Concentrat"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.subcategory.gata}
                  onChange={this.checkBoxChange("gata")}
                  value="gata"
                  color="primary"
                />
              }
              label="Gata de utilizare"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.subcategory.dezinfectie}
                  onChange={this.checkBoxChange("dezinfectie")}
                  value="dezinfectie"
                  color="primary"
                />
              }
              label="Dezinfectie"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.subcategory.curatare}
                  onChange={this.checkBoxChange("curatare")}
                  value="curatare"
                  color="primary"
                />
              }
              label="Curatare"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.subcategory.ingrijire}
                  onChange={this.checkBoxChange("ingrijire")}
                  value="ingrijire"
                  color="primary"
                />
              }
              label="Ingrijire"
            />
          </FormGroup>
          <br />
          <TextField
            margin="dense"
            id="name"
            label="Denumire"
            type="text"
            fullWidth
            className={classes.input}
            onChange={this.handleTitle}
          />
          <p className={classes.msgerror}>
            {this.state.errorContainer.titleErr}
          </p>
          <TextField
            margin="dense"
            id="cost"
            label="Pret"
            type="number"
            fullWidth
            className={classes.input}
            onChange={this.handlePrice}
          />
          <p className={classes.msgerror}>
            {this.state.errorContainer.pretErr}
          </p>
          <TextField
            margin="dense"
            id="cost"
            label="Descriere scurta"
            type="text"
            fullWidth
            onChange={this.handleShortDescription}
          />
          <p className={classes.msgerror}>
            {this.state.errorContainer.descriereErr}
          </p>
          <div className={classes.editor + " RichEditor-root"}>
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <div className={className} onClick={this.focus}>
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={this.mapKeyToEditorCommand}
                onChange={this.onChange}
                placeholder="Adauga o descriere..."
                ref="editor"
                spellCheck={true}
              />
            </div>
          </div>
          <div>
            <Fab
              color="primary"
              onClick={e => this.handleAdd(e)}
              aria-label="Add"
              className={classes.fab}
            >
              <AddIcon />
            </Fab>
            <p style={{ color: this.state.warn }}>{this.state.loaded}</p>
          </div>
        </Card>
        <Card className={classes.paper}>
          <Typography variant="h5">Modificare produs</Typography>
          <Select
            className={classes.select}
            native
            value={this.state.age}
            onChange={this.handleChange("productModify")}
            inputProps={{
              name: "age",
              id: "age-native-simple"
            }}
          >
            {/* <option value="" /> */}

            {this.state.products.map((row, idx) => (
              <option key={idx} value={row.id}>
                {row.name}
              </option>
            ))}
          </Select>
          <TextField
            id="productValue"
            label="Pret"
            type="text"
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange("productPrice")}
          />
          <p className={classes.msgerror}>
            {this.state.errorContainer.modificErr}
          </p>
          <Button
            type="submit"
            className={classes.addDialog}
            onClick={this.handleUpdateProduct}
            color="primary"
          >
            Modifica
          </Button>
          <Button
            type="submit"
            className={classes.addDialog}
            onClick={this.handleDeleteProduct}
            color="primary"
          >
            Sterge
          </Button>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.state.emptyCart === false ? "success" : "error"}
            message={
              this.state.emptyCart === false
                ? "Produs "+this.state.option+" cu succes"
                : "A intervenit o eroare"
            }
          />
        </Snackbar>
      </div>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  RED: {
    color: "red"
  }
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" }
];
const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Red", style: "RED" }
];
const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(MyEditor);
