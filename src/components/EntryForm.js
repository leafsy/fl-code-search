import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Component } from "react";
import { addEntry, removeEntry, updateEntry } from "../firebase/operations";

export default class EntryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.entry?.id ?? undefined,
      section: props.entry?.section ?? "",
      description: props.entry?.description ?? "",
    };
  }

  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSave = () => {
    const { id, section, description } = this.state;
    if (id) {
      updateEntry(id, this.props.brandId, section, description);
    } else {
      addEntry(this.props.brandId, section, description);
    }
    this.props.onClose();
  };

  handleDelete = () => {
    removeEntry(this.state.id, this.props.brandId);
    this.props.onClose();
  };

  render() {
    return (
      <Stack spacing={2} sx={{ p: 2 }}>
        <FormControl fullWidth error={!this.state.section}>
          <InputLabel id="section-select-label">Section</InputLabel>
          <Select
            labelId="section-select-label"
            value={this.state.section}
            label="Section"
            onChange={this.handleSectionChange}
          >
            <MenuItem value={"Aisle 1"}>Aisle 1</MenuItem>
            <MenuItem value={"Aisle 2"}>Aisle 2</MenuItem>
            <MenuItem value={"Aisle 3"}>Aisle 3</MenuItem>
            <MenuItem value={"Aisle 4"}>Aisle 4</MenuItem>
            <MenuItem value={"Aisle 5"}>Aisle 5</MenuItem>
            <MenuItem value={"Aisle 6"}>Aisle 6</MenuItem>
            <MenuItem value={"Aisle 7"}>Aisle 7</MenuItem>
            <MenuItem value={"Aisle 8"}>Aisle 8</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Notes"
          variant="outlined"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <Button
          variant="contained"
          onClick={this.handleSave}
          disabled={!this.state.section}
        >
          Save
        </Button>
        {this.state.id && (
          <Button color="error" variant="contained" onClick={this.handleDelete}>
            Delete
          </Button>
        )}
      </Stack>
    );
  }
}
