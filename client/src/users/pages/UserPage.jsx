import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Container, Link, Typography } from '@mui/material'
import PageHeader from '../../components/PageHeader'
import { useUser } from '../providers/UserProvider'
import { Navigate, useParams } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import useUsers from '../hooks/useUsers'

const UserPage = () => {
    const { user_id } = useParams()
    const { user } = useUser()
    const { handleGetUser, value: {users} } = useUsers()

    useEffect(()=>{
        handleGetUser(user_id)
    }, [])

    if(!user?.isAdmin) return <Navigate replace to={ROUTES.CARDS}/>

    if (!users) return (
        <Typography>
          Oops... it seems there are no business card to display
        </Typography>
    )
    
    return (
        <Container>
            <PageHeader title={`${users.name.last} ${users.name.middle} ${users.name.first}`} subtitle={users.isBusiness ? 'Business User' : 'Not a Business User'}/>

            <Typography variant='body1' component='h2'>Phone: {<Link href={`tel:${users.phone}`}>{users.phone}</Link>}</Typography>
            <Typography variant='body1' component='h2'>Email: {<Link href={`mailto:${users.email}`}>{users.email}</Link>}</Typography>
            <Typography variant='body1' component='h2'>Created At: {new Date(users.createdAt).toLocaleString()}</Typography>
        </Container>
    )
}

export default UserPage