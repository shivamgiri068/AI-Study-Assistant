async function askAI() {
  const input = document.getElementById("question");
  const chatBox = document.getElementById("chatBox");
  const loading = document.getElementById("loading");

  const question = input.value.trim();
  if (!question) return;

  chatBox.innerHTML += `<div class="message user">${question}</div>`;
  input.value = "";

  loading.classList.remove("hidden");

  const response = await fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  const data = await response.json();

  loading.classList.add("hidden");

  chatBox.innerHTML += `<div class="message bot">${data.answer}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
