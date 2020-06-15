import React from 'react';
//gatsby
import { graphql, Link, useStaticQuery } from 'gatsby';
//styles
import styled from 'styled-components';
//components
import Heading from 'components/ui/heading';

//styled
const ArchiveWrap = styled.section`
  position: relative;
`;

const ArchiveLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin-bottom: 10px;
    a {
      display: inline-block;
      color: rebeccapurple;
      line-height: 1.5;
      border-bottom: 1px solid transparent;
      &:hover,
      &:focus,
      &:active {
        border-color: rebeccapurple;
      }
    }
  }
`;

const Archive = () => {

  //graphql query
  //graphql query
  const data = useStaticQuery(graphql`
    query {
      wordPress {
        posts {
          edges {
            node {
              id
              slug
              title
            }
          }
        }
      }
    }
  `);

  return (
    <ArchiveWrap>
      <Heading as="h2" heading4>Archives</Heading>
      <ArchiveLinks>
        {data.wordPress.posts.edges.map((post) => (
          <li key={post.node.id}>
            <Link to={'../' + post.node.slug}>{post.node.title}</Link>
          </li>
        ))}
      </ArchiveLinks>
    </ArchiveWrap>
  );
};

export default Archive;