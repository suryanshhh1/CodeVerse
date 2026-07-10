async function run() {
  const messages = [
    { role: "assistant", content: "Hello! I am your CodeVerse AI Study Assistant." },
    { role: "user", content: "What is this page?" }
  ];
  
  try {
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, pageContext: "/chat" })
    });

    console.log("Status:", res.status);
    console.log("Headers:", Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      console.error("Error Response:", await res.text());
    } else {
      console.log("Success Response Stream started...");
      // Read a bit of the stream
      const reader = res.body.getReader();
      const { value, done } = await reader.read();
      console.log("First chunk:", new TextDecoder().decode(value));
    }
  } catch (e) {
    console.error("Fetch Error:", e.message);
  }
}

run();
