import { firestore } from "./firebase";

const getPageBySlug = async (slug) => {
  const page = await (
    await firestore.collection("pages").doc(slug).get()
  ).data();
  if (!page) {
    return {};
  }

  page.sections = await DocumentArrayReferenceToJson(page.sections);
  return page;
};

const DocumentArrayReferenceToJson = async (reference) => {
  let promises = await reference.map(async (reference) => {
    let section = (await reference.get()).data();
    section.id = reference.id;
    if (section.commands) {
      section.commands = await DocumentArrayReferenceToJson(section.commands);
    }
    return section;
  });

  return await Promise.all(promises);
};

const getPages = async () => {
  const snapshot = await firestore.collection("pages").get();
  return snapshot.docs.map((doc) => {
    return doc.data();
  });
};

const getPagesOfOwnerId = async (ownerUid) => {
  const snapshot = await firestore
    .collection("pages")
    .where("ownerUid", "==", ownerUid)
    .get();
  return snapshot.docs.map((doc) => {
    return doc.data();
  });
};

const getPageSlugs = async () => {
  const snapshot = await firestore.collection("pages").get();
  return snapshot.docs.map((doc) => {
    return doc.id;
  });
};

const createPage = async (ownerUid, title, description) => {
  console.log(ownerUid);
  let doesExist = (await firestore.collection("pages").doc(title).get()).exists;
  if (!doesExist) {
    firestore.collection("pages").doc(title).set({
      ownerUid,
      title: title,
      description: description,
      sections: [],
    });
    return true;
  } else {
    return false;
  }
};

export { getPageBySlug, getPages, getPagesOfOwnerId, getPageSlugs, createPage };
