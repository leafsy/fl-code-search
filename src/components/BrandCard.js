import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Fragment, Component } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export default class BrandCard extends Component {
  render() {
    if (!this.props.brand) return null;

    const { name, codes, logoUrl, entries } = this.props.brand;
    const accordions = entries?.map((entry) => (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{entry.section}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{entry.description}</Typography>
        </AccordionDetails>
      </Accordion>
    ));

    return (
      <Fragment>
        <Card variant="outlined">
          <CardMedia
            component="img"
            alt="brand logo"
            height="300"
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
        <div>{accordions}</div>
      </Fragment>
    );
  }
}
