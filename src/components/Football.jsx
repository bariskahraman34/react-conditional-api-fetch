import { Container,TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Paper} from "@mui/material" ;

export default function Football({data}) {
  return (
    <>
      <Container style={{marginTop:'30px'}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">Runner Up</TableCell>
                <TableCell align="center">Winner</TableCell>
                <TableCell align="center">Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((d,index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {d.name}
                  </TableCell>
                  <TableCell align="center">{d.country}</TableCell>
                  <TableCell align="center">{d.runnerup}</TableCell>
                  <TableCell align="center">{d.winner}</TableCell>
                  <TableCell align="center">{d.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      
    </>
  )
}
