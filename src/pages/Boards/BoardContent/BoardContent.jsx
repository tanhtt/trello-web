import ListColumns from './ListColumns/ListColumns'
import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import {
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

function BoardContent({ board }) {
  // https://docs.dndkit.com/api-documentation/sensors
  // Require mouse move 10px then active event dnd
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance:10 } })

  // Hold 250ms and move 5px to active event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  // Require mouse move 10px then active event dnd
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance:10 } })
  const sensors = useSensors(touchSensor, mouseSensor)

  const [orderedColumnState, setOrderedColumnState] = useState([])

  useEffect(() => {
    setOrderedColumnState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('handledragend ', event )
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      //Take old position from active item
      const oldIndex = orderedColumnState.findIndex(c => c._id === active.id)
      //Take new position from over item
      const newIndex = orderedColumnState.findIndex(c => c._id === over.id)

      //Use arrayMove from dnd-kit to sort columns
      // Src https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts
      const dndOrderedColumn = arrayMove(orderedColumnState, oldIndex, newIndex)
      // Sort for api backend
      // const dndOrderedColumnIds = orderedColumnState.map(c => c._id)

      // Update state column after dnd
      setOrderedColumnState(dndOrderedColumn)
    }
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <Box sx={{
          backgroundColor: 'primary.main',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          display: 'flex',
          p: '10px 0'
        }}>
          <ListColumns columns={orderedColumnState} />
        </Box>
      </DndContext>
    </>
  )
}

export default BoardContent