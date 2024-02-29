

document.getElementById("getStoryButton").addEventListener("click", async function() {
    console.log("you clicked fr");
    try {
        const response = await fetch("http://localhost:8000/story");
        const story = await response.text();
        document.getElementById("storyResult").innerHTML = `<p>${story}</p>`;
    } catch (error) {
        console.error("Error:", error);
    }
});
document.getElementById("customStoryForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const promptInput = document.getElementById("prompt");
    const prompt = promptInput.value.trim();
    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        document.getElementById("customStoryResult").innerHTML = `<p>${data.message}</p>`;
    } catch (error) {
        console.error("Error:", error);
    }
});