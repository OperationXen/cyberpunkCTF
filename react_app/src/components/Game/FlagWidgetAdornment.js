import React, {Component} from 'react'

import { Forward, HourglassFull, Error, Check } from "@material-ui/icons";
import { isFlowPredicate } from '@babel/types';

// Object Oriented Programming uses classes to represent objects. NOT functions.
class FlagWidgetAdornmentIcon extends Component {
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.correct === true){
            return(<Check />)
        } else if(this.props.correct === false) {
            return(<Error />)
        } else if(this.props.submitted === true) {
            return(<HourglassFull />)
        }
        return(<Forward />)
    }

}

export default FlagWidgetAdornmentIcon