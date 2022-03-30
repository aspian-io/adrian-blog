import { Subscriber } from "models/auth/auth-suscriber.model";

export async function authSubscribersList() {
  const subscribers = await Subscriber.find();
  return subscribers;
}