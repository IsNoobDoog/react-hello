import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Counter = () => {

  const [seconds, setSeconds] = React.useState(0);

  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  remainingSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);

  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: 200,
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          fontSize: '36px',
          letterSpacing: '4px',
        }}
      >
        {minutes}:{remainingSeconds}
      </Paper>
    </Box>
  );
};
export default Counter