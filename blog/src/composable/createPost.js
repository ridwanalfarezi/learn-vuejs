import { projectFirestore } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";

const postPost = async (post) => {
  await addDoc(collection(projectFirestore, "posts"), post);
};

export default postPost;
