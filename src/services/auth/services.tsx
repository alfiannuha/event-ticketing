import { addDataToDocument, getDocumentByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUpUser(
  requestBody: {
    email: string;
    fullName: string;
    organization_name: string;
    role: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  },
  callback: Function
) {
  // Implement user sign up here

  const data = await getDocumentByField("users", "email", requestBody.email);

  if (data.length > 0) {
    callback(false, "User already exists");
    return;
  }

  // Add user to the database

  // bcrypt password
  requestBody.password = await bcrypt.hash(requestBody.password, 10);
  requestBody.role = "admin";
  requestBody.createdAt = new Date().toISOString();
  requestBody.updatedAt = "";

  await addDataToDocument("users", requestBody, (status: boolean) => {
    callback(status ? true : false, status ? "" : "Failed to add user");
  });
}

export async function signInUser(requestBody: { email: string }) {
  // Implement user sign in here
  const data = await getDocumentByField("users", "email", requestBody.email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

interface LoginWithGoogle {
  email: string;
  fullName: string;
  type: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  password: string;
}

export async function loginWithGoogle(
  requestBody: LoginWithGoogle,
  callback: Function
) {
  // Implement Google login here
  const data = await getDocumentByField("users", "email", requestBody.email);

  if (data.length > 0) {
    callback(data[0]);
  } else {
    requestBody.role = "admin";
    requestBody.createdAt = new Date().toISOString();
    requestBody.updatedAt = "";
    requestBody.password = "";
    // Add user to the database
    await addDataToDocument("users", requestBody, (status: boolean) => {
      callback(status ? requestBody : null);
    });
  }
}
