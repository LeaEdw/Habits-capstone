export const getTaskCategory = async () => {
  const res = await fetch("http://localhost:8088/category");
  return await res.json();
};

export const getTaskUrgency = async () => {
  const response = await fetch("http://localhost:8088/urgencyLevels");
  return await response.json();
};

export const getTimeOfDay = async () => {
  const response = await fetch("http://localhost:8088/timeOfDay");
  return await response.json();
};
