import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Container, Typography } from '@mui/material'
import PageHeader from '../../components/PageHeader'
import { useUser } from '../providers/UserProvider'
import { Navigate, useParams } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import useUsers from '../hooks/useUsers'

const UserPage = ({}) => {
    const { user_id } = useParams()
    const { user } = useUser()
    const { handleGetUser,value:{users} } = useUsers()

    useEffect(()=>{
        handleGetUser(user_id)
    },[])

    if(!user?.isAdmin) return <Navigate replace to={ROUTES.CARDS}/>

    if(!users) return(
        <Typography>
            אין משתמש כזה
        </Typography>
    )
    console.log(users)
    return (
        <Container>
            <PageHeader title="User Profile Page" subtitle="The user profile"/>

            <Typography>First Name {users.name.first}</Typography>
            <Typography>Last Name {users.name.last}</Typography>
            <Typography>email {users.email}</Typography>
            <Typography>Last Name {users.name.last}</Typography>
            <Typography>Last Name {users.name.last}</Typography>
        </Container>
    )
}

UserPage.propTypes = {}

export default UserPage