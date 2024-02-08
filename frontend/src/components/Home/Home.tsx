import { Button, Grid, TextField, Typography } from '@mui/material';

const Home = () => {
  return (
    <>
      <Typography variant="h1" mt={10}>Shorten your link!</Typography>
      <form>
        <Grid container direction="column" mb={5}>
            <TextField
              required
              id="oroginalUrl" name="oroginalUrl" label="oroginalUrl"
            />
        </Grid>
        <Button type='submit' color="success">Shorten</Button>
      </form>
    </>
  );
};

export default Home;