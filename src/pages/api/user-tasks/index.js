import firebaseInit from "../../../../firebase/init";
import { fetchTalentDomains } from "../tasks/talent-domains";
import { fetchWeaponDomains } from "../tasks/weapon-domains";

// const userTasks = require("@/json/userTasks.json");

async function fetchUserTasks(userId, day) {
  const firestore = firebaseInit().firestore();
  const collection = await firestore.collection('usersTasks').where('userId', '==', parseInt(userId)).where('day', '==', day).get();
  const userTasks = collection.docs.map(doc => doc.data());
  const response = [];
  userTasks.forEach((task, index) => {
    if (task.type === "Domains of Mastery") {
      response.push(fetchTalentDomains(task.name));
    } else if (task.type === "Domains of Forgery") {
      response.push(fetchWeaponDomains(task.name));
    }
    response[index].level = task.level;
    response[index].runs = task.runs;
  });
  return response;
}

export async function addUserTask(userId, taskInfo) {
  const { name, runs, day } = taskInfo;
  const firebase = firebaseInit();
  const firestore = firebase.firestore();
  const check = await firestore.collection('usersTasks').where('userId', '==', userId).where('name', '==', name).where('day', '==', day).get();
  if (!check.empty) {
    const docRef = check.docs[0].ref;
    const res = await docRef.update({ runs: firebase.firestore.FieldValue.increment(runs) });
  } else {
    const userTask = {
      userId,
      ...taskInfo
    };
    const res = await firestore.collection('usersTasks').add(userTask);
  }
}

export async function decrementRuns(userId, taskInfo) {
  const { name, runs, day } = taskInfo;
  const firebase = firebaseInit();
  const firestore = firebase.firestore();
  const snapshot = await firestore.collection('usersTasks').where('userId', '==', userId).where('name', '==', name).where('day', '==', day).get();
  const initialRuns = snapshot.docs[0].get('runs');
  const docRef = snapshot.docs[0].ref;
  if (runs === initialRuns) {
    const res = await docRef.delete();
  } else {
    const res = await docRef.update({ runs: firebase.firestore.FieldValue.increment(-1 * runs) })
  }
}

export default async function main(req, res) {
  const { userId, day } = req.query;
  const response = await fetchUserTasks(userId, day);
  res.status(200).json(response);
}