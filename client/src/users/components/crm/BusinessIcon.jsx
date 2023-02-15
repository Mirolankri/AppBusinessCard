import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work';
import userListType from '../../models/types/userListType';
import PropTypes, { func } from 'prop-types'

const BusinessIcon = ({user,onBusiness}) => {
    const [isBusiness, setBusiness] = useState(user.isBusiness);

    const handleBusiness = async (id,isBusiness) => {
        console.log(id)
        console.log(isBusiness)
        setBusiness(prev => !prev);
        await onBusiness(id);
      };

  return (
    <IconButton aria-label="admin" onClick={()=>handleBusiness(user._id,user.isBusiness)}>
         <WorkIcon color={isBusiness ? "secondary" : "inherit"}/>
    </IconButton>
  )
}

BusinessIcon.propTypes = {
    onBusiness: func.isRequired,
    user: userListType.isRequired
}

export default BusinessIcon