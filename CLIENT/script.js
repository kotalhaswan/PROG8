document.getElementById("getStoryButton").addEventListener("click", async function() {
    // Schakel de knop uit en voeg de klasse toe om grijs te worden
    this.disabled = true;
    this.classList.add("disabled");

    try {
        const response = await fetch("http://localhost:8000/story");
        const story = await response.text();
        const aiMessage = `<div class="ai-message"><strong>Mighty storyteller:</strong> ${story}</div>`;
        appendMessage("storyResult", aiMessage);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Schakel de klasse en knop weer in
        this.disabled = false;
        this.classList.remove("disabled");
    }
});

document.getElementById("customStoryForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const promptInput = document.getElementById("prompt");
    const prompt = promptInput.value.trim();

    // Zoek de knop binnen het formulier en schakel deze uit
    const submitButton = this.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.classList.add("disabled");

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
    } finally {
        // Schakel de klasse en knop weer in
        submitButton.disabled = false;
        submitButton.classList.remove("disabled");
    }
});

function appendMessage(containerId, message) {
    const container = document.getElementById(containerId);
    const div = document.createElement("div");
    div.innerHTML = message;
    container.appendChild(div);
}
