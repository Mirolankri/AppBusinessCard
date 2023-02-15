import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import { useParams } from "react-router-dom";
import useCards from "../hooks/useCards";
import { Box, Link, Typography } from "@mui/material";
import Iframe from 'react-iframe'


const CardDetailsPage = () => {
  const { cardId } = useParams();

  const {
    handleGetCard,
    value: { card },
  } = useCards();

  useEffect( ()=>{
    handleGetCard(cardId)
  }, [])

  if (!card) return (
    <Typography>
      Oops... it seems there are no business card to display
    </Typography>
  )

  return (
    <Container>
      <PageHeader title="Business Card Details" subtitle="Here you can find more details about the business" />

      <Box>
        <Box mt={1} mb={1} sx={{height:"300px",overflow:"hidden",backgroundImage:`url(${card.image.url})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}/>

        <Typography variant='h5' component='h2' color='text.secondary'>Business Name: {card.title}</Typography>
        <Typography variant='body1' component='h3' color='text.secondary'>Headline: {card.subtitle}</Typography>
        <Typography variant='body1' component='p' color='text.secondary'>Address: {`${card.address.street} ${card.address.houseNumber} ${card.address.city}, ${card.address.country} ${card.address.state} ${card.address.zip}`}</Typography>
        <Typography variant='body1' component='p' color='text.secondary'>Webtite: <Link href={card.web} underline="hover" target='_blank'>{card.web}</Link> </Typography>
        <Typography variant='body1' component='p' color='text.secondary'>Email: <Link href={`mailto:${card.email}`} underline="hover">Send Email</Link> </Typography>
        <Typography variant='body1' component='p' color='text.secondary'>Phone Number: <Link href={`tel:${card.phone}`} underline="hover">{card.phone}</Link> </Typography>
        <Typography variant='body3' component='p' color='text.secondary'>Created at: {new Date(card.createdAt).toLocaleDateString()}</Typography>
        <Typography variant='body3' component='p' color='text.secondary'>Likes: {card.likes.length}</Typography>

        <Box p={5}>
          <Iframe url={`https://maps.google.com/maps?q=${card.address.street}+${card.address.houseNumber}+${card.address.city}+${card.address.country}&z=16&output=embed&hl=he`}
            referrerPolicy="no-referrer-when-downgrade"
            width="100%"
            height="320px"
            id=""
            className=""
            display="block"
            frameBorder='0'
            position="relative"/>
        </Box>
      </Box>

    </Container>
  );
};

export default CardDetailsPage;
