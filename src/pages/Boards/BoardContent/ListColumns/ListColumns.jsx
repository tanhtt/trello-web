import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns() {
  return (
    <Box
      sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}
    >
      {/* Box Column  */}
      <Column/>
      <Column/>

      {/* Box Add New Column  */}
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark'? '#333643' : '#ffffff3d'),
          minWidth: '200px',
          maxWidth: '200px',
          height: 'fit-content',
          borderRadius: '6px',
          mx: 2
        }}
      >
        <Button
          startIcon={<NoteAddIcon />}
          sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'start',
            pl: 2.5,
            py: 1
          }}>
          Add New Column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns
