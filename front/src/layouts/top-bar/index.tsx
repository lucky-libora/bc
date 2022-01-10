import { FC } from 'react'
import { ReactComponent as LogoSVG } from './logo.svg'
import Box from '@mui/material/Box'

export const TopBar: FC = () => {
  return (
    <Box pt={4}>
      <LogoSVG />
    </Box>
  )
}
