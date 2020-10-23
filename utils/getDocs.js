import {db} from 'config/firebase';

const getSingleDoc = async id => {
  const docRef = db.doc(`secrets/${id}`);
  const doc = await docRef.get();
  return {...doc.data(), id: doc.id};
};

const getAllDocs = async collectionName => {
  const snapshot = await db.collection(collectionName).get();
  let documents = [];
  snapshot.forEach(doc => {
    documents.push({...doc.data(), id: doc.id});
  });
  return documents;
};

const isSecretOwner = async (secretID, uid) => {
  const docRef = db.doc(`secrets/${secretID}`);
  const doc = await docRef.get();
  return doc.data().uid === uid;
};

export {getSingleDoc, getAllDocs, isSecretOwner};
