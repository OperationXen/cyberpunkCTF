import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0.5em",
  },
  divider: {
    margin: "0.2em",
  },
}));

export default function ChallengeCard(props){
    const classes = useStyles()

    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography>{props.title}</Typography>
                    <Divider />
            </CardContent>
        </Card>
    )
}
