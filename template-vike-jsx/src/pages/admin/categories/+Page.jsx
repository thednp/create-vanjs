import { usePageContext } from "../../../renderer/usePageContext";

export const Page = () => {
  const pageContext = usePageContext();
  const categories = pageContext.data;

  return (
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
              {categories?.map((cat) => (
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div class="flex items-center gap-3">
                      <div>
                        <div class="font-bold">{cat.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="badge badge-ghost badge-sm">{cat.author}</span>
                  </td>
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
                <th>Title</th>
                <th>Author</th>
                <th>Details</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
