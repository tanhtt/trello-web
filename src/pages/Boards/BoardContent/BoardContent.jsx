import ListColumns from './ListColumns/ListColumns'
import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
        <ListColumns/>
      </Box>
    </>
  )
}

export default BoardContent