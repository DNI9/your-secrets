import {useState, useEffect} from 'react';
import {db} from '../config/firebase';

const useSingleDoc = id => {
  const [doc, setDoc] = useState();

  useEffect(() => {
    db.doc(`secrets/${id}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          setDoc({...doc.data(), id: doc.id});
        }
      });
  }, [id]);
  return {doc};
};

export default useSingleDoc;
