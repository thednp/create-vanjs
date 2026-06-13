import { getDashboardStats } from "../../../api/server";

export { data };

async function data() {
  return await getDashboardStats();
}
