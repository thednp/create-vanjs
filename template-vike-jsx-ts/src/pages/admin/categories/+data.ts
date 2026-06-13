// @ts-expect-error - this is JS file
import { getCategories } from "../../../api/server";

export type Category = {
  id: number;
  title: string;
  author: string;
};

export { data };

async function data() {
  return await getCategories();
}
