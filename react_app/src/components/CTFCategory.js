import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

import ChallengeCard from './ChallengeCard'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.3)
  },
}));

export default function CTFCategory(props)
{
    const classes = useStyles();

    return(
        <Grid item xs={6}>
            <Paper className={classes.root}>
                <Typography>{props.category.title}</Typography>
                <Divider variant="middle" />
                <Grid
                    container
                    spacing = {3}
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                >
                    <Grid item xs={3}>
                        <ChallengeCard title={"herp"} />
                    </Grid>
                    <Grid item xs={3}>
                        <ChallengeCard title={"derp"} />
                    </Grid>
                    <Grid item xs={3}>
                        <ChallengeCard title={"pew pew"} />
                    </Grid>
                </Grid>
                <Divider variant="middle" />
                <Typography>
                    I get knocked down, but I get up again, you aint ever gonna keep me down
                </Typography>
            </Paper>
        </Grid>
    )
}
