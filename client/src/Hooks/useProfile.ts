import axios from "axios";
import { useAuth } from "../Context/AuthContext/context";
import { useEffect, useState } from "react";
import { useNotification } from "../Context/NotificationContext/context";

export const useProfile = () => {
  const [user, setUser] = useState<{
    age: string;
    email: string;
    id: string;
    name: string;
    surname: string;
    password: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null | undefined>(null);
  const [name, setName] = useState<string | null | undefined>(null);
  const [surname, setSurname] = useState<string | null | undefined>(null);
  const [age, setAge] = useState<string | null | undefined>(null);
  const [password, setPassword] = useState<string | null | undefined>(null);
  const [isEditDisabled, setEditDisabled] = useState<boolean>(true);
  const [isPasswordDisabled, setPasswordDisabled] = useState<boolean>(true);

  const { token, changeLocalStoreToken } = useAuth();

  const { notificationError, notificationSuccess, notificationWarn } = useNotification();

  const getCurrentUser = async () => {
    await axios
      .get(import.meta.env.VITE_API_URL + "api/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setUser(data.data);
      })
      .catch((e) => {
        notificationError(e.response.data.message);
      });
  };

  const deleteCurrentUser = async () => {
    await axios
      .post(
        import.meta.env.VITE_API_URL + "api/users/delete",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        changeLocalStoreToken("delete");
        notificationSuccess("Your account has been successfully deleted");
      })
      .catch((e) => {
        notificationError(e.response.data.message);
      });
  };

  const editCurrentUser = async () => {
    setLoading(true);
    await axios
      .post(
        import.meta.env.VITE_API_URL + "api/users/edit",
        {
          name,
          age,
          surname,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        location.reload();
        notificationSuccess("Your account has been successfully changed");
      })
      .catch((e) => {
        setLoading(false);
        notificationError(e.response.data.message);
      });
  };

  const changeCurrentUserPassword = async () => {
    await axios
      .post(
        import.meta.env.VITE_API_URL + "api/users/password",
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        changeLocalStoreToken("delete");
        notificationSuccess("Your password has been successfully changed");
      })
      .catch((e) => {
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

  const validatePassword = (password: string) => {
    if (password.length <= 4) {
      notificationWarn("Please enter the longer password");
      setPassword(undefined);
    } else {
      setPassword(password);
    }
  };

  useEffect(() => {
    if (
      email !== null &&
      email !== undefined &&
      name !== null &&
      name !== undefined &&
      surname !== null &&
      surname !== undefined &&
      age !== null &&
      age !== undefined
    ) {
      setEditDisabled(false);
    } else {
      setEditDisabled(true);
    }
  }, [email, name, surname, age]);

  useEffect(() => {
    if (password !== null && password !== undefined) {
      setPasswordDisabled(false);
    } else {
      setPasswordDisabled(true);
    }
  }, [password]);

  return {
    getCurrentUser,
    deleteCurrentUser,
    editCurrentUser,
    changeCurrentUserPassword,
    validateAge,
    validateEmail,
    validateName,
    validateSurname,
    validatePassword,
    password,
    age,
    email,
    name,
    surname,
    token,
    user,
    loading,
    isEditDisabled,
    isPasswordDisabled,
  };
};
