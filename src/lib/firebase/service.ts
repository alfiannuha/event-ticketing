/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getDocs,
  getFirestore,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  collection,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

export const db = getFirestore(app);

export async function getCollection(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getDocument(collectionName: string, docId: string) {
  const docRef = doc(db, collectionName, docId);
  const document = await getDoc(docRef);
  return document.data();
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export async function signUpUser(
  requestBody: {
    email: string;
    fullName: string;
    organization_name: string;
    password: string;
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function
) {
  // Implement user sign up here
  const q = query(
    collection(db, "users"),
    where("email", "==", requestBody.email)
  );

  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("data service", data);

  if (data.length > 0) {
    callback(false, "User already exists");
    return;
  }

  // Add user to the database

  // bcrypt password
  requestBody.password = await bcrypt.hash(requestBody.password, 10);

  await addDoc(collection(db, "users"), requestBody)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      console.log("error", error);
      callback(false);
    });
}

export async function signInUser(requestBody: { email: string }) {
  // Implement user sign in here
  const q = query(
    collection(db, "users"),
    where("email", "==", requestBody.email)
  );

  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  requestBody: any,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function
) {
  // Implement Google login here
  const q = query(
    collection(db, "users"),
    where("email", "==", requestBody.email)
  );

  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback(data[0]);
  } else {
    await addDoc(collection(db, "users"), requestBody)
      .then(() => {
        callback(requestBody);
      })
      .catch((error) => {
        console.log("error", error);
        callback(null);
      });
  }
}
