import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase.js';

const recordsCollection = (uid) => collection(db, 'users', uid, 'healthRecords');

export async function createRecord(uid, data) {
  const ref = await addDoc(recordsCollection(uid), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getRecords(uid) {
  const q =  query(recordsCollection(uid), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function updateRecord(uid, recordId, data) {
  await updateDoc(doc(db, 'users', uid, 'healthRecords', recordId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteRecord(uid, recordId) {
  await deleteDoc(doc(db, 'users', uid, 'healthRecords', recordId));
}
