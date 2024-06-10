import { Container,TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Paper} from "@mui/material" ;

export default function Posts({titleRef,bodyRef,data}) {
  return (
    <>
      <Container
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: "30px"
          }}
      >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                  <TableCell component="th" scope="row" ref={titleRef}>
                  {data.id}
                </TableCell>
                <TableCell component="th" scope="row" ref={titleRef}>
                  {data.title}
                </TableCell>
                <TableCell align="left" ref={bodyRef}>{data.body}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container> 
    </>
  )
}
