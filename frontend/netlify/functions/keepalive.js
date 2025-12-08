export default async () => {
    const API_URL = process.env.VITE_API_URL;

    try {
        const res = await fetch(`${API_URL}/backend-keep-alive`);
        const data = await res.json();

        console.log("Keepalive response:", data);

        return new Response("OK", { status: 200 });
    } catch (err) {
        console.error("Keepalive failed:", err);

        return new Response("Failed", { status: 500 });
    }
};