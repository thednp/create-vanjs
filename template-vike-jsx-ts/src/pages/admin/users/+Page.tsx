import { usePageContext } from "../../../renderer/usePageContext";
import type { User } from "./+data";

export const Page = () => {
  const { data } = usePageContext();
  const users = data as User[];

  return (
    <div class="h-screen">
      <div class="p-4 m-auto">
        <h1 class="text-5xl font-bold my-8">Users</h1>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                          <img src={user.avatar} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">{user.name}</div>
                        <div class="text-sm opacity-50">{user.country}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.company}
                    <br />
                    <span class="badge badge-ghost badge-sm">{user.job}</span>
                  </td>
                  <td>{user.color}</td>
                  <th>
                    <button type="button" class="btn btn-ghost btn-xs">
                      details
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
