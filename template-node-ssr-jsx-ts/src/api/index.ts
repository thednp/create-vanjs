// client side fetch
export const getData = async () => {
  return await fetch("/api").then(r => r.json());
}

export const getDashboardStats = async () => {
  return await fetch("/api/dashboard-stats").then(r => r.json());
}

export const getArticles = async () => {
  return await fetch("/api/articles").then(r => r.json());
}

export const getCategories = async () => {
  return await fetch("/api/categories").then(r => r.json());
}

export const getUsers = async () => {
  return await fetch("/api/users").then(r => r.json());
}
