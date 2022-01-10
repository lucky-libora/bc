import React, { FC } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { SymbolForm } from '../components/symbol-form'
import { QuotesList } from '../components/quotes-list'

export const IndexPage: FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={4} py={1}>
        <Typography variant="h3" color="white">
          Now you can track all your cryptos here!
        </Typography>
        <Typography variant="h5" color="rgb(255,255,255, 0.5)" mt={4}>
          Just enter the cryptocurrency code on the form to the right
        </Typography>
        <Box pt={6}>
          <QuotesList />
        </Box>
      </Grid>
      <Grid item xs={12} md={4} py={1}>
        <Box component="img" src="/figure.png" maxWidth="100%" />
      </Grid>
      <Grid item xs={12} md={4} px={{ sm: 1, md: 3 }} py={1}>
        <SymbolForm />
      </Grid>
    </Grid>
  )
}
