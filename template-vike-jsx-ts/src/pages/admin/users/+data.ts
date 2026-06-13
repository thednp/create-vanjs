// @ts-expect-error - this is JS file
import { getUsers } from "../../../api/server";

export type User = {
  id: number;
  name: string;
  country: string;
  company: string;
  job: string;
  color: string;
  avatar: string;
};

export { data };

async function data() {
  return await getUsers();
}
