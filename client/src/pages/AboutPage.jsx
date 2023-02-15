import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <Container>
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="top">
        <Typography variant="body1" component='p'>
          Welcome to our business card app! Our mission is to provide a simple and efficient way for individuals and businesses to create, manage, and exchange their professional contact information.
          <br/>
          Our app makes it easy for you to create custom business cards that showcase your unique style and brand. You can choose from a wide range of design templates, add your own logo, text, and photos, and preview your card in real-time.
          <br/>
          With our app, you can also manage multiple business cards for different purposes, and share your card with others via email, text, or social media. Your contacts will receive a digital version of your card that they can save directly to their phone or add to their contacts.
          <br/>
          We are committed to providing a seamless user experience, and are constantly working to improve our app and add new features based on your feedback. If you have any questions or suggestions, please don't hesitate to contact us.
          <br/>
          Thank you for choosing our business card app, and we look forward to helping you make a great impression!
        </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: { md: "flex", xs: "none" }, justifyContent: "center" }}
        >
          <img src="/assets/images/card.jpg" alt="card" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
