import React, { Component } from "react";
import CTFCategory from "./category";
import CATEGORIES_QUERY from "../queries/categories.query";
import { Query } from "react-apollo";

const CTFCategoryTest = props => (
  <Query query={CATEGORIES_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching...</div>;
      if (error) return <div>Error: {error.message}</div>;

      return (
        <div>
          {data.allCategories.map(category => (
            <CTFCategory key={category.id} category={category} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default CTFCategoryTest;
