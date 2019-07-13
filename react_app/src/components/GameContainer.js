import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/grid'
import Paper from '@material-ui/core/paper'
import CTFCategory from './CTFCategory'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_ALL_CATEGORIES_QUERY = gql`
    {
      allCategories{
        id
        title
        order
      }
    }
`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing()
  },
}));

export default function FlagsContainer(props){
  const classes = useStyles();

  return(
    <div className={classes.root}>
        <Grid
            container
            spacing = {3}
            direction="row"
            justify="space-around"
            alignItems="center"
        >
            <Query query={GET_ALL_CATEGORIES_QUERY} pollInterval={60000}>{
                ({ loading, error, data }) => {
                  if (loading) return <div>Fetching</div>
                  if (error) return <div>Error</div>

                  return (
                      data.allCategories.map(category => <CTFCategory key={category.id} category={category} />)
                  )
            }}
            </Query>
        </Grid>
    </div>
  )
}