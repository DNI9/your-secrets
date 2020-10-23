import {useState, useEffect} from 'react';
import {db} from '../config/firebase';

const useFirestore = (collectionName, uid) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const unSub = db
      .collection(collectionName)
      .where('uid', '==', uid || '')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        });
        setDocs(documents);
      });
    return () => unSub();
  }, [collectionName, uid]);

  return docs;
};

export default useFirestore;
