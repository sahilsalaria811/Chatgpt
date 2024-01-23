
  async function generateResponse(prompt) {
    const apiUrl = "https://api.openai.com/v1/engines/davinci/completions";
    const apiKey = "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";

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };

    const data = {
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 150,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseData = await response.json();
        const generatedText = responseData.choices[0].text.trim();
        return generatedText;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


// Function to handle user messages and generate responses
async function sendMessage() {
  var userInput = document.getElementById("user-input");
  var message = userInput.value;
  var chatMessages = document.querySelector(".chat-messages");

  // Create a new message element
  var messageElement = document.createElement("div");
  messageElement.className = "message";

  // Create a new message text element
  var messageText = document.createElement("div");
  messageText.className = "message-text";
  messageText.innerText = message;

  // Add the message text element to the message element
  messageElement.appendChild(messageText);

  // Add the message element to the chat messages container
  chatMessages.appendChild(messageElement);

  // Call the OpenAI GPT-3 API to get a response
  const generatedResponse = await generateResponse("User: " + message);

  // Create a new response message element
  const responseElement = document.createElement("div");
  responseElement.className = "message";

  // Create a new response message text element
  const responseTextElement = document.createElement("div");
  responseTextElement.className = "message-text response";
  responseTextElement.innerText = generatedResponse;

  // Add the response message text element to the response message element
  responseElement.appendChild(responseTextElement);

  // Add the response message element to the chat messages container
  chatMessages.appendChild(responseElement);

  // Clear the user input field
  userInput.value = "";
}

// Example usage of the sendMessage function (you can call this in response to user interactions)
// sendMessage();
