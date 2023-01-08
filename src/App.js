import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { getAllBrands, writeBrand } from "./firebase/operations";
import { Component } from "react";
import {
  Autocomplete,
  Box,
  createFilterOptions,
  TextField,
} from "@mui/material";
import BrandCard from "./components/BrandCard";

const filterOptions = createFilterOptions({
  stringify: (option) => [option.name, ...option.codes].join(" "),
});

class App extends Component {
  unsubscribe;

  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      selectedBrand: undefined,
    };
  }

  componentDidMount() {
    this.unsubscribe = getAllBrands((brands) => {
      this.setState({ brands });
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  handleCreateBrand = (e) => {
    e.preventDefault();
    writeBrand("perdue", ["PR", "PER"], "https://www.google.com");
  };

  handleAutocompleteChange = (e, val) => {
    this.setState({
      selectedBrand: this.state.brands.find((brand) => brand.id === val.id),
    });
  };

  getKeywordsFromBrands = () => {};

  render() {
    return (
      <div className="App">
        <Autocomplete
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
                src={option.logoUrl}
                alt="brand logo"
              />
              {option.name} - {option.codes.join(", ")}
            </Box>
          )}
          filterOptions={filterOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search for a brand"
            />
          )}
        />
        <BrandCard brand={this.state.selectedBrand} />
      </div>
    );
  }
}

export default App;
