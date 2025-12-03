export const createTask = async (task) => {
  const res = await fetch("http://localhost:8088/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return await res.json();
};
