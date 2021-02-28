import client from "./client";

const endpoint = "/categories";

const getCategories = () => client.get(endpoint);

export const addCategorie = (categorie, onUploadProgress) => {
  const data = new FormData();
  data.append("backgroundColor", categorie.backgroundColor);
  data.append("icon", categorie.icon);
  data.append("label", categorie.category.label);


  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addCategorie,
  getCategories,
};
