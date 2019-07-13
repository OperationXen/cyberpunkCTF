import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

class CTFCategory extends Component
{
    render(){
        return(
            <Grid item>
                <Paper>
                    {this.props.category.title}
                </Paper>
            </Grid>
        )
    }
}

export default CTFCategory