import { useState, useCallback, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import { login, signup, edit, getUser as getUserFromDB, getAllUsers, deleteUser, businessUser } from "../services/usersApiService";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnackbar } from "../../providers/SnackbarProvider";

const useUsers = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const snack = useSnackbar();

  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();

  useAxios();

  const requestStatus = useCallback(
    (loading, errorMessage, users, user = null) => {
      setLoading(loading);
      setUsers(users);
      setUser(user);
      setError(errorMessage);
    },
    [setUser]
  );

  const handleLogin = useCallback(async (user) => {
    try {
      const token = await login(user);
      setTokenInLocalStorage(token);
      setToken(token);
      const userFromLocalStorage = getUser();
      requestStatus(false, null, null, userFromLocalStorage);
      navigate(ROUTES.CARDS);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const handleSignup = useCallback(
    async (userFromClient) => {
      try {
        const normalizedUser = normalizeUser(userFromClient);
        await signup(normalizedUser);
        await handleLogin({
          email: userFromClient.email,
          password: userFromClient.password,
        });
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus, handleLogin]
  );

  const handleEdit = useCallback(
    async (user_id, userFromClient) => {
      try {
        const normalizedUser = normalizeUser(userFromClient)
        await edit(user_id, normalizedUser)
        navigate(ROUTES.CARDS);
      } catch (error) {
        requestStatus(false, error, null);
      }
    }, [requestStatus]
  )

  const handleGetUser = useCallback(
    async (user_id) => {
      try {
        setLoading(true);
        const userFormDB = await getUserFromDB(user_id)
        requestStatus(false, null, userFormDB, user);
        return userFormDB
      } catch (error) {
        requestStatus(false, error, null);
      }
    }, [requestStatus]
  )

  const handleGetAllUsers = useCallback(
    async (user_id) => {
      try {
        setLoading(true);
        const usersFormDB = await getAllUsers()
        requestStatus(false, null, usersFormDB, user);
      } catch (error) {
        requestStatus(false, error, null);
      }
    }, [requestStatus]
  )

  const handleDeleteUser = useCallback(
    async (user_id) => {
      try {
        setLoading(true);
        await deleteUser(user_id)
        snack("success", "The user has been successfully deleted")
      } catch (error) {
        requestStatus(false, error, null);
      }
    }, [requestStatus]
  )

  const handleBusinessUser = useCallback(
    async (user_id) => {
      try {
        await businessUser(user_id)
        snack("success", "The user has been successfully changed")
        requestStatus(false, null, users, user)
      } catch (error) {
        requestStatus(false, error, null);
      }
    }, [requestStatus, users]
  )

  const value = useMemo(
    () => ({ isLoading, error, user, users }),
    [isLoading, error, user, users]
  );

  return {
    value,
    handleLogin,
    handleLogout,
    handleSignup,
    handleEdit,
    handleGetUser,
    handleGetAllUsers,
    handleDeleteUser,
    handleBusinessUser
  };
};

export default useUsers;
