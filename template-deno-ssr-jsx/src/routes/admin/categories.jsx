import { Meta, Title } from "@vanjs/meta";

export const Page = () => {
  Title("Categories");
  Meta({ name: "description", content: "Categories description" });

  return [
    <div class="h-screen">
      <div class="p-4 m-auto">
        <h1 class="text-5xl font-bold my-8">Categories</h1>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <th>Title</th>
                <th>Author</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div>
                      <div class="font-bold">Science</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge badge-ghost badge-sm">Jane Doe</span>
                </td>
                <th>
                  <button type="button" class="btn btn-ghost btn-xs">
                    details
                  </button>
                </th>
              </tr>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div>
                      <div class="font-bold">Economics</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge badge-ghost badge-sm">Jim Cramer</span>
                </td>
                <th>
                  <button type="button" class="btn btn-ghost btn-xs">
                    details
                  </button>
                </th>
              </tr>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div>
                      <div class="font-bold">Health</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge badge-ghost badge-sm">Waren Lee</span>
                </td>
                <th>
                  <button type="button" class="btn btn-ghost btn-xs">
                    details
                  </button>
                </th>
              </tr>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div>
                      <div class="font-bold">
                        Sports
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge badge-ghost badge-sm">Jane Doe</span>
                </td>
                <th>
                  <button type="button" class="btn btn-ghost btn-xs">
                    details
                  </button>
                </th>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Details</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>,
  ];
};
