import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { nanoid } from "nanoid";

export const uploadFile = async (file:any, folder:any, originalFile:any) => {
  const metadata = {
    contentType: originalFile.mimetype,
  };
  try {
    const filename = nanoid();
    const storageRef = ref(
      storage,
      `${folder}/${filename}.${originalFile.originalFilename.split(".").pop()}`
    );

    const res = await uploadBytes(storageRef, file, metadata);

    return res.metadata.fullPath;
  } catch (error) {
    throw error;
  }
};

export const getFile = async (path:any) => {
  try {
    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};
