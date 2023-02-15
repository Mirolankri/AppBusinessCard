import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IconButton, TableBody, TableCell, TableRow, Tooltip } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import UserDeleteDialog from './UserDeleteDialog';
import BusinessIcon from './BusinessIcon';
import ROUTES from '../../../routes/routesModel';
import { useNavigate } from 'react-router-dom';

const UserList = ({ users, onDelete, onBusiness }) => {
    const [isDialogOpen, setDialog] = useState(false);
    const [UserToDelete, setUserToDelete] = useState("");
    const navigate = useNavigate();

    const handleDialog = (term,id) => {
        if (term === "open") 
        {
            setUserToDelete(id)
            return setDialog(true);
        }
        setDialog(false);
      };
    
      const handleDeleteUser = () => {
        handleDialog();
        onDelete(UserToDelete);
      };
    
    
    return (
        <>
        
        <TableBody>
            {users.map((row) => (
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" onClick={() => navigate(`${ROUTES.USER_PROFILE}/${row._id}`)}>{row.email}</TableCell>
                    <TableCell align="center">
                        <BusinessIcon user={row} onBusiness={onBusiness} />
                    </TableCell>

                    <TableCell align="center">
                    <Tooltip disableFocusListener title={!row.isAdmin ? "Delete User": "You Are Not authorized"}>
                        <span>
                         <IconButton disabled={row.isAdmin} aria-label="delete" onClick={() => handleDialog("open",row._id)}>
                            <PersonRemoveIcon color={!row.isAdmin ? "error": "gray"}/>
                        </IconButton>
                        </span>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
        
        <UserDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={handleDialog}
        onDelete={handleDeleteUser}
      />
      </>

    )
}

// UserList.propTypes = {}

export default UserList