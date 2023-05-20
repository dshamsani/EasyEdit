import axios from "axios";
import { useAuth } from "../Context/AuthContext/context";
import { useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(true);

  const { token } = useAuth();

  const { notificationError } = useNotification();

  const getCurrentUser = async () => {
    setLoading(true);
    await axios
      .get(import.meta.env.VITE_API_URL + "api/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        notificationError(e.response.data.message);
      });
  };

  return {
    getCurrentUser,
    token,
    user,
    loading,
  };
};
