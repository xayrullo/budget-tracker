import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import type IUser from "@/core/models/user";

export interface IAuth {
  user: IUser;
  jwt: string;
}
export interface IState {
  errors: Object;
  user: IUser;
  isAuthenticated: Boolean;
}
export const useAuthStore = defineStore({
  id: "authStore",
  state: (): IState => ({
    errors: {},
    user: {},
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    setAuth(authUser: IAuth) {
      this.isAuthenticated = true;
      this.user = authUser.user;
      this.errors = {};
      JwtService.saveToken(authUser.jwt);
    },

    setError(error: any) {
      this.errors = { ...error };
    },

    purgeAuth() {
      this.isAuthenticated = false;
      this.user = {} as IUser;
      this.errors = {};
      JwtService.destroyToken();
    },

    login(credentials: { identifier: string; password: string }) {
      return ApiService.post("/auth/local", credentials)
        .then(({ data }) => {
          this.setAuth(data);
        })
        .catch(({ response }) => {
          this.setError(response.data.error);
        });
    },

    logout() {
      this.purgeAuth();
    },

    register(credentials: IUser) {
      return ApiService.post("register", credentials)
        .then(({ data }) => {
          this.setAuth(data);
        })
        .catch(({ response }) => {
          this.setError(response.data.errors);
        });
    },

    forgotPassword(email: string) {
      return ApiService.post("forgot_password", email)
        .then(() => {
          this.setError({});
        })
        .catch(({ response }) => {
          this.setError(response.data.errors);
        });
    },

    verifyAuth() {
      if (JwtService.getToken()) {
        // ApiService.setHeader();
        // ApiService.post("verify_token", { api_token: JwtService.getToken() })
        //   .then(({ data }) => {
        //     setAuth(data);
        //   })
        //   .catch(({ response }) => {
        //     setError(response.data.errors);
        //     purgeAuth();
        //   });
      } else {
        this.purgeAuth();
      }
    },
  },
});
