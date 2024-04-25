import { Chip } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Tooltip from '@mui/material/Tooltip'
import * as React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function BoardBar() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Tooltip px={0} title="Board">
        <Chip
          sx={{
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
              fontSize: '1rem',
              fontWeight: 'bold'
            }
          }}
          icon={<DashboardIcon/>}
          label='Board'
        />
      </Tooltip>

      <Box sx={{ margin: 0 }}>
        <Tooltip title="View Mode">
          <IconButton
            onClick={handleClick}
            size="medium"
            sx={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: 'none'
            }}
            aria-controls={open ? 'basic-view-mode' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <ExpandMoreIcon sx={{ color: 'primary.main' }}/>
          </IconButton>
        </Tooltip>
        <Menu
          id="basic-view-mode"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button-view-mode'
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </>
  )
}

export default BoardBar