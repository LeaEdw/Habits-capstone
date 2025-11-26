export const getUserByEmail = async (email) => {
  const res = await fetch(`http://localhost:8088/users?email=${email}`)
  return await res.json()
}