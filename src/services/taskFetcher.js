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

export const getTaskByUserId = async (userId) => {
  const res = await fetch(`http://localhost:8088/task?userId=${userId}`);
  return await res.json();
};

export const updateTask = async (task) => {
  return fetch(`http://localhost:8088/task/${task.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};
