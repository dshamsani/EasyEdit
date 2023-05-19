import { useEffect, useRef, useState } from "react";

import { useNotification } from "../Context/NotificationContext/context";

import axios from "axios";

export const useLogin = () => {
  const [email, setEmail] = useState<string | null | undefined>(null);
  const [password, setPassword] = useState<string | null | undefined>(null);
  const [name, setName] = useState<string | null | undefined>(null);
  const [surname, setSurname] = useState<string | null | undefined>(null);
  const [age, setAge] = useState<string | null | undefined>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [isRegistred, setIsRegistred] = useState<boolean>(false);
  const [isRegisterDisabled, setRegisterDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const notificationSended = useRef(false);

  const { notificationSuccess, notificationError, notificationInfo, notificationWarn } = useNotification();

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

  const registerUser = async () => {
    setLoading(true);
    await axios
      .post(import.meta.env.VITE_API_URL + "api/users/add", {
        email,
        password,
        age,
        name,
        surname,
      })
      .then(() => {
        setIsRegistred(true);
        setLoading(false);
        notificationSuccess("Successfully registred");
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
      notificationWarn("Please enter the correct email");
      setEmail(undefined);
    }
  };

  const validatePassword = (password: string) => {
    if (password.length <= 4) {
      notificationWarn("Please enter the correct password");
      setPassword(undefined);
    } else {
      setPassword(password);
    }
  };

  const validateName = (name: string) => {
    if (name.length < 2 || /\d/.test(name)) {
      notificationWarn("Please enter the correct name");
      setName(undefined);
    } else {
      setName(name);
    }
  };

  const validateSurname = (surname: string) => {
    if (surname.length < 2 || /\d/.test(surname)) {
      notificationWarn("Please enter the correct surname");
      setSurname(undefined);
    } else {
      setSurname(surname);
    }
  };

  const validateAge = (age: string) => {
    if (age.toLowerCase().match(/^\d+$/gi)) {
      setAge(age);
    } else {
      notificationWarn("Please enter the correct age");
      setAge(undefined);
    }
  };

  useEffect(() => {
    if (
      email !== null &&
      email !== undefined &&
      password !== null &&
      password !== undefined &&
      name !== null &&
      name !== undefined &&
      surname !== null &&
      surname !== undefined &&
      age !== null &&
      age !== undefined
    ) {
      setRegisterDisabled(false);
    } else {
      setRegisterDisabled(true);
    }
  }, [email, password, name, surname, age]);

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
    validateName,
    validateEmail,
    validatePassword,
    validateSurname,
    validateAge,
    handleShowButton,
    notificationInfo,
    getData,
    registerUser,
    email,
    password,
    name,
    surname,
    age,
    token,
    error,
    show,
    loading,
    isDisabled,
    isRegisterDisabled,
    isRegistred,
    notificationSended,
  };
};
