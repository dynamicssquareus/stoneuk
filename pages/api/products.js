export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://discover-pricecalculator.onrender.com/api/v1/inventories"
    );

    if (!response.ok) {
      throw new Error("API failed");
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy API Error:", error);

    res.status(200).json([]); // ✅ always return array (no crash)
  }
}