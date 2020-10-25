import {db} from 'config/firebase';

export const deleteSecret = async id => {
  async function deleteMsgsBelongsToSecret() {
    const querySnapshot = await db
      .collection('messages')
      .where('secretID', '==', id)
      .get();

    const batch = db.batch();
    querySnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    return batch.commit();
  }
  try {
    await db.doc(`secrets/${id}`).delete();
    await deleteMsgsBelongsToSecret();
  } catch (err) {
    console.error(err.message);
  }
};
