import { FC } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { TopBar } from './top-bar'
import { Footer } from './footer'

export const Layout: FC = ({ children }) => {
  return (
    <Box
      width="100%"
      height="100vh"
      sx={{
        backgroundImage: "url('/bg.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '160% 0',
        backgroundSize: '50%',
      }}
    >
      <Container maxWidth="xl">
        <TopBar />
        <Box mt={10}>{children}</Box>
      </Container>
      <Box mt={4}>
        <Footer />
      </Box>
    </Box>
  )
}
