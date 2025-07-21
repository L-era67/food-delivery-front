export const database = async (
  path: string,
  method: string = "GET",
  body: any = null
) => {
  const response = await fetch(`http://localhost:4000/${path}`, {
    method: method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return response;
};
