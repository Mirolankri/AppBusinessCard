import React, { useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import { Container } from '@mui/material'
import useUsers from '../hooks/useUsers'
import { useUser } from '../providers/UserProvider'
import ROUTES from '../../routes/routesModel'
import { Navigate } from 'react-router-dom'
import CRM_Feedback from '../components/crm/CRM_Feedback'

const CRM_Page = () => {
    const { user } = useUser()
    const { handleGetAllUsers, handleDeleteUser, handleBusinessUser, value } = useUsers()
    const { users, isLoading, error } = value

    useEffect(()=>{
        handleGetAllUsers();
    }, [])

    const onDeleteUser = async (userId) => {
        await handleDeleteUser(userId)
        await handleGetAllUsers()
    }

    const onBusinessUser = async (userId) => {
        await handleBusinessUser(userId)
    }

    if (!user || !user.isAdmin) return <Navigate replace to={ROUTES.CARDS} />

    return (
        <Container>
            <PageHeader title="CRM Page" subtitle="Manage your users"/>

            <CRM_Feedback isLoading={isLoading} error={error} users={users} onDelete={onDeleteUser} onBusiness={onBusinessUser}/>
        </Container>
    )
}

export default CRM_Page