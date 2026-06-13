import { getCategories } from "../../../api/server";

export { data };

async function data() {
  return await getCategories();
}
