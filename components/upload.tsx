"use client";

import { auth, storage } from "@/config/firebase";
import { usePreview } from "@/context/preview";
import { saveAvatarMutation } from "@/functions/mutation";
import { DocumentData } from "@firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { Check, Upload as UploadIcon, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const acceptDefault = {
  image: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
};

type CustomFile = {
  path: string;
  name?: string;
  size?: number;
} & File;

const getURL = (path: string) =>
  `https://firebasestorage.googleapis.com/v0/b/media-space-966df.appspot.com/o/${path}?alt=media`;

export default function Upload({ user }: DocumentData) {
  const { userPreview, setUserPreview } = usePreview();
  const [file, setFile] = useState<CustomFile | null>(null);

  const onDrop = useCallback((acceptFiles: any) => {
    const imageUrl = URL.createObjectURL(acceptFiles[0]);
    setUserPreview({ ...user, avatar: imageUrl });
    setFile(acceptFiles[0]);
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({ onDrop });

  const saveImageOnStorage = async () => {
    if (file === null) return;
    const uid = auth.currentUser?.uid;
    try {
      const url = getURL(file.name);
      const storageRef = ref(storage, file.name);
      await saveAvatarMutation(uid!, url);
      setFile(null);
      setUserPreview({ ...userPreview, avatar: "" });

      return uploadBytes(storageRef, file);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = async () => {
    if (file === null) return;
    const uid = auth.currentUser?.uid;

    try {
      const imageRef = ref(storage, file.path);

      const deleteFile = await deleteObject(imageRef);
      console.log(deleteFile);
      // await deleteImageAvatarMutation(uid!);
    } catch (error) {
      console.log({ error });
    }
  };

  function messageError(isDragReject: boolean) {
    if (isDragReject) {
      return <p className="text-red-500">Arquivo não suportado</p>;
    }
  }

  return (
    <div className="self-center flex flex-col gap-2 relative">
      {userPreview.avatar && (
        <button
          title="Remove this image"
          onClick={() => {
            setUserPreview({ ...userPreview, avatar: "" });
            setFile(null);
          }}
          className="absolute right-[-1.2rem] top-[-0.5rem] p-1 bg-blue-100/20 hover:bg-blue-100 text-blue-600 rounded-full"
        >
          <X size={20} />
        </button>
      )}
      <div
        {...getRootProps()}
        className={` cursor-pointer w-24 h-24 group relative bg-blue-950/5 overflow-auto border-2 border-dashed border-transparent flex items-center justify-center rounded-full
          text-center ${isDragActive && "border-gray-500"} ${
          isDragReject && "border-red-600"
        } ${isDragAccept && "border-green-600"}`}
      >
        <input
          {...getInputProps()}
          className="bg-transparent outline-none z-10"
        />
        <span className="absolute z-10 bg-gray-300/20 backdrop-blur-sm p-3 rounded-full">
          <UploadIcon className="text-blue-600 group-hover:text-blue-500" />
        </span>

        {userPreview.avatar ? (
          <img
            src={userPreview.avatar}
            className="z-0 w-full h-full"
            alt="image"
          />
        ) : (
          <img src={user.avatar} className="z-0 w-full h-full" alt="image" />
        )}
      </div>

      {file !== null && (
        <button
          title="Save this image as Avatar"
          onClick={saveImageOnStorage}
          className="absolute right-[-1.2rem] bottom-[-0.5rem] p-1 bg-blue-100/20 hover:bg-blue-100 text-blue-600 rounded-full"
        >
          <Check size={20} />
        </button>
      )}
      {messageError(isDragActive)}
    </div>
  );
}
