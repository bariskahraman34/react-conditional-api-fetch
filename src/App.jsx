import { Box, FormControl, InputLabel, Select, MenuItem,TextField  } from '@mui/material';
import { useEffect, useState , useRef } from 'react';
import Loading from './components/Loading.jsx';
import {hackerrankAPI , dummyJSONAPI} from './api/axios.js';
import Posts from './components/Posts.jsx';
import Football from './components/Football.jsx';

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
          <InputLabel id="demo-simple-select-label">Select an API</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select an API"
            value={selectedAPI}
            onChange={(e) => handleAPIChange(e)}
          >
            <MenuItem value={"football_competitions"}>Football API</MenuItem>
            <MenuItem value={"posts"}>Dummy JSON API</MenuItem>
          </Select>
        </FormControl>
        {selectedAPI === "posts" && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField id="outlined-basic" label="Enter a Post number" variant="outlined" onChange={(e) => e.target.value > 0 && setPostValue(e.target.value)} />
          </FormControl>
        )}
        {selectedAPI === "football_competitions" && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Select a Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select a Year"
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
        <Posts data = {data} titleRef = {titleRef} bodyRef = {bodyRef} />
      )}
      {!isLoading && selectedAPI == "football_competitions" && (
        <Football data = {data}/>
      )}
    </>
  )
}

export default App
