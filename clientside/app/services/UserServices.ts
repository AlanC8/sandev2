import apiClient from "./Interceptors";

export class UserService {
  static async loginUser(username: string, email: string, password: string) {
    const response = await apiClient.post("/api/v1/login", {
      username: username,
      password: password,
      email: email,
    });
    return response;
  }
  static async register(username: string, email: string, password: string) {
    const response = await apiClient.post("api/v1/register", {
      username: username,
      password: password,
      email: email,
    });
    return response;
  }
  static async getUser(){
    const response = apiClient.get("/api/v1/auth/me");
    return response;
  }
}
