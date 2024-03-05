document.getElementById("getStoryButton").addEventListener("click", async function() {
    try {
        const response = await fetch("http://localhost:8000/story");
        const story = await response.text();
        const aiMessage = `<p><strong>Mighty storyteller:</strong> ${story}</p>`;
        document.getElementById("storyResult").innerHTML = aiMessage;
    } catch (error) {
        console.error("Error:", error);
    }
});

document.getElementById("customStoryForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const promptInput = document.getElementById("prompt");
    const prompt = promptInput.value.trim();
    try {
        const response = await fetch("http://localhost:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        const userMessage = `<p><strong>You:</strong> ${prompt}</p>`;
        const aiMessage = `<p><strong>Mighty storyteller:</strong> ${data.message}</p>`;
        document.getElementById("customStoryResult").innerHTML = userMessage + aiMessage;
    } catch (error) {
        console.error("Error:", error);
    }
});
