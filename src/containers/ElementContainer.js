import React from 'react'
import CustomBar from './CustomBar'

class ElementContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            clicked: false
        }
    }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render () {
        return(
            <div id="CustomBarContainer" style={{left: this.state.clicked? "0px" : null}}>
                <CustomBar />
                <div id="SwingButtonContainer">
                    <button onClick={this.handleClick} id="SwingButton">{this.state.clicked? <img id="ReverseArrow" src="https://image.flaticon.com/icons/svg/32/32213.svg"></img> : <img id="ForwardArrow" src="https://image.flaticon.com/icons/svg/32/32213.svg"></img>}</button>
                </div>
            </div>
        )
    }
}

export default ElementContainer