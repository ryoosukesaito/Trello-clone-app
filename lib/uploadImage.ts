import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    "64a487f86abcdb75838e",
    ID.unique(),
    file
  );

  return fileUploaded;
};

export default uploadImage;
