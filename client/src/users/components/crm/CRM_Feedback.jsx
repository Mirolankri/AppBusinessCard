import React from 'react'
import { Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import UserList from './UserList'
import PropTypes, { arrayOf, bool, func, string } from 'prop-types'
import Error from '../../../components/Error'
import Spinner from '../../../components/Spinner'
import userListType from '../../models/types/userListType'

const CRM_Feedback = ({ isLoading, error, users, onDelete, onBusiness }) => {
    if (isLoading) return <Spinner />
    if (error) return <Error errorMessage={error} />

    if (users && !users.length) return (
        <Typography>
          Oops... it seems there are no business cards to display
        </Typography>
    )

    if (users && !!users.length) return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">User Email</TableCell>
                    <TableCell align="center">Business</TableCell>
                    <TableCell align="center">Delete</TableCell>
                </TableRow>
            </TableHead>
            <UserList users={users} onDelete={onDelete} onBusiness={onBusiness}/>
        </Table>
    </TableContainer>
    )
}

CRM_Feedback.propTypes = {
    isLoading: bool.isRequired,
    error: string,
    users: arrayOf(userListType),
    onDelete: func.isRequired
}

export default CRM_Feedback