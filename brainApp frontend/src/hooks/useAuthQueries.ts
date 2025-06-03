import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { IUser } from "../store_and_types/useUserStore";

const checkAuth = async () => {
  const res = await axiosInstance.get("/checkAuth");
  return res.data;
};

const signup = async (user: IUser) => {
  const res = await axiosInstance.post("/signup", user);
  return res.data;
};

const login = async (user: IUser) => {
  const res = await axiosInstance.post("/login", user);
  return res.data;
};

const signout = async () => {
  await axiosInstance.post("/signout");
};

const updatePassword = async (data: {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const res = await axiosInstance.post("/settings/updatePassword", data);
  return res.data;
};

//////

export const useCheckAuth = () => {
  const { data, error, isError, isSuccess, isPending } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
    staleTime: Infinity,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { data, error, isError, isSuccess, isPending };
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account created successfully!");
      queryClient.invalidateQueries({ queryKey: ["checkAuth"] });
    },
    onError: (error: any) => {
      if (error.response?.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup failed. Please try again.");
      }

      console.log("Signup error: ", error);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Logged in");
      queryClient.invalidateQueries({ queryKey: ["checkAuth"] });
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }

      console.log("Login error: ", error);
    },
  });
};

export const useSignout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      toast.success("Signed out successfully");
      queryClient.invalidateQueries({ queryKey: ["checkAuth"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to sign out");
      console.log("Signout error: ", error);
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password updated");
      queryClient.invalidateQueries({ queryKey: ["checkAuth"] });
    },

    onError: (error: any) => {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Password update failed. Please try again.");
      }

      console.log("Password update error: ", error);
    },
  });
};
