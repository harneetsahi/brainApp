import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { IContent } from "../types/types";

const fetchContents = async () => {
  const res = await axiosInstance.get("/content");
  if (!res.data) {
    return [];
  }

  return res.data.content;
};

const postContent = async (formdata: IContent) => {
  const res = await axiosInstance.post("/content", formdata);

  return res.data;
};

const deleteContent = async (id: string) => {
  const res = await axiosInstance.delete(`/content/${id}`);
  const deletedId = res.data.deletedContentId;
  return deletedId;
};

const shareNotes = async () => {
  const res = await axiosInstance.post("/notes/share");

  return res.data.link;
};

const stopSharingNotes = async () => {
  const res = await axiosInstance.delete("/notes/share");

  return res.data;
};

const getSharedNotes = async (hash: string) => {
  const res = await axiosInstance.get(`/notes/share/${hash}`);
  return res.data;
};

//

export const useGetContents = () => {
  const { data, error, isError, isSuccess, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchContents,
  });

  return { data, error, isError, isSuccess, isPending };
};

export const usePostContents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post added!");
    },
    onError: (error: any) => {
      if (error.response?.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Couldn't add post. Please try again");
      }

      console.log("Post error: ", error);
    },
  });
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted!");
    },
    onError: (error: any) => {
      if (error.response?.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Couldn't delete post. Please try again");
      }

      console.log("Delete error: ", error);
    },
  });
};

export const useShareNotes = () => {
  return useMutation({
    mutationFn: shareNotes,
    onSuccess: async (data: string) => {
      let link;

      if (import.meta.env.MODE === "development") {
        link = "http://localhost:5173/notes/share";
      } else {
        link = window.location.origin + "/notes/share";
      }

      let linkToCopy = `${link}/${data}`;

      await navigator.clipboard.writeText(linkToCopy);

      toast.success("Shared link copied successfully");
    },
    onError: (error: any) => {
      if (error.response?.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Couldn't copy link. Please try again");
      }
      console.log("Share notes error: ", error);
    },
  });
};

export const useStopSharingNotes = () => {
  return useMutation({
    mutationFn: stopSharingNotes,
    onSuccess: async () => {
      toast.success("Removed shared link");
    },
    onError: (error: any) => {
      if (error.response?.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Couldn't remove link. Please try again");
      }

      console.log("Stop sharing error: ", error);
    },
  });
};

export const useGetSharedNotes = (hash: string | undefined) => {
  const { data, error, isError, isSuccess, isPending } = useQuery({
    queryKey: ["sharedNotes", hash],
    queryFn: () => getSharedNotes(hash as string),
    enabled: !!hash,
  });

  return { data, error, isError, isSuccess, isPending };
};
