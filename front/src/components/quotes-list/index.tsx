import { FC } from 'react'
import { useQuotes, useRefreshQuotePeriodically, useRemoveQuote } from '../../store/quotes-slicer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { ReactComponent as IconSVG } from './icon.svg'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

export const QuotesList: FC = () => {
  const quotes = useQuotes()
  const removeQuote = useRemoveQuote()
  useRefreshQuotePeriodically()

  return (
    <List>
      {quotes.map((quote) => (
        <Box key={quote.symbol}>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                sx={{ color: 'white' }}
                onClick={() => removeQuote(quote.symbol)}
              >
                <CloseIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <IconSVG />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h5" color="white">
                  {quote.symbol}
                </Typography>
              }
              secondary={
                <Typography variant="h6" color="rgb(255,255,255,0.5)">
                  {formatPrice(quote.lastPrice)}
                </Typography>
              }
              sx={{ ml: 3 }}
            />
          </ListItem>
          <Divider variant="fullWidth" sx={{ borderColor: 'rgb(255,255,255,0.5)' }} />
        </Box>
      ))}
    </List>
  )
}

const formatPrice = (price: string) => {
  const [int, float] = price.split('.')

  return `${int}.${float.slice(0, 2)}`
}
