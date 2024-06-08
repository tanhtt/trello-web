import ListColumns from './ListColumns/ListColumns'
import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/sorts'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useCallback, useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import {
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  closestCorners
} from '@dnd-kit/core'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

import { MouseSensor, TouchSensor } from '~/customLibs/DndKitSensors'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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

  //Just dnd either card or column in a time
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDragingCard, setOldColumnWhenDragingCard] = useState(null)

  useEffect(() => {
    setOrderedColumnState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumnState.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu kéo card thì mới thực hiện hoạt động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDragingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // console.log('handleDragOver: ', event)

    const { active, over } = event
    //To ensure if active and over are not exist => Dont do anything
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    // Find 2 colums of 2 cards
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không tồn tại 1 trong 2 column thì không làm gì cả
    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumnState(prevColumns => {
        const overCardIndex = overColumn.cards.findIndex(card => card._id === overCardId)

        // Logic calculate 'new card index'
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1: 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        //Clone old OrderedColumnState to new array to excute
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          // Delete card position in active column
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //Update cardOrderIds for data
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        if (nextOverColumn) {
          // Test that Is dragging card exist in over column yet, If there is so delete it
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // Add dragging card to overcolumn
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          //Update cardOrderIds for data
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }

  const handleDragEnd = (event) => {
    // console.log('handledragend ', event )
    const { active, over } = event

    if (!over) return

    // Xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      // Find 2 colums of 2 cards
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Nếu không tồn tại 1 trong 2 column thì không làm gì cả
      if (!activeColumn || !overColumn) return


      // Video 35
      if (oldColumnWhenDragingCard._id !== overColumn._id) {
        console.log('Hành động kéo thả card giũa 2 column khác nhau')
        setOrderedColumnState(prevColumns => {
          const overCardIndex = overColumn.cards.findIndex(card => card._id === overCardId)

          // Logic calculate 'new card index'
          let newCardIndex
          const isBelowOverItem = active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height
          const modifier = isBelowOverItem ? 1: 0
          newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

          //Clone old OrderedColumnState to new array to excute
          const nextColumns = cloneDeep(prevColumns)
          const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
          const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

          if (nextActiveColumn) {
            // Delete card position in active column
            nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

            //Update cardOrderIds for data
            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
          }

          if (nextOverColumn) {
            // Test that Is dragging card exist in over column yet, If there is so delete it
            nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

            // Đối với trường hợp drag end thì phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa hai column khác nhau
            const rebuild_activeDragingCardData = {
              ...activeDraggingCardData,
              columnId: nextOverColumn._id
            }

            // Add dragging card to overcolumn
            nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDragingCardData)

            //Update cardOrderIds for data
            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
          }

          return nextColumns
        })
      } else {
        // console.log('Hành động kéo thả card giũa 1 column')
        //Take old position from active item
        const oldCardIndex = oldColumnWhenDragingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        //Take new position from over item
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        // Dùng arraymove vì kéo card trong một column thì tương tự kéo column trong board content
        const dndOrderedCards = arrayMove(oldColumnWhenDragingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumnState(prevColumns => {
          // Clone mảng orderedColumnsState cũ ra một cái mới để xủ lý data rồi return -> rồi cập nhật lại cái mới
          const nextColumns = cloneDeep(prevColumns)

          // Tìm column mà chúng ta đang thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // Cập nhật lại 2 giá trị mới là card và cardOrderIds trong target column
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          console.log('target column: ', targetColumn)

          // Trả về giá trị state mới chuẩn vị trí
          return nextColumns
        })
      }
    }

    // Xử lý kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //Take old position from active item
        const oldColumnIndex = orderedColumnState.findIndex(c => c._id === active.id)
        //Take new position from over item
        const newColumnIndex = orderedColumnState.findIndex(c => c._id === over.id)
        //Use arrayMove from dnd-kit to sort columns
        // Src https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts
        const dndOrderedColumn = arrayMove(orderedColumnState, oldColumnIndex, newColumnIndex)
        // Sort for api backend
        // const dndOrderedColumnIds = orderedColumnState.map(c => c._id)
        // Update state column after dnd
        setOrderedColumnState(dndOrderedColumn)
      }
    }

    // Những dữ liệu sau khi kéo thả luôn phải đưa về giá trị null mặc định
    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setOldColumnWhenDragingCard(null)
  }

  // const collisionDetectionStrategy = useCallback((args) => {
  // }, [])

  return (
    <>
      <DndContext
        // Thuật toán phát hiện va trạm, dùng cloestCorners thay vì closetCenter (tìm hiểu trêm doc)
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd} onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        // Cảm biến (video 30)
        sensors={sensors}>
        <Box sx={{
          backgroundColor: 'primary.main',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          display: 'flex',
          p: '10px 0'
        }}>
          <ListColumns columns={orderedColumnState} />
          <DragOverlay>
            {!activeDragItemType && null}
            {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) &&
            <Column column={activeDragItemData} />}
            {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) &&
            <Card card={activeDragItemData} />}
          </DragOverlay>
        </Box>
      </DndContext>
    </>
  )
}

export default BoardContent