import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Fragment, Component } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
} from "@mui/material";
import EntryForm from "./EntryForm";

export default class BrandCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntryId: undefined,
      addFormOpen: false,
      editFormOpen: false,
    };
  }

  getEntries = () => {
    const entries = this.props.brand.entries;
    return entries
      ? Object.entries(entries).map(([key, value]) => ({
          id: key,
          ...value,
        }))
      : [];
  };

  handleAddEntry = () => {
    this.setState({
      addFormOpen: true,
    });
  };

  handleEntryClick = (entry) => {
    this.setState({
      selectedEntryId:
        entry.id === this.state.selectedEntryId ? undefined : entry.id,
    });
  };

  handleEntryEdit = () => {
    this.setState({
      editFormOpen: this.props.editable && true,
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

  render() {
    if (!this.props.brand) return null;

    const { id, name, codes, logoUrl } = this.props.brand;
    const accordions = this.getEntries()
      .sort((e1, e2) => e1.section.localeCompare(e2.section))
      .map((entry) => (
        <Accordion
          key={entry.id}
          expanded={this.state.selectedEntryId === entry.id}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() => this.handleEntryClick(entry)}
          >
            <Typography>
              ({entry.section}) {entry.keywords ?? ""}
            </Typography>
          </AccordionSummary>
          <AccordionDetails onClick={this.handleEntryEdit}>
            {entry.photoUrl && (
              <Box
                component="img"
                sx={{
                  height: 300,
                  width: "100%",
                  objectFit: "contain",
                }}
                alt="product photo"
                src={entry.photoUrl}
              />
            )}
            <Typography color="text.secondary">
              {entry.description || "(Enter notes)"}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ));

    return (
      <Fragment>
        <Card variant="outlined" sx={{ my: 2 }}>
          <CardMedia
            component="img"
            alt="brand logo"
            height="200"
            image={logoUrl || `${process.env.PUBLIC_URL}/placeholder.png`}
            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
          />
          <CardContent onClick={this.props.onEdit}>
            <Typography gutterBottom variant="h3" component="div">
              {name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Abbreviations: {codes.join(", ")}
            </Typography>
          </CardContent>
        </Card>

        <div>
          {accordions}
          {this.props.editable && (
            <Accordion
              onClick={this.handleAddEntry}
              expanded={this.state.editFormOpen}
            >
              <AccordionSummary expandIcon={<AddIcon />}>
                <Typography>Add new section</Typography>
              </AccordionSummary>
            </Accordion>
          )}
        </div>

        <Drawer
          anchor="bottom"
          open={this.state.addFormOpen}
          onClose={this.handleAddFormClose}
        >
          <EntryForm brandId={id} onClose={this.handleAddFormClose} />
        </Drawer>
        <Drawer
          anchor="bottom"
          open={this.state.editFormOpen}
          onClose={this.handleEditFormClose}
        >
          <EntryForm
            brandId={id}
            entry={
              this.getEntries().find(
                (entry) => entry.id === this.state.selectedEntryId
              ) ?? null
            }
            onClose={this.handleEditFormClose}
          />
        </Drawer>
      </Fragment>
    );
  }
}
