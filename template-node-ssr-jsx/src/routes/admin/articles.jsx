import { Meta, Title } from "@vanjs/meta";

export const Page = () => {
  Title("Articles");
  Meta({ name: "description", content: "Articles description" });

  return [
    <div class="h-screen">
      <div class="p-4 m-auto">
        <h1 class="text-5xl font-bold my-8">Articles</h1>
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
                <th>Category</th>
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
                      <div class="font-bold">
                        Silicone fabs are running out of water
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge badge-ghost badge-sm">Tech</span>
                </td>
                <td>Jane Doe</td>
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
                        WEF to hold the annual meeting later than originally
                        planned
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge badge-ghost badge-sm">Economics</span>
                </td>
                <td>Yannik Eisen</td>
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
                        Relativity theory challenged by young student
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge badge-ghost badge-sm">Science</span>
                </td>
                <td>Mara Lane</td>
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
                        Last chance to join the 8th of March event
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge badge-ghost badge-sm">Community</span>
                </td>
                <td>Jimmy Delores</td>
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
                <th>Category</th>
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
