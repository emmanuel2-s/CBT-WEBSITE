import { Link } from "react-router-dom";
import api from "../utils/api/api";
import { notifySuccess } from "../utils/toaster";

export async function onLogin(payload) {
  api.Auth.saveAuthData(payload.data);
  notifySuccess(payload.message);
}
