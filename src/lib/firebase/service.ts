import {
  getDocs,
  getFirestore,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import app from "./init";

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
  return {
    id: docId,
    ...document.data(),
  };
}

export async function getDocumentByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(collection(db, collectionName), where(field, "==", value));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function addDataToDocument(
  collectionName: string,
  data: any,

  callback: Function
) {
  await addDoc(collection(db, collectionName), data)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      console.log("error", error);
      callback(false);
    });
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  callback: Function
) {
  const docRef = doc(db, collectionName, id);

  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteData(
  collectionName: string,
  id: string,
  callback: Function
) {
  const docRef = doc(db, collectionName, id);

  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}
