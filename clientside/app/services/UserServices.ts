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
  static async register(formData: FormData) {
    const response = await apiClient.post("api/v1/registerv2", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  }
  static async getUser() {
    const response = await apiClient.get("/api/v1/auth/me");
    return response;
  }
  static async vtonLogo(imageLink: string, category: string) {
    const response = await apiClient.post('/api/v1/vton-extension', {
      imageLink: imageLink,
      category: category
    })
    return response
  }
}
