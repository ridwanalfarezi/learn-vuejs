import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(projectFirestore, "posts"));
      posts.value = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      error.value = err.message;
    }
  };

  return { posts, error, fetchData };
};

export default getPosts;
