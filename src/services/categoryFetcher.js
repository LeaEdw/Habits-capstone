export const getTaskCategory = async () => {
    const res = await fetch("http://localhost:8088/category")
    return await res.json()
}