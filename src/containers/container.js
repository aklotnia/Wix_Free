import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from '../components/ItemTypes'

function Container (props) {
  const {x, y} = props

  let height = 200
  let width = 100
  let top = y
  let left = x

  const [hovered, setHovered] = React.useState(false)

  const [borderHovered, setBorderHovered] = React.useState(false)

  const [resizing, setResizing] = React.useState(false)
  const [lastClientX, setClientX] = React.useState(null)
  const [lastClientY, setClientY] = React.useState(null)
  const [moving, setMoving] = React.useState(false)
  
  const [style, setStyle] = React.useState({opacity: 1, fontSize: 25, fontWeight: 'bold', cursor: 'move', position: props.x? "absolute" : null, left: props.x? `${left}px` : null, top: props.y? `${top}px` : null, width: `${width}px`, height: `${height}px`})

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
    if (!moving || borderHovered || resizing) {
      return;
    }
    left = e.clientX - e.target.offsetWidth / 2
    top = e.clientY - e.target.offsetHeight / 2
        setStyle({...style, left: `${left}px`, top: `${top}px`})
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
    setClientY(e.clientY)
  };

  let handleMousemove = e => {
    if (!resizing) {
      return;
    }

    if (e.target.dataset.tag === "Bottom Right") {
        width = width + (e.pageX - lastClientX)
        height = height + (e.pageY - lastClientY)
        setStyle({...style, width: `${width}px`, height: `${height}px`})
    } else if (e.target.dataset.tag === "Top Right") {
        width = width + (e.pageX - lastClientX)
        height = height - (e.pageY - lastClientY)
        top = top + (e.pageY - lastClientY)
        setStyle({...style, width: `${width}px`, height: `${height}px`, top: `${top}px`})
    } else if (e.target.dataset.tag === "Top Left") {
        width = width - (e.pageX - lastClientX)
        height = height - (e.pageY - lastClientY)
        left = left + (e.pageX - lastClientX)
        top = top + (e.pageY - lastClientY)
        setStyle({...style, width: `${width}px`, height: `${height}px`, top: `${top}px`, left: `${left}px`})
    } else if (e.target.dataset.tag === "Bottom Left") {
        width = width - (e.pageX - lastClientX)
        height = height + (e.pageY - lastClientY)
        left = left + (e.pageX - lastClientX)
        setStyle({...style, width: `${width}px`, height: `${height}px`, left: `${left}px`})
    }
  };

let handleMouseup = e => {
    setResizing(false)
    setClientY(null)
    setClientX(null)
  };

let conditionChecker = () => {
    if (hovered || borderHovered) {
        return null
    } else {
        return drag
    }
}

let renderHover = () => {
    if (hovered) {
        return (
            <div className="InternalBorders">
                <div className="BorderDot" data-tag="Top Left" onMouseDown={handleMousedown} onMouseUp={handleMouseup} onMouseMove={handleMousemove} onMouseEnter={handleBorderEnter} onMouseLeave={handeBorderLeave} style={{top: '-5px', left: '-5px'}}></div>
                <div className="BorderDot" data-tag="Top Right" onMouseDown={handleMousedown} onMouseUp={handleMouseup} onMouseMove={handleMousemove} onMouseEnter={handleBorderEnter} onMouseLeave={handeBorderLeave} style={{top: '-5px', right: '-5px'}}></div>
                <div className="BorderDot" data-tag="Bottom Right" onMouseDown={handleMousedown} onMouseUp={handleMouseup} onMouseMove={handleMousemove} onMouseEnter={handleBorderEnter} onMouseLeave={handeBorderLeave} style={{bottom: '-5px', right: "-5px"}}></div>
                <div className="BorderDot" data-tag="Bottom Left" onMouseDown={handleMousedown} onMouseUp={handleMouseup} onMouseMove={handleMousemove} onMouseEnter={handleBorderEnter} onMouseLeave={handeBorderLeave} style={{bottom: '-5px', left: '-5px'}}></div>
            </div>
        )
    }
}

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseObjectMove} onMouseDown={handleMouseDownMove} onMouseUp={handleMouseUpMove} className="Container" ref={conditionChecker()} style={style}>
        {renderHover()}
    </div>
  )
}

export default Container