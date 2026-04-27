/// <reference types="vite/client" />
/// <reference types="vite-plugin-vanjs" />
/// <reference types="vite-vanjs-svg" />

declare module "@/api" {
  // const getData = (): Promise<Record<string, unknown>>
  export function getData(): Promise<Record<string, unknown>>;
  export function getDataSync(): Record<string, unknown>;

  export function getDashboardStats(): Promise<{
    monthlySales: string,
    conversionRate: string,
    monthlyViews: string,
    todayViews: string,
  }>;

  export function getArticles(): 
    Promise<{ id: number, title: string, category: string, author: string }[]>;

  export function getCategories():
    Promise<{ id: number, title: string, author: string }[]>;

  export function getUsers():
    Promise<{ id: number, name: string, country: string, company: string, job: string, color: string, avatar: string }[]>;

}
