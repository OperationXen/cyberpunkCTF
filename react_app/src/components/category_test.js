import React, { Component } from 'react'
import CTFCategory from './category'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CATEGORIES_QUERY = gql`
    {
      allCategories{
        id
        title
        order
      }
    }
`;


class CTFCategoryTest extends Component {
  render() {
      return (
        <Query query={CATEGORIES_QUERY}>{
        ({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) {
                alert(error)
                return <div>Error</div>
            }

            const stuffToRender = data.allCategories

            return (
              <div>
                {stuffToRender.map(category => <CTFCategory key={category.id} category={category} />)}
              </div>
            )
          }}
        </Query>
      )
  }
}

export default CTFCategoryTest