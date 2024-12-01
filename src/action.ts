import { ILogin, ISubscriber, ISubscriptionDetails } from "./types";
import Subscriber from "./data/users.json";
import subscriptions from "./data/subscriptions.json";
export async function LoginAction(data: ILogin): Promise<{ token: string }> {
  if (data.email === "" || data.password === "") {
    throw new Error("Email and password are required");
  } else {
    if (data.email === "test@admin.com" && data.password === "admin123") {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: "1234567890",
          });
        }, 1000);
      });
    }
    throw new Error("Invalid email or password");
  }
}

export async function GetSubscribers(): Promise<ISubscriber[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Subscriber);
    }, 1000);
  });
}

export async function GetSubscriber(id: number): Promise<ISubscriptionDetails> {
  return new Promise((resolve, reject) => {
    const subscriber = Subscriber.find((sub) => sub.id === id);
    const subscription = subscriptions.filter((sub) => sub.id === id);
    if (subscriber) {
      setTimeout(() => {
        resolve({ ...subscriber, subscription });
      }, 1000);
    } else {
      reject(new Error("Subscriber not found"));
    }
  });
}
