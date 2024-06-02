import { Container, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import Loading from './components/Loading.jsx';
import {hackerrankAPI , dummyJSONAPI} from './api/axios.js';
import { useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {
  const [isLoading , setIsLoading] = useState(false);
  const [selectedAPI,setSelectedAPI] = useState('');
  const [postValue , setPostValue] = useState(10);
  const [selectedYear , setSelectedYear] = useState(2011);
  const [data, setData] = useState([]);
  const inputRef = useRef(null);
  const resultRef = useRef(null);

  const handleAPIChange = (e) => {
    setSelectedAPI(e.target.value);
  }

  useEffect(() => {
    if(selectedAPI){
      setIsLoading(true)
      if(selectedAPI === "football_competitions"){
        hackerrankAPI.get(`${selectedAPI}?year=${selectedYear}`).then(result => setData(result)).finally(() => setIsLoading(false))
      }else if(selectedAPI === "posts"){
        const number = inputRef.current.value;
        dummyJSONAPI.get(`${selectedAPI}?limit=${number}`).then(result => setData(result)).finally(() => setIsLoading(false))
        resultRef.current.style.color = 'red';
      }
    }
  },[selectedAPI,selectedYear,postValue])
  
  console.log(resultRef.current);
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
            <InputLabel id="demo-simple-select-label">Gösterilecek Post Sayısını Seçiniz</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gösterilecek Post Sayısını Seçiniz"
              value={postValue}
              onChange={(e) => setPostValue(e.target.value)}
              inputRef={inputRef}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
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
          maxWidth="xs"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div ref={resultRef} style={{marginTop:'20px'}}>
            <ul>
              {data.map(d =><li key={d.id}><h4>Başlık: {d.title}</h4><span>İçerik: {d.body}</span></li>)}
            </ul>
          </div>  
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
                {data.map((d) => (
                  <TableRow
                    key={d.name}
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
