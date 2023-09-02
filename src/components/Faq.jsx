import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = () => {
  const dummyFaqs = [
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      question: "How does React work?",
      answer: "React is a JavaScript library for building user interfaces. It uses a virtual DOM to optimize performance and updates.",
    },
    {
      question: "What are the benefits of using Redux?",
      answer: "Redux is a predictable state container for JavaScript apps. It helps manage application state in a more organized way.",
    },
    {
      question: "How can I get started with Tailwind CSS?",
      answer: "To get started with Tailwind CSS, you can install it using npm or Yarn, and then configure your project's tailwind.config.js file.",
    },
    // Add more dummy FAQs
  ];

  const [expanded, setExpanded] = useState(null);

  const handleAccordionToggle = (index) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  return (
    <div className="flex p-8">
      <div className="w-1/2 mr-8">
        {/* Replace this with your actual image */}
        <img src="data:image/jpeg;base64,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" alt="FAQ Illustration" className="w-2/5 h-auto" />
      </div>
      <div className="w-4/5">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="bg-white p-4 rounded-lg ">
            {dummyFaqs.map((faq, index) => (
              <Accordion key={index} expanded={expanded === index} onChange={() => handleAccordionToggle(index)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-content-${index}`}
                  id={`panel-header-${index}`}
                >
                  <Typography variant="h6" className="text-black font-medium">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="text-gray-600">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;

