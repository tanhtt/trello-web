import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, Tooltip } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import AddCardIcon from '@mui/icons-material/AddCard'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
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
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
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
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              bgcolor: (theme) => (theme.palette.mode === 'dark'? '#333643':'#ebecf0'),
              ml: 2,
              borderRadius: '6px',
              height: 'fit-content',
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
            }}
          >
            {/* Box Column Header  */}
            <Box sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >Column Title</Typography>
              {/* Dropdown Column */}
              <Box>
                <Tooltip>
                  <ExpandMoreIcon
                    sx={{
                      color: 'text.primary',
                      cursor: 'pointer'
                    }}
                    id="basic-menu-column-dropdown"
                    aria-controls={open ? 'basic-column-dropdown' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id="basic-column-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-menu-column-dropdown'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddCardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* Box Column List  */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: '0 5px',
              m: '0 5px',
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(
              ${theme.trello.boardContentHeight} - 
              ${theme.spacing(5)} - 
              ${COLUMN_HEADER_HEIGHT} -
              ${COLUMN_FOOTER_HEIGHT}
            )`,
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIANQBJgMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAABAgMABAUG/9oACAEBAAAAAG1n6WUT7qDDKicvKs0mJooACgYe/ie2184XZmGlGMEaXLJMFUxGG+hZ4366CwO2LZJxXJzIvIJogUDD6um8y/YG6gcdtgkTl5OaUVGCoEVfsE4YdnRq9ObZWIySEOXmSa06pw50QLvr4cV1ava4opJ2CpzwnGMQ/bbi5ZhDvbaVbce6e5yCTgspRTot5vn68aMW5l5k9StCZ6va7sccqJGUk74+fduTPOE0A7Ho7XmKdL3YnKEIkISwhLQR8qL6IpSoCr0dVXJAwy8059FODm54qoO29PMWcsd02oThpZofPdftS5IcsswAUd7MSxYPS9wMxAy/I9f0UYRjLBFVN6BLMWfM1rKTgFHH8pb2O6U5pXki5UemzTqWVnemRjhkHi+bNfcyrbo82auxd012UvSh2JddFvN4Hn6NJ0vxSTa2UOyFmfPXq5uZazcR0GtpCtH6vOntlz5cXeZoy87P1TWHRza01BrVuVAMCp2bF2ovMXOpK+4zSeG6BIZyOXO9Kxk6OVRe/s4505OLLRuxccCjanBeYPZ08s1rMsvXuVvPwINd12VRPZl57PVOpOcHpSLuhz+YmV877s6duddNEuGaywVbJV6p0Jz+UwWjdEEf1OLdpHPhNBfsdMtcLTVeDkgc2NZ9fbxenxc1N7FPJTNf0ty9vBD1dM8XJxpIocXTdhT0X4IW9WkurpRZ+Yvd2+bxrzzZuVhgcV1+ndjPDj3o7rLpy8+5HQz5KxBZgFbBqO27OXpPNT6HwvY4dznz2XZeZ4noygDYOS/Y634r/wD/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/aAAoCAhADEAAAAHSeOpDUgNK6e2Nxri0MExhx9lxFQyAY0Gejq43w2xAYMDg7t8M9M6rNgmBna02y35qnm69stM6kOPrmxTSippMl5aU3GudTSjTSNMqnHXPXLUJczrDSacttFrfG82mmstU4uLRFXANTSNYw11nbGpaaZhqCaaFSAYhrbOKqaVTcoBgpaE4qbpMJuZu86UsLQgGhgITRQgJcXcWgl0gBNkgMAAik0wBq4AAQCaKTEAyLTBADQ5pMoUsyqHbycMNFYCGBLlUNY25xofQmmAIKEm0BIhU00hj1idZbFIFTIMBIActH/8QALxAAAgIBAwMDBAEEAgMAAAAAAQIAEQMSITEEQVEQEyIgMmFxgQUjQpEUoTNSYv/aAAgBAQABPwAGjGJYjxFahBk8TGA6X3HMoeYcHcQpmqtRIiYs2A2tMPEQ6uxH0GVCJRjAEVHHYRsRuzCghqEX2hUiFDCJXrplSvqqCKxW7G0U7zG0WrlGxKA9C03P01Cu0ZYw8mMtx8Ri4i3aHDpG80EGyLj8mjKlTTAhhEqMAUUjtsfSvoWuI2OtwIMRhBDETHquKpPELFVJMRtcPrX0D02PBBjAQkDtNzBqujHQ/uHCxuf8fyYcKhd6qXj/AMZueBCTDD9FSvTEmMrusYBbA4EtQCTsJkcNkJBsTHpYAKaMwHejdzMxY1ewmFe4h+mvooDgQ1GA1fiFR2NSx4jOAJkzeIS7d490NTehNmaZ7THtDjqFBNM0gQmH0QTIaO0y5idh6YAoO8R/lczH+5MJYDf0o/QxoXRP0XGFzRCJlbbaOWrmG4bh9MePWZSJsq2Ywe9wRHUiGEn0PoBcsVcyEK24BEdVBPbedPjXUNQBmbGiZAUFCI3YioQS5Io3vFAUC5Z7VBrJs7elkMBtRhajVH6iYWjsTDGP4hVvEe+8PpjyaDEUOoZWvyJotSsy+2DXyuMoE9ssLE9loEBmgTUo7RSzHazHLD5Q028Wh358SkZdFX5jocT127QMQbmMau8QUPUIt3UJIGwuD1uEwxoTDFx4tA3BMXEqqNqNTqEZhdD9+mmhZmXpWVkGMWSI+M4v8vl+Jh6p0PythC2Jjr9yj+REwq25a4aUeIzNe0LQi4RBme7pP9T3SwpjYi6DVmNSkUQQJ7wU8jeZnDv8SCAIoiNpMx5A017/AImoQH6TRFTjvGIMaEMeBcImlhuJiyAgFm52ozqFWhqhUE/Hb8TH04JLZgJYxgIzAVdDkw4nYk3Y88Rens7tf4EKYcdEILhzEHaM7HcwsZv6GoFMCtAMg7GXk3FQJYvSJ7a0DsD+hGUi5rER1gIIJUxYDt9VzjeMoMrSKEdVP3rZgx4yNh/MOFSRbxggve6iqWoqu0yHJjBJoz3lFnRv5j5yeBF6mlIKxsxPAmvyIKPBEKjyIQAPuELCEC+ZZMo+YrMvBl6ojAbGaxVEQ24q57L+LnBqpicjatjF/IFQfVUr0JImXIq7saBIH8mM2gWWr9moodiQGAv/ALidMoFudTRviu0yliNzZmi4yqP8hDXmE+KlmbmUZpM0mUZt5n8iAH0Bl3XoCRCVbkRfjA1xT9RhJEuHiMgYFWWwdiJ/Une8SHhdQ/ZBqf0wO+IC9kaFo7GthGLURGEZB2UTQJoHiDFCqzYf4wsfAmqWJUB/EBm0oSoPoUxDBGaapcBMuGbejEKrMeACTOp6s5jtjABct5+6dB1a4GCFBTkW0JWMVjRhCsKxQ1gAWTHtdmlSoRKlegH4lQKZXoBKlQCCJBGqACptLEuXLlnzOtzjD07k2ddpGDLsfwYjD2yCaZTanyJ0nXnNlbC/i0PmoWheM0LQtF+CsXYIe18x3xbjSSfMDEcRWv1qUPSp7q6q9KlT3EgZPMUqeDL3qBgtWY2WjQmu+8XJUOXihPc/+YMg8Q5AO0OVIcyT+rZgwwr23MdNbCje25EYOgpuBEdsWZHU7hhUbMSeZ7x7iHL+Icn4mHG2WzRodhzGdMK6GxPHo/aDCjDkEegNQEmb+IMz8aoMzf8AvPcJNkkxTZi5HX9T337GHIx5YzWIGED+IGfmEs0GqM2mBozC9IKX3s8RM61ZIsDee4gezVdo3UY22IMOTD31CM2EoWugI6rmz4iR8QwAW/JhwvryBQbU00x43910e7UMD+xEwZdY+ApTe/ee1Y+4XA6rs4jZEvYTG2MWAxsjmHP7a/eS1DtHy5G3tqgdkYEDeMzMd5c1RXAHE9xoxBOwlRahNDdYHI4M1mprJ7xbbYRldOYrETWTEdlPER6BZxQhb33yMuyqNo5ZUtiDq2r8CAmzvdzE6AlXXzvCzJpB4HaBse8OgAM/HYd2j5C54ArYAcCITrSh/kIrBsucrelmsfq47kdSrd3xi5py33uNkeqIFy7Nmd4i3Hx7Tph8mLbrUzYE06hU0WpP5hG/E28CXtwICO8Gm4agKiFvBl+qZCp2qHK7CjUv8QPULsKJtYxb4ln2O/mFLXWHWiaq6M1by6FkwMtiDN0+wdTAuAkaWujwZmCkltTaj5gBPaYcDuR+50mC8vU99DaZ1+NG9p186GmXKSdhprYia9Qoz4yx5gcxXet2gz70UqvEfrCQQIMxHHELEmX6A+hMuXLlyzKY8CCwdyJsYCRuKnumqYQ5cYUj27H7mruaqAqeFgTUNoEyAbrtNB7j+YCi8CM25YE99jFVkVTkyrj1/arC2Mz536VEGLMrN3DDcTocqI2QZcroGo2J1z9OUVcDlzdsTGy9IUtPd1VZFCJlx5AaDLt5u79K2lVMVdyNhHAFkVR49O8JilL3j+2TamBAR9wE1WdzCSNoMnmCjuDEwl2rUs/4uk0zCZMbIYAT3mg1yJZEGQwuT2EuuwqMICbnTZsgbSMIe4erwBimVHQzqMiOU9prFRdlLHJoQcs0DopVjm9vuGbd/wCFmbqy2UuhYNVau87wjaAxWZbomFQirkT9MPEV1zEaFJfRuIGsm/8AUBEJHmEwGF62A9BDNfGwHoq6wAOYyldjKikqdjMWvKau42CrpwY+FlF3OKuXfeJgdhYn2mjLEq4UKsQe0xMuK3B3jZjkyI5H2rUZQTChOLF+Hyv/AAqj0E7+g9EJBP6mNzjyAA6T2MHULlNZRVeRREyYAjET2bgx0ahShKjDaAUR+Ywl1FBuHG2MqYyqWDOTvvAmJlpT/MHTZWNLRi4cq7WiEf8AcyNnQ7mhDlNjcnzCxr9mzEZV7XBn0rdL+o5x5FtviYuO2IG8o3UK8RlIEWFCDU6oImNcdnWcS1XkmOArFV7bE+TODDzLmkmAN4MRwpIYbTqcVAMu61Fz6wpai68N5Hgzp8jlFR11KdlaORi1q7C0fQwG5/cQ4cnGTer2FiMlio2OoRxAPiv7MO5YRhTGAby/M1kd57pIqI7A7S2qEE8xkAqEGrlExceoGFGF35mPHEx0SSIBGExdOL3NAr3/ADMmTEHTDTM4ZVLGdYzJm2S2Uaz+L2HoIxqgYALuAwUTzUyYdeENX9weDeoTFl0hQzHTfEy4iuVkQEkHcCY3yJrpRvzq7HzF6hs6XiKh0ABU8NKdycmIUdRYjgqYOtIAsfMmJkx5tlKk91uHExr4H/UbHwKqFQGMKWbiIDGsGrnNwTEIFJmkVDhB4mTB8OwAFkmaMGNVGQP8h+jETA2+HILHKnkQ472tgTxaxMOVeUM9hhRJUCu5h8KjtYu1ELe24LI6/G1O3/cXKWXIzkDG5pEmRmLAMpOnixRAjZGp6JAc+fE38zfsJZDA3uJYq73uapYEwuceVWHnebBiOwMyP7RVlFll+RiLi6rG7MDrrcwF8Gf3DjrESVrys6oJhCsuKrj4TRcoFaqY3wZ7+bENOjGwHnGIP6p1dUMkH9Qzsw1nUvgzDpz4taMrDxpAqHFiUboP220FhRAvxJgUaTcRDpvQT+amFC7BRtcXp/jQFONjfBgxJYtxzUfPjDqEZSt0buLjTJR0KR2ozrMPTK/xZy4WyhJMxZejT78GTXYr/Ka0Q6S5FeWmtvcZaIU0bJh/uaiHoXTTXpsEqtKK3qZz7+LRp0sW83M7KLJHw4QrewWOxx2t/O94CCO1gUPwIKsmaqnPrVzzDQ7zWSbJmDPkw7I/xY20d8j5Fa0Um6ZSVBiYct2CW0m6/IijLSk7obY0Zk6Q5V+8KzbhStR+ldHZCgGncsOKhwkCztOlzZOmy6l3XusUu9HB7gSuFq7/ADE6VWRmL/6oxOlDXWVT5CzH0+HC26lyeIAqm2BJs1Zj5aUbDmrnuaw+gWBA2LImvEwbSTf5/RnVdSc1IthBOlfNifLjAYZrAFmgJ0fXPmtXWnU/IxupYXtp8AAsZmctk0kV+l0kysrE0SxUWNXO36h6rMqhma787wZ9IUV2a+4Nz33tiCSSKJPMS0Yk5qtd+9w+275Wy2Ae6b0Y4W6QmvzAoAmm4FAO8I7yhWxglHYD9xoNO28S0Ao6hvtZiuNDBW07D9G4ucplBrRA9hWxHT+LnvhCmMaWJxfeTpAvtC+XIqgH5ulm9JFTPiwhVP8A4yGOoapkwuqBkDMjcNp2Mx9b1GJAqMVjDLj+/MUSroGzQmLrcQVsagluE8mIRk2BN6e42JI/MCNsA+kKKN73KxIuosSPuuDqVLhUIqrCnadRlTKQlrRr25oIW2F6yVIHIoWDHUlhmXIMrilIZZryamLvVkaiRvEfO+7Pp5JiqXyaSK23sxcz4jSG3I5sbE95mPDEKSQGJrY33hFnazANN8XD5n6ggENjvApMNwS5xOTNMUbqoN+O28XbUGG/exHUgUNjtMa5C6ogstQ8XHpg+DIqjLZYEcr5SJm0OFdmpTdIe8xIrt7n/IRRdIHF/wANOvTq8ThXy61feZci5SLDagBuBZP5M0e9nXG7MRQidB02IfBSDXNxMz4urUrWxqMFz4+q1ov9s7VC7jNgQOwBWdQqjAmUKAxozBT4GLAH+9Uf+9izO2xUpxt9wiM1HfvASyOSSTazJmdiC1EqIuRiXJNnRqv8iYd9S9mFH81NZ1adiKA9MmwP79B2hAHE8iCEyz6HY/SCd5e635AnV/2m0L2Ipju0DNkXG7mzlxqz+GKkgGKQMPW4dKlUNr5Fzpelw5Okd2W2IJuLly5NCO7Mum6J8CdHbZnXWwpBP//EACURAAICAgIDAQABBQAAAAAAAAABAhEQIRIxAyBBUSITMkJhcf/aAAgBAgEBPwA4jWy2N33niVRGVCmv0U0L3cyDbbJ4fZRQh4si2Lk/okNpFr0XZyjGJLe/d0IiyJK612OVMg7Ray4tMf4RTJCdFrLwseOVIfkd6HKDX8nZt/22RgJVlj5GvpKJH0oYrG6I01sUINdCivwr/ZXo0hooqi6Ryw0PY4OqXZRETLfpZt+rzRGO1jhyeheNnFogirOLKZxj+FIcEOKOA4MUTgKBwQvGfExKumUNKzkk6ov30hiWKT+iW+yUj4KUdYZxWLLOsPkvopFloslVEY0Ntt+ilRZeLw2zY3JixovYmPyLlSEMvMuS6IyssWEsSnFdsXkUnUWciU5R6ix+ef4heabdVoS3h5st2PW0xSTJJtfxdMqS7mf1PLTalZKUn3JkVy+MVxQtlIq/mikivZopPY4oVr6a/B9FKl/wlpo/yYsfMv1eWM//xAAkEQACAgEDBQADAQAAAAAAAAAAAQIREhAgIQMwMUFRIjJhgf/aAAgBAwEBPwAU6rS9K0sUrHFSHBj6bHvxOpSSE+CuNyZZJKuSWK8RGxJsxe1qUpEfg+FuTek0SI1kr8CSa4Jop6qaaF9JNCGnb2IQ3p1I27Qukq5FCaf4KkcR/ev8JTT8Dd6qvrFiX8E7JbUOkIlafA+pNPyOTfll/wA2psUjIu9K1ToyViokNFLZQ6RWq2WhtUUOeKH1EZWSZZZaMn90yZkzIUzIzHIzZm/R7aG78libEm1fZraoHuzFlaW9K2cFbF5GxJJLY12ON2O5UNIraotmP0xFFMwRikPsUxM4+FREkjkaPBb7K0yaGU/ovYj0z0I9nrtez4I//9k='
                  title="green iguana"
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>
          TPS Controller
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                  <Button size="small" startIcon={<GroupIcon/>}>15</Button>
                  <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                  <Button size="small" startIcon={<AttachmentIcon/>}>15</Button>
                </CardActions>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>
          Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>
          Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>
          Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>
          Card 01
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>
          Card 01
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Box Column Footer  */}
            <Box sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button startIcon={<AddCardIcon/>} sx={{ color: 'text.primary' }} >Add a card</Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }}/>
              </Tooltip>
            </Box>
          </Box>

          {/* Box Column 2 */}
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              bgcolor: (theme) => (theme.palette.mode === 'dark'? '#333643':'#ebecf0'),
              ml: 2,
              borderRadius: '6px',
              height: 'fit-content',
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
            }}
          >
            {/* Box Column Header  */}
            <Box sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >Column Title</Typography>
              {/* Dropdown Column */}
              <Box>
                <Tooltip>
                  <ExpandMoreIcon
                    sx={{
                      color: 'text.primary',
                      cursor: 'pointer'
                    }}
                    id="basic-menu-column-dropdown"
                    aria-controls={open ? 'basic-column-dropdown' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id="basic-column-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-menu-column-dropdown'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddCardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add new card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archive this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* Box Column List  */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: '0 5px',
              m: '0 5px',
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(
              ${theme.trello.boardContentHeight} - 
              ${theme.spacing(5)} - 
              ${COLUMN_HEADER_HEIGHT} -
              ${COLUMN_FOOTER_HEIGHT}
            )`,
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image='data:image/jpeg;base64,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'
                  title="green iguana"
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>
          TPS Controller
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                  <Button size="small" startIcon={<GroupIcon/>}>15</Button>
                  <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                  <Button size="small" startIcon={<AttachmentIcon/>}>15</Button>
                </CardActions>
              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>
          Card 01
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Box Column Footer  */}
            <Box sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button startIcon={<AddCardIcon/>} sx={{ color: 'text.primary' }} >Add a card</Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }}/>
              </Tooltip>
            </Box>
          </Box>
        </Box>

      </Box>
    </>
  )
}

export default BoardContent