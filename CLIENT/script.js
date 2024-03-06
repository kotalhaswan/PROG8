document.getElementById("getStoryButton").addEventListener("click", async function() {
    try {
        const response = await fetch("http://localhost:8000/story");
        const story = await response.text();
        const aiMessage = `<div class="ai-message"><strong>Mighty storyteller:</strong> ${story}</div>`;
        appendMessage("storyResult", aiMessage);
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
        const userMessage = `<br><div class="user-message"><strong>You:</strong> ${prompt}</div> <br>`;
        const aiMessage = `<div class="ai-message"><strong>Mighty storyteller:</strong> ${data.message}</div>`;
        appendMessage("customStoryResult", userMessage);
        appendMessage("customStoryResult", aiMessage);
    } catch (error) {
        console.error("Error:", error);
    }
});

function appendMessage(containerId, message) {
    const container = document.getElementById(containerId);
    const div = document.createElement("div");
    div.innerHTML = message;
    container.appendChild(div);
}
