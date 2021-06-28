import firebaseInit from "../../../../firebase/init"

export async function fetchUserResin(userId) {
  const firebase = firebaseInit();
  const firestore = firebase.firestore();
  const snapshot = await firestore.collection('resin').where('userId', '==', parseInt(userId)).get();
  const updatedOn = snapshot.docs[0].get('updatedOn').toMillis();
  const condensedResin = snapshot.docs[0].get('condensedResin');
  const originalResin = snapshot.docs[0].get('originalResin');
  return { updatedOn, condensedResin, originalResin };
}


export default async function main(req, res) {
  const { userId } = req.query;
  const response = await fetchUserResin(userId);
  res.status(200).json(response);
}