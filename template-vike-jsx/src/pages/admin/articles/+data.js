import { getArticles } from "../../../api/server";

export { data };

async function data() {
  return await getArticles();
}
