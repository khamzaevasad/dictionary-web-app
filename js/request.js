export async function getData(apiUrl) {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
