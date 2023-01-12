import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { getAllBrands } from "./firebase/operations";
import { Component } from "react";
import {
  Autocomplete,
  Box,
  createFilterOptions,
  Drawer,
  Fab,
  TextField,
} from "@mui/material";
import BrandCard from "./components/BrandCard";
import AddIcon from "@mui/icons-material/Add";
import BrandForm from "./components/BrandForm";

const filterOptions = createFilterOptions({
  stringify: (option) =>
    [
      option.name,
      ...option.codes,
      ...(option.entries
        ? Object.values(option.entries).map((entry) => entry.keywords)
        : []),
    ].join(" "),
});

class App extends Component {
  unsubscribe;

  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      selectedBrandId: undefined,
      addFormOpen: false,
      editFormOpen: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = getAllBrands((brands) => {
      const selectedBrandId = brands.some(
        (brand) => brand.id === this.state.selectedBrandId
      )
        ? this.state.selectedBrandId
        : undefined;
      this.setState({ brands, selectedBrandId });
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  getSelectedBrand = () =>
    this.state.brands.find(
      (brand) => brand.id === this.state.selectedBrandId
    ) ?? null;

  handleAutocompleteChange = (e, val) => {
    this.setState({
      selectedBrandId: val && val.id,
    });
  };

  handleAddFabClick = () => {
    this.setState({
      addFormOpen: true,
    });
  };

  handleBrandCardEdit = () => {
    this.setState({
      editFormOpen: true,
    });
  };

  handleAddFormClose = () => {
    this.setState({
      addFormOpen: false,
    });
  };

  handleEditFormClose = () => {
    this.setState({
      editFormOpen: false,
    });
  };

  render = () => (
    <div className="App">
      <Autocomplete
        value={this.getSelectedBrand()}
        onChange={this.handleAutocompleteChange}
        options={this.state.brands}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={
                option.logoUrl || `${process.env.PUBLIC_URL}/placeholder.png`
              }
              alt="brand logo"
            />
            {option.name} - {option.codes.join(", ")}
          </Box>
        )}
        filterOptions={filterOptions}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search for a brand"
          />
        )}
      />
      <BrandCard
        brand={this.getSelectedBrand()}
        onEdit={this.handleBrandCardEdit}
      />
      <Fab
        className="add-fab"
        color="primary"
        aria-label="add"
        onClick={this.handleAddFabClick}
      >
        <AddIcon />
      </Fab>
      <Drawer
        anchor="bottom"
        open={this.state.addFormOpen}
        onClose={this.handleAddFormClose}
      >
        <BrandForm onClose={this.handleAddFormClose} />
      </Drawer>
      <Drawer
        anchor="bottom"
        open={this.state.editFormOpen}
        onClose={this.handleEditFormClose}
      >
        <BrandForm
          brand={this.getSelectedBrand()}
          onClose={this.handleEditFormClose}
        />
      </Drawer>
    </div>
  );
}

export default App;
