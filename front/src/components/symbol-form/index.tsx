import { FC } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAddQuote } from '../../store/quotes-slicer'

export const SymbolForm: FC = () => {
  const addQuote = useAddQuote()

  const formik = useFormik({
    initialValues: {
      symbol: '',
    },
    validationSchema: Yup.object().shape({
      symbol: Yup.string().min(3),
    }),
    onSubmit: ({ symbol }, { resetForm }) => {
      addQuote(symbol)

      resetForm()
    },
  })

  return (
    <Card sx={{ px: { xs: 1, md: 3 } }}>
      <CardContent>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <TextField
            name="symbol"
            variant="outlined"
            label="Cryptocurrency code"
            fullWidth
            sx={{ mt: 3 }}
            onChange={formik.handleChange}
            value={formik.values.symbol}
          />
          <Box mt={3}>
            <Button variant="contained" fullWidth type="submit" disabled={formik.touched && !formik.isValid}>
              Add
            </Button>
          </Box>
          <Box mt={8} textAlign="center">
            <Typography color="gray">Use this service is subject to terms and conditions</Typography>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}
