import * as React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import ToggleButton from '@mui/material/ToggleButton'

export default function ModeStar() {
  const [selected, setSelected] = React.useState(false)

  const icon = selected ? <StarIcon /> : <StarBorderIcon />

  return (
    <ToggleButton
      sx={{
        border: 'none',
        '& .MuiSvgIcon-root':{
          color: 'primary.main'
        }
      }}
      size='small'
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected)
      }}
    >
      {icon}
    </ToggleButton>
  )
}
