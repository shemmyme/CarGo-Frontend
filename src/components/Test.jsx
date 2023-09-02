import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Test = () => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-gray-100 p-4">
      <Accordion expanded={expanded} onChange={handleAccordionToggle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Typography variant="h6" className="text-blue-500">
            Test Accordion Header
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="text-gray-700">
            This is a test component that combines Tailwind CSS and Material-UI.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Test;
