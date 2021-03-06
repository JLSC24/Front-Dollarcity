import { ContentfulClient } from "react-contentful";

const client = ContentfulClient({
  space: "jtleigjxs00i",
  accessToken: "IG_hT2-83sdOr8oFdvpz0Rd9NCyhZ1SM9tgHqMlgdGo",
});

export async function getPuesto() {
  const entries = await client.getEntries({ content_type: "puestoTrabajo" });
  return entries.items;
}

/* export async function getBlogPosts() {
  const entries = await client.getEntries({ content_type: "blogPost" });
  return entries.items;
}
 */
