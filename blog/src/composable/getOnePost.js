import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";
import { collection, doc, getDoc } from "firebase/firestore";
const getOnePost = (id) => {
  const post = ref(null);
  const error = ref(null);

  const fetchData = async () => {
    try {
      const docRef = doc(collection(projectFirestore, "posts"), id);
      const docSnapshot = await getDoc(docRef);

      post.value = { ...docSnapshot.data(), id: docSnapshot.id };
    } catch (err) {
      error.value = err.message;
    }
  };

  return { post, error, fetchData };
};

export default getOnePost;
