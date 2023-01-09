import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { Component } from "react";
import { addBrand, removeBrand, updateBrand } from "../firebase/operations";

export default class BrandForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.brand?.id ?? undefined,
      name: props.brand?.name ?? "",
      codes: props.brand?.codes ?? [],
      logoUrl: props.brand?.logoUrl ?? "",
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleCodesChange = (e, val) => {
    this.setState({ codes: val.map((code) => code.toUpperCase()) });
  };

  handleLogoURLChange = (e) => {
    this.setState({ logoUrl: e.target.value });
  };

  handleSave = () => {
    const { id, name, codes, logoUrl } = this.state;
    if (id) {
      updateBrand(id, name, codes, logoUrl);
    } else {
      addBrand(name, codes, logoUrl);
    }
    this.props.onClose();
  };

  handleDelete = () => {
    removeBrand(this.state.id);
    this.props.onClose();
  };

  render() {
    return (
      <Stack spacing={2} sx={{ p: 2 }}>
        <TextField
          label="Brand name"
          variant="outlined"
          error={!this.state.name}
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <Autocomplete
          multiple
          freeSolo
          value={this.state.codes}
          onChange={this.handleCodesChange}
          options={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Product abbreviations"
              variant="outlined"
              error={!this.state.codes?.length}
              inputProps={{
                ...params.inputProps,
                style: { textTransform: "uppercase" },
              }}
            />
          )}
        />
        <TextField
          label="Logo URL"
          variant="outlined"
          value={this.state.logoUrl}
          onChange={this.handleLogoURLChange}
        />
        <Button
          variant="contained"
          onClick={this.handleSave}
          disabled={!this.state.name || !this.state.codes?.length}
        >
          Save
        </Button>
        {this.state.id && (
          <Button color="error" variant="contained" onClick={this.handleDelete}>
            Delete
          </Button>
        )}
        <Button variant="text" onClick={this.props.onClose}>
          Cancel
        </Button>
      </Stack>
    );
  }
}
