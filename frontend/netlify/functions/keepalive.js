export default async () => {
    const API_URL = process.env.VITE_API_URL;

    try {
        const response = await fetch(`${API_URL}/backend-keep-alive`);
        const data = await response.json();

        return { statusCode: 200, body: JSON.stringify(data) };
    } catch (err) {
        return { statusCode: 500, body: "Failed to ping Render" };
    }
};