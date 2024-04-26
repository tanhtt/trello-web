import { Chip } from '@mui/material'
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ModeStar from './ModeStar'
import ModeVisibility from './ModeVisibility'
import ModeView from './ModeView'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'primary.main',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root':{
    color: 'primary.main'
  },
  '&:hover':{
    opacity: '0.7'
  },
  '& .MuiChip-label':{
    fontSize: '1.5rem',
    fontWeight: 'bold'
  }
}

function BoardBar() {
  return (
    <>
      <Box px={2} sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid #ccc'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<DashboardIcon/>}
            label='Project 02'
            clickable
            sx={MENU_STYLES}
          />
          <ModeStar />
          <ModeVisibility />
          <ModeView />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="outlined" startIcon={<PersonAddIcon/>}>Invite</Button>
          <AvatarGroup max={4} sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}>
            <Tooltip title="tanhtt">
              <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/bd/75/45/bd7545bf214a1ced56918e5bc43319f9.jpg" />
            </Tooltip>
            <Tooltip title="tanhtt">
              <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/bd/75/45/bd7545bf214a1ced56918e5bc43319f9.jpg" />
            </Tooltip>
            <Tooltip title="tanhtt">
              <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/bd/75/45/bd7545bf214a1ced56918e5bc43319f9.jpg" />
            </Tooltip>
            <Tooltip title="tanhtt">
              <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/bd/75/45/bd7545bf214a1ced56918e5bc43319f9.jpg" />
            </Tooltip>
            <Tooltip title="tanhtt">
              <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/bd/75/45/bd7545bf214a1ced56918e5bc43319f9.jpg" />
            </Tooltip>
            <Tooltip title="tanhtt">
              <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/bd/75/45/bd7545bf214a1ced56918e5bc43319f9.jpg" />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </>
  )
}

export default BoardBar