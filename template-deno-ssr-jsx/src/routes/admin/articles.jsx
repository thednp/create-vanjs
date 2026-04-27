import { Meta, Title } from "@vanjs/meta";
import { useRouteData } from "@vanjs/router";
import { getArticles } from "@/api";


export const route = {
  load: async (_params) => {
    return await getArticles();
  },
};


export const Page = () => {
  Title("Articles");
  Meta({ name: "description", content: "Articles description" });
  const data = useRouteData();

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
              {(data || []).map((article) => (
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
                          {article.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="badge badge-ghost badge-sm">{article.category}</span>
                  </td>
                  <td>{article.author}</td>
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
