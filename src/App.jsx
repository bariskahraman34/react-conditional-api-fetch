import { Container, Box, FormControl, InputLabel, Select, MenuItem, Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField  } from '@mui/material';
import { useEffect, useState , useRef } from 'react';
import Loading from './components/Loading.jsx';
import {hackerrankAPI , dummyJSONAPI} from './api/axios.js';

function App() {
  const [isLoading , setIsLoading] = useState(false);
  const [selectedAPI,setSelectedAPI] = useState('');
  const [postValue , setPostValue] = useState(1);
  const [selectedYear , setSelectedYear] = useState(2011);
  const [data, setData] = useState([]);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  const handleAPIChange = (e) => {
    setData([]);
    setSelectedAPI(e.target.value);
  }

  useEffect(() => {
    if(selectedAPI){
      setIsLoading(true)
      if(selectedAPI === "football_competitions"){
        hackerrankAPI.get(`${selectedAPI}?year=${selectedYear}`).then(result => setData(result)).finally(() => setIsLoading(false))
      }else if(selectedAPI === "posts"){
        dummyJSONAPI.get(`${selectedAPI}/${postValue}`).then(result => setData(result)).finally(() => setIsLoading(false))
      }
    }
  },[selectedAPI,selectedYear,postValue])

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.color = 'red';
    }
    if(bodyRef.current) {
      bodyRef.current.style.color = "blue";
    }
  },[data])
  
  return (
    <>
      <Box
      component="form"
      sx={{
        mt: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">API Seçiniz</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="API Seçiniz"
            value={selectedAPI}
            onChange={(e) => handleAPIChange(e)}
          >
            <MenuItem value={"football_competitions"}>Football API</MenuItem>
            <MenuItem value={"posts"}>Dummy JSON API</MenuItem>
          </Select>
        </FormControl>
        {selectedAPI === "posts" && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField id="outlined-basic" label="Görüntülenecek Post Numarasını Giriniz..." variant="outlined" onChange={(e) => e.target.value > 0 && setPostValue(e.target.value)} />
          </FormControl>
        )}
        {selectedAPI === "football_competitions" && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Yıl Seçiniz</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Yıl Seçiniz"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <MenuItem value={2011}>2011</MenuItem>
              <MenuItem value={2012}>2012</MenuItem>
              <MenuItem value={2013}>2013</MenuItem>
              <MenuItem value={2014}>2014</MenuItem>
              <MenuItem value={2015}>2015</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>
      {isLoading && <Loading />}
      {!isLoading && selectedAPI == 'posts' && (
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
      )}
      {!isLoading && selectedAPI == "football_competitions" && (
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
      )}
    </>
  )
}

export default App
