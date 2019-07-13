import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(),
  },
  valueChip: {
    marginLeft: "-60%",
    marginTop: "-25%",
  }
}));

export default function ChallengeCard(props) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Chip 
          className={classes.valueChip} 
          size="small" 
          variant="outlined" 
          label={props.points ? props.points:" --- "}
          color="primary"
          avatar={<Avatar><AddIcon /></Avatar>}
        />
        <Typography variant="h6">{props.title}</Typography>
        <Divider />
        <Typography variant="body2">{props.slug}</Typography>
      </CardContent>
    </Card>
  )
}
