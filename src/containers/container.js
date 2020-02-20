import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from '../components/ItemTypes'

function Container (props) {
  const {x, y} = props

  const [hovered, setHovered] = React.useState(false)

  const [borderHovered, setBorderHovered] = React.useState(false)

  const [resizing, setResizing] = React.useState(false)
  const [lastClientX, setClientX] = React.useState(null)
  const [moving, setMoving] = React.useState(false)
  
  const [style, setStyle] = React.useState({opacity: 1, fontSize: 25, fontWeight: 'bold', cursor: 'move', position: props.x? "absolute" : null, left: props.x? `${props.x}px` : null, top: props.y? `${props.y}px` : null, width: '100px'})

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CONTAINER, x, y },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  let handleMouseEnter = () => {
      if (props.placed) {
        let borderStyle = {borderColor: 'rgba(17,113,186, 0.5)'}
        setStyle({...style, ...borderStyle})
        setHovered(true)
      }
  }

  let handleMouseLeave = () => {
    if (props.placed) {
      let borderStyle = {borderColor: "rgba(0,0,0, 1)"}
      setStyle({...style, ...borderStyle})
      setHovered(false)
    }
  }

  let handleMouseDownMove = () => {
    if (props.placed) {
        setMoving(true)
        setStyle({...style, cursor: 'none'})
    }
  }

  let handleMouseUpMove = () => {
    if (props.placed) {
        setMoving(false)
        setStyle({...style, cursor: 'move'})
    }
  }

  let handleMouseObjectMove = e => {
    // we don't want to do anything if we aren't resizing.
    if (!moving) {
      return;
    }
    let offsetRight = e.clientX - e.target.offsetWidth / 2
    let offsetTop = e.clientY - e.target.offsetHeight / 2
        setStyle({...style, left: `${offsetRight}px`, top: `${offsetTop}px`})
  };

  let handleBorderEnter = () => {
    if (props.placed) {
        setBorderHovered(true)
    }
  }

  let handeBorderLeave = () => {
      if (props.placed) {
          setBorderHovered(false)
      }
  }

  let handleMousedown = e => {
    setResizing(true)
    setClientX(e.clientX)
  };

  let handleMousemove = e => {
    // we don't want to do anything if we aren't resizing.
    if (!resizing) {
      return;
    }
    
    // debugger
    //   this.setState({ newWidth: { width: offsetRight } });
        setStyle({...style, left: `${e.clientX}px`, top: `${e.clientY}px`})
  };

let handleMouseup = e => {
    setResizing(false)
  };

let cursorStyle = 'grabbing'

let conditionChecker = () => {
    if (hovered || borderHovered) {
        return null
    } else {
        return drag
    }
}


  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseObjectMove} onMouseDown={handleMouseDownMove} onMouseUp={handleMouseUpMove} className="Container" ref={conditionChecker()} style={style}>
        {hovered? <div className="InternalBorders"><div className="BorderDot" style={resizing? {cursor: 'grabbing'} : null} onMouseDown={handleMousedown} onMouseUp={handleMouseup} onMouseMove={handleMousemove} onMouseEnter={handleBorderEnter} onMouseLeave={handeBorderLeave} style={{top: '-5px', left: '-5px'}}></div><div className="BorderDot" onMouseEnter={handleBorderEnter} onMouseLeave={handeBorderLeave} style={{top: '-5px', right: '-5px'}}></div><div className="BorderDot" onMouseEnter={handleBorderEnter} onMouseLeave={handeBorderLeave} style={{bottom: '-5px', right: "-5px"}}></div><div className="BorderDot" onMouseEnter={handleBorderEnter} onMouseLeave={handeBorderLeave} style={{bottom: '-5px', left: '-5px'}}></div></div> : null}
    </div>
  )
}


  
export default Container
