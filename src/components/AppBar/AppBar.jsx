import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/mdi--trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Templates from './Menus/Templates'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profile'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <>
      <Box px={2} sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'primary.main' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }} />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Trello</Typography>
          </Box>
          <Workspaces/>
          <Recent />
          <Starred />
          <Templates />

          <Button variant="outlined">Create</Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            id="outlined-input"
            label='Search'
            type="text"
            size='small'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              minWidth: '120px',
              maxWidth: '180px',
              '& label': { color: 'primary.main' },
              '& input': { color: 'primary.main' },
              '& label.Mui-focused': { color: 'primary.main' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'primary.main' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <CloseIcon
                    fontSize='small'
                    sx={{ color: searchValue ? 'primary.main' : 'transparent', cursor: 'pointer' }}
                    onClick={() => setSearchValue('')}
                    edge="end"
                  />
                </InputAdornment>
              )
            }}
          />
          <ModeSelect/>

          <Tooltip title="Notifications" sx={{ cursor: 'pointer' }}>
            <Badge color="secondary" variant="dot">
              <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
            </Badge>
          </Tooltip>

          <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'primary.main' }}/>
          </Tooltip>

          <Profile/>
        </Box>
      </Box>
    </>
  )
}

export default AppBar