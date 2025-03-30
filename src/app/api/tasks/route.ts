
import { fetchData } from "@lib/supabaseClient";

export  async function GET() {

    try {
        const data = await fetchData("tasks"); // Pass table name dynamically
        return new Response(JSON.stringify(data),{
             status:404,
             headers:{ "Content-Type": "application/json" }
     });
    } catch (error) {
        console.error("Error fetching data:", error);
      return
    return new Response(JSON.stringify({ error: error}),{
        status:500,
        headers:{ "Content-Type": "application/json" }
    })

    }
}