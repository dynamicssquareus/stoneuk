import React, { useState } from 'react';
import ModelBox from '@/components/ModelBox';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

const FaqAccordion = ({ faqList = [] }) => {
  // console.log(faqList)
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    setOpen(open === id ? undefined : id);
  };

  const defaultFaqs = [
    {
      title: "What types of memorials do you provide?",
      description: "We offer a wide range of memorial headstone designs such as Ogee Memorials, Angel Memorials Bench Memorials, Children Memorials, Heart shaped memorials, Kerb sets,  Cremation Urns, and Vases. All our products are made from the finest quality Indian granite and are available in different colors and finishes to choose from.",
    },
    {
      title: "Where are your memorials manufactured?",
      description: "All our memorial tombstones are expertly designed and crafted by our skilled professionals in India. The raw granite is first sourced from trusted quarries and then cut, designed, and engraved in our factories. We use both traditional and modern machinery for custom design and development.",
    },
    {
      title: "Who can buy from Us?",
      description: "We sell Memorial headstone to wholesalers, dealers, and importers. We do bulk orders at competitive prices, all over the UK.",
    },
    {
      title: "What materials do you use for your memorial stone?",
      description: "We use premium quality Granite, sourced from the finest quarries of India for the industrial production of memorial tombstones and headstones grave markers. However, we can also accommodate special requests for other materials like marble, sandstone, and limestone, based on availability and order size.",
    },
    {
      title: "What is the lead time for wholesale memorial stone orders?",
      description: "Production lead times vary by order size and customisation level. Standard stock designs typically ship within 6–8 weeks. Custom and bespoke memorials require 8–10 weeks depending on complexity. We provide confirmed lead times at the time of order.",
    },
    {
      title: "Do you supply NAMM-compliant headstones?",
      description: "Yes, our memorial stones are manufactured to meet UK memorial trade standards. We work with buyers to ensure products conform to cemetery authority requirements, including size, weight, and fixing specifications.",
    },
    {
      title: "Can I order samples before committing to bulk?",
      description: "Yes, sample pieces or a physical catalogue can be arranged for trade buyers. Contact our sales team to discuss sample options for your product range.",
    },

    {
      title: "Can you customize memorials according to our specifications?",
      description: "Absolutely! We offer customization options, including sizes, shapes, engravings, and finishes. Please contact us with your detailed requirements, and we’ll work closely with you to meet your preferences.",
    },
    {
      title: "What is the minimum order quantity (MOQ)?",
      description: "Our minimum order quantity varies depending on the type of memorial stone and customization required. We’ll provide free delivery on ordering a minimum of 5 Sets of Ogees, Mapples, and Kerbsets. Please contact us with your specific needs, for a detailed quote and MOQ.",
    },

  ];

  const validFaqList = faqList?.filter(
    item => item.title?.trim() && item.description?.trim()
  );

  const items = validFaqList && validFaqList.length > 0 ? validFaqList : defaultFaqs;

  return (
    <div className="form-left">
      <div className="accordion-one">
        <Accordion open={open} toggle={toggle}>
          {items.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionHeader targetId={`${index + 1}`}>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <h3>{item.title}</h3>
                </div>
              </AccordionHeader>
              <AccordionBody accordionId={`${index + 1}`}>
                <p dangerouslySetInnerHTML={{ __html: item.description }} />
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="text-center" style={{paddingTop:'30px'}}>
        <ModelBox className="btn-three" headerText="Scale Your Store!" buttonText="More Enquiry" />
      </div>
    </div>
     
  );
};

export default FaqAccordion;
