// server side data
export const getData = async () => {
  return { a: 1, b: false };
};

export const getDashboardStats = async () => {
  return {
    monthlySales: "$89,400",
    conversionRate: "$576",
    monthlyViews: "47,558",
    todayViews: "1,553",
  };
};

export const getArticles = async () => {
  return [
    {
      id: 1,
      title: "Silicone fabs are running out of water",
      category: "Tech",
      author: "Jane Doe",
    },
    {
      id: 2,
      title: "WEF to hold the annual meeting later than originally planned",
      category: "Economics",
      author: "Yannik Eisen",
    },
    {
      id: 3,
      title: "Relativity theory challenged by young student",
      category: "Science",
      author: "Mara Lane",
    },
    {
      id: 4,
      title: "Last chance to join the 8th of March event",
      category: "Community",
      author: "Jimmy Delores",
    },
  ];
};

export const getCategories = async () => {
  return [
    { id: 1, title: "Science", author: "Jane Doe" },
    { id: 2, title: "Economics", author: "Jim Cramer" },
    { id: 3, title: "Health", author: "Waren Lee" },
    { id: 4, title: "Sports", author: "Jane Doe" },
  ];
};

export const getUsers = async () => {
  return [
    {
      id: 1,
      name: "Hart Hagerty",
      country: "United States",
      company: "Zemlak, Daniel and Leannon",
      job: "Desktop Support Technician",
      color: "Purple",
      avatar: "https://img.daisyui.com/images/profile/demo/1@94.webp",
    },
    {
      id: 2,
      name: "Brice Swyre",
      country: "China",
      company: "Carroll Group",
      job: "Tax Accountant",
      color: "Red",
      avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    },
    {
      id: 3,
      name: "Marjy Ferencz",
      country: "Russia",
      company: "Rowe-Schoen",
      job: "Office Assistant I",
      color: "Crimson",
      avatar: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    },
    {
      id: 3,
      name: "Aoi Monoko",
      country: "Japan",
      company: "Aoi Tech",
      job: "Marketing Associate",
      color: "Purple",
      avatar: "https://img.daisyui.com/images/profile/demo/4@94.webp",
    },
    {
      id: 4,
      name: "Yancy Tear",
      country: "Brazil",
      company: "Wyman-Ledner",
      job: "Community Outreach Specialist",
      color: "Indigo",
      avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
    },
  ];
};
