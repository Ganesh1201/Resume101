// Placeholder for AI Assistant logic
// In the future, integrate with an AI API (e.g., OpenAI, HuggingFace) to provide suggestions

function showAISuggestion(message) {
  document.getElementById('ai-suggestions').innerText = message;
}

// Example usage (replace with real AI integration later):
// showAISuggestion('Try to highlight your leadership skills in your project descriptions!');

// Floating AI Chatbot logic
const chatbotCircle = document.getElementById('ai-chatbot-circle');
const chatbotWindow = document.getElementById('ai-chatbot-window');
const chatbotClose = document.getElementById('ai-chatbot-close');

chatbotCircle.onclick = function() {
  chatbotWindow.style.display = 'block';
  chatbotCircle.style.display = 'none';
};
chatbotClose.onclick = function() {
  chatbotWindow.style.display = 'none';
  chatbotCircle.style.display = 'flex';
};

// ChatGPT API integration (for demo/testing only)
async function askChatGPT(message) {
  showAISuggestion('Thinking...');
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No response';
    showAISuggestion(reply);
  } catch (err) {
    showAISuggestion('Error: Unable to get response.');
  }
}

document.getElementById('ai-send-btn').onclick = function() {
  const userInput = document.getElementById('ai-user-input').value;
  if (userInput.trim()) {
    askChatGPT(userInput);
  }
};
