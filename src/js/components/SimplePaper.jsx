import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Counter = () => {
  const [seconds, setSeconds] = React.useState(0);
  const [targetTime, setTargetTime] = React.useState('');
  const [targetReached, setTargetReached] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState(null);

  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  remainingSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;


  const startCounter = () => {
    if (isPaused) {
      const id = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
      setIntervalId(id);
      setIsPaused(false);
    }
  };


  const pauseCounter = () => {
    clearInterval(intervalId);
    setIsPaused(true);
  };


  const resetCounter = () => {
    clearInterval(intervalId);
    setSeconds(0);
    setIsPaused(false);
    setTargetReached(false);
    setTargetTime('');
  };

  React.useEffect(() => {
    if (!isPaused) {
      const id = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [isPaused]);


  const handleTargetChange = (event) => {
    setTargetTime(event.target.value);
    setTargetReached(false); 
  };


  React.useEffect(() => {
    if (targetTime && !targetReached && seconds === parseInt(targetTime)) {
      alert(`Ya han pasado ${targetTime} segundos`);
      setTargetReached(true);
    }
  }, [seconds, targetTime, targetReached]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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

      <TextField
        sx={{ marginTop: 2 }}
        label="Segundos"
        variant="outlined"
        type="number"
        value={targetTime}
        onChange={handleTargetChange}
      />

      <Box sx={{ marginTop: 3 }}>
        <Button
          sx={{ margin: 1 }}
          variant="contained"
          onClick={startCounter}
          disabled={!isPaused}
        >
          Continuar
        </Button>
        <Button
          sx={{ margin: 1 }}
          variant="contained"
          onClick={pauseCounter}
          disabled={isPaused} 
        >
          Pausar
        </Button>
        <Button
          sx={{ margin: 1 }}
          variant="contained"
          onClick={resetCounter}
        >
          Reiniciar
        </Button>
      </Box>
    </Box>
  );
};

export default Counter;
