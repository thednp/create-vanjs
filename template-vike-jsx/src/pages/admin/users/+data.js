import { getUsers } from "../../../api/server";

export { data };

async function data() {
  return await getUsers();
}
