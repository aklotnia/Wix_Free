import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from '../components/ItemTypes'
import ObjTools from '../containers/ObjTools'

function Container (props) {
  const {x, y} = props

  let [R, setRed] = React.useState("255")
  let [G, setGreen] = React.useState("255")
  let [B, setBlue] = React.useState("255")
  let [height, setHeight] = React.useState(200)
  let [width, setWidth] = React.useState(100)
  let [top, setTop] = React.useState(y);
  let [left, setLeft] = React.useState(x);

  const [hovered, setHovered] = React.useState(false)

  const [borderHovered, setBorderHovered] = React.useState(false)
  const [active, setActive] = React.useState(false)

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

  let updateColor = () => {
      setStyle({...style, backgroundColor: `rgb(${R}, ${G}, ${B})`})
  }

  let handleMouseEnter = () => {
      if (props.placed) {
        let borderStyle = {borderColor: 'rgba(17,113,186, 0.5)'}
        setStyle({...style, ...borderStyle})
        setHovered(true)
      }
  }

  let handleMouseLeave = () => {
    if (!active) {
        if (props.placed) {
        let borderStyle = {borderColor: "rgba(0,0,0, 1)"}
        setStyle({...style, ...borderStyle})
        setHovered(false)
        }
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
    if (!moving || borderHovered || resizing) {
      return;
    }
    left = e.clientX - e.target.offsetWidth / 2
    top = e.clientY - e.target.offsetHeight / 2
    setTop(top)
    setLeft(left)
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

    let new_width
    let new_height
    let new_top
    let new_left

    if (e.target.dataset.tag === "Bottom Right") {
        new_width = width + (e.pageX - lastClientX)
        new_height = height + (e.pageY - lastClientY)
        setStyle({...style, width: `${new_width}px`, height: `${new_height}px`})
    } else if (e.target.dataset.tag === "Top Right") {
        new_width = width + (e.pageX - lastClientX)
        new_height = height - (e.pageY - lastClientY)
        new_top = top + (e.pageY - lastClientY)
        setStyle({...style, width: `${new_width}px`, height: `${new_height}px`, top: `${new_top}px`})
    } else if (e.target.dataset.tag === "Top Left") {
        new_width = width - (e.pageX - lastClientX)
        new_height = height - (e.pageY - lastClientY)
        new_left = left + (e.pageX - lastClientX)
        new_top = top + (e.pageY - lastClientY)
        setStyle({...style, width: `${new_width}px`, height: `${new_height}px`, top: `${new_top}px`, left: `${new_left}px`})
    } else if (e.target.dataset.tag === "Bottom Left") {
        new_width = width - (e.pageX - lastClientX)
        new_height = height + (e.pageY - lastClientY)
        new_left = left + (e.pageX - lastClientX)
        setStyle({...style, width: `${new_width}px`, height: `${new_height}px`, left: `${new_left}px`})
    }
  };

let handleMouseup = e => {
    let finalElement = e.target.parentNode.parentNode
    setResizing(false)
    setHeight(parseInt(finalElement.style.height))
    setWidth(parseInt(finalElement.style.width))
    setLeft(parseInt(finalElement.style.left))
    setTop(parseInt(finalElement.style.top))
  };

let conditionChecker = () => {
    if (hovered || borderHovered) {
        return null
    } else {
        return drag
    }
}

let toggleActive = () => {
    if (props.placed) {
        setActive(!active)
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
    <div className="ContainerContainer">
    <div onDoubleClick={toggleActive} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseObjectMove} onMouseDown={handleMouseDownMove} onMouseUp={handleMouseUpMove} className="Container" ref={conditionChecker()} style={style}>
        {renderHover()}
    </div>
    {active? <ObjTools rgb={{r: setRed, g: setGreen, b: setBlue, u: updateColor}}/> : null}
    </div>
  )
}

export default Container