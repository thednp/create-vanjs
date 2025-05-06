import { Link } from "../../../components/Link";

export const Page = () => {
  return (
    <div class="h-screen">
      <div class="p-4 m-auto">
        <h1 class="text-5xl font-bold my-8">Hello Administrator!</h1>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full lg:w-1/2 stats bg-base-100 border border-base-300">
            <div class="stat">
              <div class="stat-title">This month sales</div>
              <div class="stat-value">$89,400</div>
              <div class="stat-actions">
                <Link href="/admin/not-found" class="btn btn-xs">
                  Not found
                </Link>
              </div>
            </div>
            <div class="stat">
              <div class="stat-title">Conversion rate</div>
              <div class="stat-value">$576</div>
              <div class="stat-actions">
                <button type="button" class="btn btn-xs btn-success">
                  Cashflow
                </button>
                <button type="button" class="btn btn-xs">Trends</button>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-1/2 stats bg-base-100 border border-base-300">
            <div class="stat">
              <div class="stat-title">Monthly Views</div>
              <div class="stat-value">47,558</div>
              <div class="stat-actions">
                <button type="button" class="btn btn-xs">Analytics</button>
              </div>
            </div>
            <div class="stat">
              <div class="stat-title">Today's Views</div>
              <div class="stat-value">1,553</div>
              <div class="stat-actions">
                <button type="button" class="btn btn-xs">Estaimated</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
