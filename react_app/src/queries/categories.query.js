import gql from "graphql-tag";

export default gql`
  {
    allCategories {
      id
      title
      order
    }
  }
`;
