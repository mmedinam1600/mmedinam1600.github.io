
class Fetch {
  async getData(url) {
    try {
      const data = await fetch(url);
      if(data.status === 404) {
        return { error: "No se encontró el pokemon." };
      }
      return data.json();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}