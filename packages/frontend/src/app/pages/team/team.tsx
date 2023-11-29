import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

export default function Team() {
  const teamMembers = [
    {
      name: 'Chris Lawson',
      major: '4th Year Computer Science',
      image: 'https://avatars.githubusercontent.com/u/7269141', // Add the path to your image, take github profile pics
      bio: 'Insert a bio for yourself in packages/frontend/src/app/pages/team/team.tsx',
    },
    {
      name: 'Naomi Nayman',
      major: '3rd Year Computer Science',
      image: 'https://avatars.githubusercontent.com/u/97060752',
      bio: 'Insert a bio for yourself in packages/frontend/src/app/pages/team/team.tsx',
    },
    {
      name: 'Sam Bock',
      major: '3rd Year Computer Science',
      image: 'https://avatars.githubusercontent.com/u/63836618',
      bio: 'Insert a bio for yourself in packages/frontend/src/app/pages/team/team.tsx',
    },
    {
      name: 'Spencer Perley',
      major: '3rd Year Computer Science',
      image: 'https://avatars.githubusercontent.com/u/63747892',
      bio: 'Insert a bio for yourself in packages/frontend/src/app/pages/team/team.tsx',
    },
  ];

  return (
    <Container>
      <Typography component="h1" variant="h3" align="center" gutterBottom>
        Team
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {teamMembers.map((member) => (
          <Grid xs={12} sm={6} md={4} key={member.name}>
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
            <Typography variant="body1" align="center" paragraph>
              {member.bio}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
