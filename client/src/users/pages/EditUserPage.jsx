import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import Container from "@mui/material/Container";
import useForm from "../../forms/hooks/useForm";
import useUsers from "../hooks/useUsers";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import { useUser } from "../providers/UserProvider";
import signupSchema from "../models/joi-schema/signupSchema";
import UserForm from "../components/UserForm";
import mapUserToMadel from "../helpers/normalization/mapUserToMadel";

const EditUserPage = () => {
  const { user_id } = useParams()
  const { handleEdit, handleGetUser } = useUsers();
  const { value, ...rest } = useForm(
    initialSignupForm,
    signupSchema,
    handleEdit
  );

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(()=>{
    handleGetUser(user_id).then(data=>{
      if (user._id !== data._id) return navigate(ROUTES.CARDS);
      const modeledUser = mapUserToMadel(data)
      rest.setData(modeledUser)
    })
  }, [])

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <UserForm
        title="edit user form"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        setData={rest.setData}
        errors={value.errors}
        data={value.data}
      />
    </Container>
  );
};

export default EditUserPage;
