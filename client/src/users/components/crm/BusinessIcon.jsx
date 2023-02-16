import React, { useState } from 'react'
import PropTypes, { func } from 'prop-types'
import { IconButton } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work';
import userListType from '../../models/types/userListType';


const BusinessIcon = ({ onBusiness, user }) => {
    const [isBusiness, setBusiness] = useState(user.isBusiness)

    const handleBusiness = async (userId) => {
        setBusiness(prev => !prev);
        await onBusiness(userId);
    }

    return (
        <IconButton aria-label="admin" onClick={()=>handleBusiness(user._id)}>
            <WorkIcon color={isBusiness ? "secondary" : "inherit"}/>
        </IconButton>
    )
}

BusinessIcon.propTypes = {
    onBusiness: func.isRequired,
    user: userListType.isRequired
}

export default BusinessIcon