import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: 'Chris Lawson',
      major: '4th Year Computer Science',
      image: 'chris.png', // Add the path to your image, take github profile pics
    },
    {
      id: 2,
      name: 'Naomi Nayman',
      major: '3rd Year Computer Science',
      image: 'naomi.png',
    },
    {
      id: 3,
      name: 'Sam Bock',
      major: '3rd Year Computer Science',
      image: 'sam.png',
    },
    {
      id: 4,
      name: 'Spencer Perley',
      major: '3rd Year Computer Science',
      image: 'spencer.png',
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
