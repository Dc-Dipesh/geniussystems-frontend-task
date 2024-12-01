import { ILogin } from "./types";

export default async function LoginAction(
  data: ILogin
): Promise<{ token: string }> {
  if (data.email === "" || data.password === "") {
    throw new Error("Email and password are required");
  } else {
    if (data.email === "test@admin.com" && data.password === "admin123") {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: "1234567890",
          });
        }, 5000);
      });
    }
    throw new Error("Invalid email or password");
  }
}
