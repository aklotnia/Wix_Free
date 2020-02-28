import React from 'react'
import ColorMenu from './ColorMenu'

class ObjTools extends React.Component {

    state = {
        colorShow: false
    }

    colorMenuToggle = () => {
        this.setState({colorShow: !this.state.colorShow})
    }

    menuRender = () => {
        if (this.state.colorShow) {
            return <ColorMenu setStyle={this.props.setStyle} style={this.props.style} setBackgroundX={this.props.setBackgroundX} setBackgroundY={this.props.setBackgroundY} height={this.props.height} width={this.props.width} handleBackgroundImage={this.props.handleBackgroundImage} rgb={this.props.rgb} R={this.props.R} G={this.props.G} B={this.props.B} A={this.props.A} />
        } else {
            
        }
    }

    render () {
        return(
            <div className="ObjToolsContainer">
            <div className="ObjTools">
                <div onClick={this.colorMenuToggle} className="ToolGrid">
                    <div className="RGBCell">
                        <img className="RGB" src="https://image.flaticon.com/icons/png/512/186/premium/186297.png"></img>
                    </div>
                </div>
            </div>
            <div className="ActiveMenu">
                {this.menuRender()}
            </div>
            </div>
        )
    }
}

export default ObjTools