import React from 'react'

class ColorMenu extends React.Component {

    state = {
        red: "255",
        green: "255",
        blue: "255"
    }

    redController = (e) => {
        this.setState({red: e.target.value})
        this.props.rgb['r'](e.target.value)
        this.props.rgb['u']()
    }

    greenController = (e) => {
        this.setState({green: e.target.value})
        this.props.rgb['g'](e.target.value)
        this.props.rgb['u']()
    }

    blueController = (e) => {
        this.setState({blue: e.target.value})
        this.props.rgb['b'](e.target.value)
        this.props.rgb['u']()
    }


    render () {
        return(
            <div className="ColorMenu">
                <div className="BackgroundColorMenu">
                    Background Color:
                   <input className="RedSlider" onChange={this.redController} type="range" min="0" max="255" value={this.state.red}></input>
                   <input className="GreenSlider" onChange={this.greenController} type="range" min="0" max="255" value={this.state.green}></input>
                   <input className="BlueSlider" onChange={this.blueController} type="range" min="0" max="255" value={this.state.blue}></input>
                </div>
            </div>
        )
    }
}

export default ColorMenu