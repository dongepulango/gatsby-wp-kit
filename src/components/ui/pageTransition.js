import React from 'react';
//styles
import styled from 'styled-components';
//framer-motion
import { motion } from 'framer-motion';

//styled
const PageTransitionWrap = styled(motion.div)`
  position: relative;
`;

const PageTransition = ({ children, location }) => {
  return (
    <PageTransitionWrap
      key={location}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        }
      }}
      >
      {children}
    </PageTransitionWrap>
  );
};

export default PageTransition;