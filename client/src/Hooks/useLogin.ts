import { useEffect, useState } from "react";

import { useNotification } from "../Context/NotificationContext/context";

import axios from "axios";

export const useLogin = () => {
  const [email, setEmail] = useState<string | null | undefined>(null);
  const [password, setPassword] = useState<string | null | undefined>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const { notificationSuccess, notificationError } = useNotification();

  const handleShowButton = () => setShow((show) => !show);

  const getData = async () => {
    setLoading(true);
    await axios
      .post(import.meta.env.VITE_API_URL + "api/users/login", {
        email,
        password,
      })
      .then((data) => {
        setToken(data.data.token);
        setLoading(false);
        notificationSuccess("Successfully logged in");
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
        notificationError(e.response.data.message);
      });
  };

  const validateEmail = (email: string) => {
    if (
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmail(email);
    } else {
      setEmail(undefined);
    }
  };

  const validatePassword = (password: string) => {
    if (password.length <= 4) {
      setPassword(undefined);
    } else {
      setPassword(password);
    }
  };

  useEffect(() => {
    if (email !== null && email !== undefined && password !== null && password !== undefined) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return {
    setEmail,
    setPassword,
    setToken,
    setError,
    email,
    password,
    token,
    error,
    getData,
    show,
    handleShowButton,
    isDisabled,
    validateEmail,
    validatePassword,
    loading,
  };
};
