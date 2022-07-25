import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import './App.css'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container className="App" maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Some Flags
        </Typography>
        <button onClick={() => setCount((count) => count + 1)}>
          chount is {count}
        </button>
        <Copyright />
      </Box>
    </Container>
  )
}

export default App
