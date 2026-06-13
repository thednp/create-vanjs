// @ts-expect-error - this is JS file
import { getArticles } from "../../../api/server";

export type Article = {
  id: number;
  title: string;
  category: string;
  author: string;
};

export { data };

async function data() {
  return await getArticles();
}
