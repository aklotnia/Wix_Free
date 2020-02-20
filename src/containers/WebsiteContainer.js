import React, { useState } from 'react'
import ItemTypes from '../components/ItemTypes'
import { useDrop } from 'react-dnd'
import Container from '../containers/container'

const components = {
    "Container": Container
};

function WebsiteContainer() {


        const [draggedItems, addItem] = useState([])
        const [, drop] = useDrop({
            accept: ItemTypes.CONTAINER,
            drop(item, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset()
                let left = Math.round(item.x + delta.x)
                let top = Math.round(item.y + delta.y)
                const ComponentName = components[item.type]
                addItem([...draggedItems, <ComponentName key={Math.random()} x={left} y={top} placed={true} />])
            },
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            }),
        })
        const [cursorX, changeX] = useState(null)
        const [cursorY, changeY] = useState(null)

        let handleMouseMove = (e) => {
            e.persist()
            changeX(e.pageX)
            changeY(e.pageY)
        }

        return(
            <div onMouseMove={handleMouseMove} id="WebsiteContainer" ref={drop}>
                <div id="RelativeContainer">
                    {draggedItems}
                </div>
            </div>
            // <DndProvider backend={Backend} id="WebsiteContainer">...</DndProvider>

        )
}

export default WebsiteContainer