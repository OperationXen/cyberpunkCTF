import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper';

class CTFCategory2 extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.category.title}
        </div>
      </div>
    )
  }
}

class CTFCategory extends Component
{
    render(){
        return(
            <Paper>
                {this.props.category.title}
            </Paper>
        )
    }
}

export default CTFCategory