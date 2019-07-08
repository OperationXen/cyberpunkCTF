import React, { Component } from 'react'

class CTFCategory extends Component {
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

export default CTFCategory