import React from 'react'
import { ChromePicker } from 'react-color';


class ColorMenu extends React.Component {
    imgElement = React.createRef();

    state = {
        // red: "255",
        // green: "255",
        // blue: "255"
        color_obj: {r: this.props.R, g: this.props.G, b: this.props.B, a: this.props.A},
        background_image: "",
        moving: false,
        imgStyle: {opacity: '0.5', position: 'absolute'}

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

    handleBackgroundChange = (e) => {
        this.setState({background_image: e.target.value})
        this.props.handleBackgroundImage(e.target.value)
    }

    imageClicked = () => {
        this.setState({moving: true})
    }

    handleMouseMove = (e) => {
        if (this.state.moving) {
            let left = e.clientX - e.target.offsetWidth / 2
            let top = e.clientY - e.target.offsetHeight / 2
            this.setState({top: top, left: left})
            this.setState({imgStyle: {...this.state.imgStyle, left: `${this.state.left}px`, top: `${this.state.top}px`}})
        }
    }

    imageReleased = () => {
        this.setState({moving: false})
    }

    render () {
        return(
            <div className="ColorMenu">
                <div className="BackgroundColorMenu">
                   Background:<br></br>
                   Color:
                   <ChromePicker color={this.state.color_obj} onChange={ this.handleChange } />
                   Background Image:
                   <input type="text" value={this.state.background_image} onChange={this.handleBackgroundChange}></input>
                   <div style={{height: '200px', width: '100%', backgroundColor: "grey", position: 'relative', overflow: 'hidden'}}>
                        <div style={{height: `${this.props.height / 2}px`, width: `${this.props.width / 2}px`, backgroundColor: 'white', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}><img onMouseDown={this.imageClicked} onMouseUp={this.imageReleased} onMouseMove={this.handleMouseMove} style={{...this.state.imgStyle}} ref={this.imgElement} onLoad={() => this.setState({imgStyle: {...this.state.imgStyle, height: `${this.imgElement.current.naturalHeight / 2}px`, width: `${this.imgElement.current.naturalWidth / 2}px`}})} draggable="false" src={this.state.background_image}></img></div>
                   </div>
                </div>
            </div>
        )
    }
}

export default ColorMenu