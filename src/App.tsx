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
  id: 'name' | 'functionName' | 'tickets' | 'isFuture' | 'repo'
  label: string
  minWidth?: number
  align?: 'right'
  link?: boolean
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Flag Name', minWidth: 170 },
  { id: 'functionName', label: 'Function Name', minWidth: 100 },
  { id: 'tickets', label: 'Ticket Links', minWidth: 100 },
  { id: 'isFuture', label: 'Is Future', minWidth: 100 },
  { id: 'repo', label: 'Repository', minWidth: 100 },
]

interface Data {
  name: string
  functionName: string
  tickets: Array<string>
  isFuture: boolean
  repo: string
}

function createData(
  name: string,
  functionName: string,
  tickets: string[],
  isFuture: boolean,
  repo: string
): Data {
  return { name, functionName, tickets, isFuture, repo }
}

const rows = [
  createData(
    'enable-issue-management',
    'issuesManagementEnabled',
    ['https://mui.com/material-ui/api/table/'],
    true,
    'audit'
  ),
  createData(
    'ir-enable-test-steps-improvements',
    'testStepsImprovementsEnabled',
    ['https://mui.com/material-ui/api/table/'],
    true,
    'audit'
  ),
  createData(
    'ir-pendo-resource-center',
    'isFreeTrialEnabled',
    ['https://mui.com/material-ui/api/table/'],
    false,
    'audit'
  ),
  createData(
    'ir-remove-sox-admin-header',
    'isRemoveSoxAdminHeader',
    ['https://mui.com/material-ui/api/table/'],
    true,
    'audit'
  ),
  createData(
    'ir-list-filter-sort',
    'folderListFilterSortEnabled',
    ['https://mui.com/material-ui/api/table/'],
    true,
    'audit'
  ),
  createData(
    'ir-enable-issue-form-with-graph-form-module',
    'actionPlanGraphFormModuleV3Enabled',
    ['https://mui.com/material-ui/api/table/'],
    false,
    'audit'
  ),
  createData(
    'ir-enable-issue-form-with-graph-form-module',
    'issueGraphFormModuleV3Enabled',
    ['https://mui.com/material-ui/api/table/'],
    false,
    'audit'
  ),
  createData(
    'ir-enable-audit-form-with-graph-form-module',
    'procedureGraphFormModuleV3Enabled',
    ['https://mui.com/material-ui/api/table/'],
    false,
    'audit'
  ),
  createData(
    'ir-enable-audit-form-with-graph-form-module',
    'auditGraphFormModuleV3Enabled',
    ['https://mui.com/material-ui/api/table/'],
    false,
    'audit'
  ),
  createData(
    'enable-cms-for-copy-ui',
    'contentManagementServiceForCopyEnabled',
    ['https://mui.com/material-ui/api/table/'],
    false,
    'audit'
  ),
  createData(
    'ir-enable-suggested-edits-in-remediation',
    'remediationSuggestedEditsEnabled',
    ['https://mui.com/material-ui/api/table/'],
    false,
    'audit'
  ),
  createData(
    'ir-eco-footnotes',
    'ecoFootnotesEnabled',
    ['https://mui.com/material-ui/api/table/'],
    false,
    'audit'
  ),
  createData(
    'ir-enable-request-lgi-with-eco',
    'ecoRequestsEnabled',
    ['https://mui.com/material-ui/api/table/'],
    false,
    'audit'
  ),
  createData(
    'ir-enable-mui-forms',
    'muiFormsEnabled',
    ['https://mui.com/material-ui/api/table/'],
    false,
    'audit'
  ),
  createData(
    'ir-audit-garmin-experience',
    'hasAuditExperienceV2Enabled',
    ['https://mui.com/material-ui/api/table/'],
    false,
    'audit'
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      if (column.id === 'tickets') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {row[column.id].map((ticket: string) => (
                              <Link key={ticket} href={ticket}>
                                {ticket}
                              </Link>
                            ))}
                          </TableCell>
                        )
                      } else if (column.id === 'isFuture') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {row[column.id] ? 'Yes' : 'No'}
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {row[column.id]}
                          </TableCell>
                        )
                      }
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
