import {db} from 'config/firebase';

export const deleteSecret = async id => await db.doc(`secrets/${id}`).delete();
