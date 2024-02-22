import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import type IUser from "@/core/models/user";

import { AUTH, USER } from "@/core/mocks";
import type IResponse from "@/core/models/response";

export interface IAuth {
  user: IUser;
  jwt: string;
}
export interface IState {
  response: IResponse;
  user: IUser;
  isAuthenticated: Boolean;
}
export const useAuthStore = defineStore({
  id: "authStore",
  state: (): IState => ({
    response: {} as IResponse,
    user: {} as IUser,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    setAuth(authUser: IAuth) {
      this.isAuthenticated = true;
      this.user = authUser.user;
      this.response = {
        code: 0,
        success: true,
        message: "",
        data: authUser,
      };
      JwtService.saveToken(authUser.jwt);
    },

    setError(error: IResponse) {
      this.response = { ...error };
    },

    purgeAuth() {
      this.isAuthenticated = false;
      this.user = {} as IUser;
      this.response = {} as IResponse;
      JwtService.destroyToken();
    },

    login(credentials: { email: string; password: string }) {
      return new Promise((resolve, reject) => {
        if (JSON.stringify(credentials) === JSON.stringify(AUTH)) {
          const auth = {
            user: USER,
            jwt: "fasfhjkwerowyeiqfhsakh2$#@#fashfkjhw&(khfafs",
          };
          this.setAuth(auth);
          resolve(this.response);
          return;
        } else {
          reject();
          return this.setError({
            code: 404,
            success: false,
            message: "Login or Password is incorrect",
            data: null,
          });
        }
      });
    },

    logout() {
      this.purgeAuth();
    },

    verifyAuth() {
      if (JwtService.getToken()) {
        const auth: IAuth = {
          user: USER,
          jwt: "fasfhjkwerowyeiqfhsakh2$#@#fashfkjhw&(khfafs",
        };
        return this.setAuth(auth);
      } else this.purgeAuth();
    },
  },
});
