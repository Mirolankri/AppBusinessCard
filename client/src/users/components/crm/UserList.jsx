import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IconButton, TableBody, TableCell, TableRow, Tooltip } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import UserDeleteDialog from './UserDeleteDialog';
import useUsers from '../../hooks/useUsers';
import BusinessIcon from './BusinessIcon';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../routes/routesModel';

const UserList = ({ users, onDelete, onBusiness }) => {
    const [isDialogOpen, setDialog] = useState(false)
    const [deleteUser, setDeleteUser] = useState('')
    const navigate = useNavigate()

    const handleDialog = (term, id) => {
        if (term === "open") {
            setDeleteUser(id)
            return setDialog(true)
        }
        setDialog(false)
    }

    const handleDeleteUser = () => {
        handleDialog()
        onDelete(deleteUser)
    }

    return (
        <>
            <TableBody>
                {users.map((row) => (
                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row" onClick={()=>{navigate(`${ROUTES.USER_PROFILE}/${row._id}`)}}>{row.email}</TableCell>

                        <TableCell align="center">
                            <BusinessIcon onBusiness={onBusiness} user={row} />
                        </TableCell>

                        <TableCell align="center">
                            <Tooltip title={row.isAdmin ? 'You are not allowed DELETE this user' : 'Delete User'}>
                                <span>
                                    <IconButton aria-label="delete" onClick={()=>handleDialog('open', row._id)} disabled={row.isAdmin}>
                                        <PersonRemoveIcon color={row.isAdmin ? "inherit" : "error"}/>
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <UserDeleteDialog isDialogOpen={isDialogOpen} onChangeDialog={handleDialog} onDelete={handleDeleteUser}/>
        </>
    )
}

// UserList.propTypes = {}

export default UserList