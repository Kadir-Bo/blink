import { createContext, useContext } from "react";
import { useAuth } from "context";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "auth"; // <-- Firestore-Instance importieren

const DatabaseContext = createContext();
const useDatabase = () => useContext(DatabaseContext);

const DatabaseContextProvider = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    console.warn("No currentUser — DatabaseContext not fully functional.");
  }

  const userRef = currentUser ? doc(db, "users", currentUser.uid) : null;

  const tasksCollectionRef = currentUser
    ? collection(db, "users", currentUser.uid, "tasks")
    : null;

  // ---------------------- CREATE TASK ----------------------------
  const createTask = async ({ title, description }) => {
    if (!title || !description) return;
    try {
      const docRef = await addDoc(tasksCollectionRef, {
        title,
        description,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.error("Failed to create task:", err);
      throw err;
    }
  };

  // ---------------------- READ TASKS ----------------------------
  const readTasks = async () => {
    try {
      const q = query(tasksCollectionRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return tasks;
    } catch (err) {
      console.error("Failed to read tasks:", err);
      throw err;
    }
  };

  // ---------------------- UPDATE TASK ----------------------------
  const updateTask = async (taskId, updatedFields) => {
    if (!taskId || !updatedFields) return;
    try {
      const taskRef = doc(tasksCollectionRef, taskId);
      await updateDoc(taskRef, {
        ...updatedFields,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to update task:", err);
      throw err;
    }
  };

  // ---------------------- DELETE TASK ----------------------------
  const deleteTask = async (taskId) => {
    if (!taskId) return;
    try {
      const taskRef = doc(tasksCollectionRef, taskId);
      await deleteDoc(taskRef);
    } catch (err) {
      console.error("Failed to delete task:", err);
      throw err;
    }
  };

  // ---------------------- UPDATE USER PROFILE ----------------------------
  const updateUser = async (updatedFields) => {
    if (!userRef || !updatedFields) return;
    try {
      await setDoc(
        userRef,
        {
          ...updatedFields,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Failed to update user:", err);
      throw err;
    }
  };

  // ---------------------- GET USER PROFILE ----------------------------
  const getUser = async () => {
    if (!userRef) return;
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.warn("No user profile found.");
        return null;
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      throw err;
    }
  };

  const values = {
    createTask,
    readTasks,
    updateTask,
    deleteTask,
    updateUser,
    getUser,
  };

  return (
    <DatabaseContext.Provider value={values}>
      {children}
    </DatabaseContext.Provider>
  );
};

export { DatabaseContextProvider, useDatabase };
