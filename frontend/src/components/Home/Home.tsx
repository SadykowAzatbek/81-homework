import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { LinkTypes } from '../../types';
import { useMutation } from '@tanstack/react-query';
import axiosApi from '../../axiosApi.ts';

const Home = () => {
  const [url, setUrl] = useState<LinkTypes>({
    shortUrl: '',
    originalUrl: '',
  });

  const setShortUrl = ['a', 'A', 'b', 'B', 'J', 'm', 'V', 'v', 'k', 'K', 'D', 'F', 'Q', 'q', 'w', 'W', 'L'];

  const [content, setContent] = useState<React.ReactNode>(<div></div>);

  const mutation = useMutation({
    mutationFn: async (url: LinkTypes) => {
      await axiosApi.post('/links', url);
    },
  });

  const getShortUrl = () => {
    let shortUrl = '';
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * setShortUrl.length);
      shortUrl += setShortUrl[randomIndex];
    }
    return shortUrl;
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await mutation.mutateAsync({
        ...url,
        shortUrl: getShortUrl(),
      });

      setContent(<a href={'http://localhost:8000/' + getShortUrl()}>{'http://localhost:8000/' + getShortUrl()}</a>);

    } catch (err) {
      console.log('Error: ' + err);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {


    setUrl((prev) => ({
      ...prev,
      originalUrl: e.target.value,
    }));
  };

  return (
    <>
      <Typography variant="h1" mt={10}>Shorten your link!</Typography>
      <form onSubmit={onSubmitForm}>
        <Grid container direction="column" mb={5}>
            <TextField
              required
              id="oroginalUrl" name="oroginalUrl" label="oroginalUrl"
              value={url.originalUrl}
              onChange={onChangeInput}
            />
        </Grid>
        <Button type='submit' color="success">Shorten</Button>
      </form>
      <Typography variant="h6">Your short link:</Typography>
      {content}
    </>
  );
};

export default Home;