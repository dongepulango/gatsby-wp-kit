import React from 'react';
//gatsby
import { graphql } from 'gatsby';
//styles
import styled from 'styled-components';
import { rem } from 'polished';
//components
import SEO from 'components/utils/seo';
import Layout from 'components/ui/layout';
import Container from 'components/ui/container';
import Heading from 'components/ui/heading';
import Archive from 'components/blog/archive';
//moment
import Moment from 'react-moment';
//grid
import { Row, Col } from 'styled-bootstrap-grid';

//styled
const PostWrap = styled.section`
  position: relative;
  padding-top: ${rem('100px')};
  padding-bottom: ${rem('100px')};
  h1 {
    margin-bottom: 5px;
  }
  .date {
    color: #999;
    margin-bottom: 30px;
  }
`;

const PostContent = styled.div`
  position: relative;
  
  p {
    font-size: ${rem('18px')};
    line-height: 1.6;
  }
`;

const Post = ({ data:{ wordPress } }) => {
  return (
    <Layout>
      <SEO title={wordPress.post.title} />
      <PostWrap>
        <Container>
          <Heading heading1>{wordPress.post.title}</Heading>
          <p className="date">
            <Moment format="MMMM DD, YYYY" withTitle>
              {wordPress.post.date}
            </Moment>
          </p>
          <Row>
            <Col md={8}>
              <PostContent dangerouslySetInnerHTML={{ __html: wordPress.post.content }} />
            </Col>
            <Col md={4}>
              <Archive />
            </Col>
          </Row>
        </Container>
      </PostWrap>
    </Layout>
  );
};

//query
export const query = graphql`
  query PostQuery($id: ID!) {
    wordPress {
      post(id: $id) {
        id
        title
        slug
        date
        content
      }
    }
  }
`;

export default Post;