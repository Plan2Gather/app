import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import chrisImage from '../../../assets/chris.jpg';
import naomiImage from '../../../assets/naomi.jpg';
import samImage from '../../../assets/sam.jpg';
import spencerImage from '../../../assets/spencer.jpg';

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: 'Chris Lawson',
      major: '4th Year Computer Science',
      image: 'https://avatars.githubusercontent.com/u/7269141?s=60&v=4', // Add the path to your image, take github profile pics
    },
    {
      id: 2,
      name: 'Naomi Nayman',
      major: '3rd Year Computer Science',
      image: 'https://avatars.githubusercontent.com/u/97060752?v=4',
    },
    {
      id: 3,
      name: 'Sam Bock',
      major: '3rd Year Computer Science',
      image: 'https://avatars.githubusercontent.com/u/63836618?s=40&v=4',
    },
    {
      id: 4,
      name: 'Spencer Perley',
      major: '3rd Year Computer Science',
      image: 'https://avatars.githubusercontent.com/u/63747892?s=40&u=cee118b809262c9533aa708b57437f0eb257c818&v=4',
    },
  ];

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        About Us
      </Typography>
      <Grid container spacing={3}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <Avatar
              alt={member.name}
              src={member.image}
              sx={{ width: 150, height: 150, margin: 'auto' }}
            />
            <Typography variant="h5" align="center" gutterBottom>
              {member.name}
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              paragraph
            >
              {member.major}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
