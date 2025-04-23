import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../../firebase-config";

// CREATE POST
export async function createPost(postData, userId) {
  try {
    // strip out any client-side id
    const { id, ...rest } = postData;
    const postToSave = {
      pinned: false,
      ...rest,
      authorId: userId,
      createdAt: Timestamp.now(),
    };
    const postsRef = collection(firestore, "posts");
    const docRef = await addDoc(postsRef, postToSave);
    return { id: docRef.id, ...postToSave };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// GET POSTS
export async function getPosts() {
  try {
    const postsRef = collection(firestore, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        ...data,                  // all fields except id
        id: docSnap.id,          // Firestore document ID
        createdAt: data.createdAt?.toDate() || new Date(),
      };
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// UPDATE POST
export async function updatePost(postId, updatedData) {
  try {
    const postRef = doc(firestore, "posts", postId);
    await updateDoc(postRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

// TOGGLE PIN
export async function togglePinPost(postId, pinned) {
  try {
    const postRef = doc(firestore, "posts", postId);
    await updateDoc(postRef, { pinned });
    return true;
  } catch (error) {
    console.error("Error toggling pin:", error);
    throw error;
  }
}

// DELETE POST
export async function deletePost(postId) {
  try {
    const postRef = doc(firestore, "posts", postId);
    await deleteDoc(postRef);
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}