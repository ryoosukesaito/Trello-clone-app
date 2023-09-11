import { account } from "@/appwrite";
import { create } from "zustand";

interface UserState {
  user: User;
  getUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: {
    $id: "",
    name: "",
    email: "",
    password: "",
  },

  getUser: async () => {
    const UserData = await account.get();
    set({
      user: {
        $id: UserData.$id,
        name: UserData.name,
        email: UserData.email,
        password: UserData.password,
      },
    });
  },
}));
