import React from 'react'
import { ChromePicker } from 'react-color';


class ColorMenu extends React.Component {

    state = {
        // red: "255",
        // green: "255",
        // blue: "255"
        color_obj: {r: this.props.R, g: this.props.G, b: this.props.B, a: this.props.A}

    }

    // redController = (e) => {
    //     this.setState({red: e.target.value})
    //     this.props.rgb['r'](e.target.value)
    //     this.props.rgb['u']()
    // }

    // greenController = (e) => {
    //     this.setState({green: e.target.value})
    //     this.props.rgb['g'](e.target.value)
    //     this.props.rgb['u']()
    // }

    // blueController = (e) => {
    //     this.setState({blue: e.target.value})
    //     this.props.rgb['b'](e.target.value)
    //     this.props.rgb['u']()
    // }

    handleChange = (color, event) => {
        this.setState({color_obj: color.rgb})
        this.props.rgb['r'](color.rgb.r)
        this.props.rgb['g'](color.rgb.g)
        this.props.rgb['b'](color.rgb.b)
        this.props.rgb['a'](color.rgb.a)
        this.props.rgb['u']()
      }


    render () {
        return(
            <div className="ColorMenu">
                <div className="BackgroundColorMenu">
                    Background Color:
                   {/* <input className="RedSlider" onChange={this.redController} type="range" min="0" max="255" value={this.state.red}></input>
                   <input className="GreenSlider" onChange={this.greenController} type="range" min="0" max="255" value={this.state.green}></input>
                   <input className="BlueSlider" onChange={this.blueController} type="range" min="0" max="255" value={this.state.blue}></input> */}
                   <ChromePicker color={this.state.color_obj} onChange={ this.handleChange } />
                </div>
            </div>
        )
    }
}

export default ColorMenu