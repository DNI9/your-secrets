import {useState, useEffect} from 'react';
import {db} from '../config/firebase';

const useMessages = id => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const unSub = db
      .collection('messages')
      .where('secretID', '==', id || '')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        });
        setDocs(documents);
      });
    return () => unSub();
  }, [id]);

  return docs;
};

export default useMessages;
