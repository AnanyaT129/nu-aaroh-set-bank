import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

// Define the types for the form inputs
interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    // Clear any previous error messages
    setError('');

    // Call the onSubmit function passed from the parent component
    onSubmit(username, password);
  };

  return (
    <Container className="login-container">
      <Typography variant='h2'>Login</Typography>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}/>
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}/>
        
        {error && <div className="error-message">{error}</div>}
        <Button type="submit">Log In</Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
