import {useState, useEffect} from 'react';
import {db} from '../config/firebase';

const useFirestore = collectionName => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unSub = db
      .collection(collectionName)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        });
        setDocs(documents);
      });
    return () => unSub();
  }, [collectionName]);

  return {docs};
};

export default useFirestore;
