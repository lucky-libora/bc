import Box from '@mui/material/Box'
import { FC } from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

export const Footer: FC = () => {
  return (
    <Box width="100%" bgcolor="white" py={7}>
      <Container maxWidth="xl">
        <Typography color="gray">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>
      </Container>
    </Box>
  )
}
