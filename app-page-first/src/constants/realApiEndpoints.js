export const REAL_ENDPOINTS = [
  {
    label: "GET /posts",
    url: "https://jsonplaceholder.typicode.com/posts?_limit=5",
    method: "GET",
    description: "Fetch course posts list",
    expectSuccess: true,
  },
  {
    label: "GET /users",
    url: "https://jsonplaceholder.typicode.com/users?_limit=3",
    method: "GET",
    description: "Fetch enrolled students",
    expectSuccess: true,
  },
  {
    label: "POST /posts",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    body: { title: "New Module", body: "Stencil + React", userId: 1 },
    description: "Create new course module",
    expectSuccess: true,
  },
  {
    label: "GET /404",
    url: "https://jsonplaceholder.typicode.com/posts/99999",
    method: "GET",
    description: "Fetch non-existent resource → 404",
    expectSuccess: false,
  },
  {
    label: "Bad Domain",
    url: "https://this-domain-does-not-exist-lb.xyz/api",
    method: "GET",
    description: "Unreachable host → Network Error",
    expectSuccess: false,
  },
];
