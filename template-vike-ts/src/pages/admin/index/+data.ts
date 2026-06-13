import { getDashboardStats } from "../../../api/server";

export type Data = ReturnType<typeof data>;

export { data };

async function data() {
  return await getDashboardStats();
}
