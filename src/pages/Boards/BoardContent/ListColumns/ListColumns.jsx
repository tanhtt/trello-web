import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button, TextField } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close'


function ListColumns({ columns, createNewColumn, createNewCard }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter column title!')
      return
    }

    // Create column data to call API
    const newColumnData = {
      title: newColumnTitle
    }

    /**
     * Gọi lên props function createNewColumn ở componenet cha cao nhât _id.jsx (bởi vì khi tạo column phải cập nhật board)
     * Sau khóa học này có thể tìm hiểu về Redux. Vì redux sẽ giúp chúng ta gọi luông API ở đây
     * không cần phải gọi từ nhiều tầng cha component như vậy, việc dùng redux sẽ giúp clear code hơn
     */

    await createNewColumn(newColumnData)

    // Close input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy} >
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
        {columns?.map(column => <Column key={column._id} column={column} createNewCard={createNewCard} />)}

        {/* Box Add New Column  */}
        {!openNewColumnForm
          ? <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              bgcolor: (theme) => (theme.palette.mode === 'dark'? '#333643' : '#ffffff3d'),
              minWidth: '250px',
              maxWidth: '250px',
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
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: (theme) => (theme.palette.mode === 'dark'? '#333643' : '#ffffff3d'),
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              id="outlined-input"
              label='Add a new column'
              type="text"
              size='small'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Button
                variant='contained'
                color='success'
                size='small'
                onClick={addNewColumn}
                sx={{
                  boxShadow:'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.light }
                }}
              >Add Column</Button>
              <CloseIcon
                fontSize='small'
                sx={{ color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns
