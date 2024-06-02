import {CircularProgress,Box} from '@mui/material';

export default function Loading(){
  return <>
    <Box position="absolute" left="50%" top="50%">
      <CircularProgress />
    </Box>
  </>
}