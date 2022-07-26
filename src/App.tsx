import React, { useState, Dispatch, SetStateAction } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

interface Column {
  id: 'name' | 'scope' | 'ticket'
  label: string
  minWidth?: number
  align?: 'right'
  link?: boolean
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Flag Name', minWidth: 170 },
  { id: 'scope', label: 'Scope', minWidth: 100 },
  { id: 'ticket', label: 'Ticket Link', minWidth: 100, link: true },
]

interface Data {
  name: string
  scope: string
  ticket: string
}

function createData(name: string, scope: string, ticket: string): Data {
  return { name, scope, ticket }
}

const rows = [
  createData(
    'ir-rad-navigation',
    'ir',
    'https://mui.com/material-ui/api/table/'
  ),
  createData(
    'ir-new-modules-navigation',
    'ir',
    'https://mui.com/material-ui/api/table/'
  ),
  createData(
    'ir-bears-on-bicycles',
    'ir',
    'https://mui.com/material-ui/api/table/'
  ),
  createData(
    'ir-pigs-with-spines',
    'ir',
    'https://mui.com/material-ui/api/table/'
  ),
]

function SearchBar({
  search,
  onSearchTermChange,
}: {
  search: string
  onSearchTermChange: Dispatch<SetStateAction<string>>
}) {
  return (
    <Box m={2}>
      <Typography variant="h6" gutterBottom>
        Search by name
      </Typography>
      <input
        type="text"
        value={search}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onSearchTermChange(event.target.value)
        }
        placeholder="Search for a flag"
      />
    </Box>
  )
}

function StickyHeadTable({ search }: { search: string }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter((row: Data) => row.name.includes(search))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.scope}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.link ? (
                            <Link href={value}>{value}</Link>
                          ) : (
                            value
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Some Flags
        </Typography>
        <SearchBar search={searchTerm} onSearchTermChange={setSearchTerm} />
        <StickyHeadTable search={searchTerm} />
      </Box>
    </Container>
  )
}

export default App
