// let name = "adi";
// let age = 19;

// let num1 = 25;
// let num2 = 25;
// let sum = num1 + num2;

// Wishlistz Chatbot JavaScript

// Get DOM elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');
const attachButton = document.getElementById('attachButton');
const fileInput = document.getElementById('fileInput');

// Array of bot responses
const botResponses = [
  "Welcome to Wishlistz 🛍️",
  "Men, Women or Kids?",
  "Browse latest fashion 🔥",
  "Great choice!",
  "Added to wishlist ❤️",
  "Item available in all sizes",
  "Check today’s offers 💸",
  "Popular item right now ⭐",
  "View your wishlist anytime",
  "New arrivals are live ✨",
  "Need size help?",
  "More styles available 👗👔",
  "Item saved successfully ✔️",
  "Shop smart with Wishlistz 🛒",
  "What would you like to add?"
];

// Array of file-specific bot responses
const fileResponses = [
    "📎Looks like a shirt 👕 Added to your wishlist",
    "✅Beautiful! dress saved successfully.",
    "✨ Men’s product added 👔.",
    "🎨 Product image saved to wishlist ❤️!"
];

// Array of image-specific bot responses
const imageResponses = [
    "✅Looks like a shirt 👕 Added to your wishlist",
    "📸 Beautiful! dress saved successfully.",
    "✨ Men’s product added 👔.",
    "🎨 Product image saved to wishlist ❤️!"
];

//    Helper Function: Get Current Time
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'

    // Add leading zero to minutes if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
}

// Helper Function: Get File Extension
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
}

//  Helper Function: Get File Icon
function getFileIcon(extension) {
    const iconMap = {
        'pdf': '📄',
        'doc': '📝',
        'docx': '📝',
        'txt': '📃',
        'jpg': '🖼️',
        'jpeg': '🖼️',
        'png': '🖼️'
    };
    return iconMap[extension] || '📎';
}

//  Helper Function: Format File Size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Helper Function: Check if File is Image
function isImageFile(filename) {
    const extension = getFileExtension(filename);
    return ['jpg', 'jpeg', 'png'].includes(extension);
}

//    Helper Function: Scroll to Bottom
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

//    Function: Add Message to Chat
function addMessage(text, isUser = false) {
    // Create message container
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    // Create message content
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    // Create message text
    const messageText = document.createElement('p');
    messageText.textContent = text;

    // Create timestamp
    const messageTime = document.createElement('span');
    messageTime.className = 'message-time';
    messageTime.textContent = getCurrentTime();

    // Append elements
    messageContent.appendChild(messageText);
    messageContent.appendChild(messageTime);
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    scrollToBottom();
}

// Function: Add File Message to Chat
function addImageMessage(imageSrc, isUser = false) {
    // Create message container
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    // Create message content
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content has-image';

    // Create image element
    const img = document.createElement('img');
    img.src = imageSrc;
    img.className = 'message-image';
    img.alt = 'Uploaded image';

    // Create timestamp
    const messageTime = document.createElement('span');
    messageTime.className = 'message-time';
    messageTime.textContent = getCurrentTime();

    // Append elements
    messageContent.appendChild(img);
    messageContent.appendChild(messageTime);
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    scrollToBottom();
}

// Function: Add File Message to Chat
function addFileMessage(fileName, fileSize, isUser = false) {
    // Get file extension and icon
    const extension = getFileExtension(fileName);
    const icon = getFileIcon(extension);

    // Create message container
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    // Create message content
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    // Create file card
    const fileCard = document.createElement('div');
    fileCard.className = 'file-card';

    // Create file icon
    const fileIcon = document.createElement('div');
    fileIcon.className = 'file-icon';
    fileIcon.textContent = icon;

    // Create file info container
    const fileInfo = document.createElement('div');
    fileInfo.className = 'file-info';

    // Create file name
    const fileNameDiv = document.createElement('div');
    fileNameDiv.className = 'file-name';
    fileNameDiv.textContent = fileName;

    // Create file size
    const fileSizeDiv = document.createElement('div');
    fileSizeDiv.className = 'file-size';
    fileSizeDiv.textContent = formatFileSize(fileSize);

    // Append file info
    fileInfo.appendChild(fileNameDiv);
    fileInfo.appendChild(fileSizeDiv);

    // Append to file card
    fileCard.appendChild(fileIcon);
    fileCard.appendChild(fileInfo);

    // Create timestamp
    const messageTime = document.createElement('span');
    messageTime.className = 'message-time';
    messageTime.textContent = getCurrentTime();

    // Append to message content
    messageContent.appendChild(fileCard);
    messageContent.appendChild(messageTime);
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    scrollToBottom();
}

//    Function: Show Typing Indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';

    const typingContent = document.createElement('div');
    typingContent.className = 'message-content';

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';

    // Create three dots
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingIndicator.appendChild(dot);
    }

    typingContent.appendChild(typingIndicator);
    typingDiv.appendChild(typingContent);
    chatMessages.appendChild(typingDiv);

    scrollToBottom();
}

//    Function: Remove Typing Indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

//    Function: Get Random Bot Response
function getRandomBotResponse() {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
}

// Function: Get Random File Response
function getRandomFileResponse() {
    const randomIndex = Math.floor(Math.random() * fileResponses.length);
    return fileResponses[randomIndex];
}

//    Function: Get Random Image Response
function getRandomImageResponse() {
    const randomIndex = Math.floor(Math.random() * imageResponses.length);
    return imageResponses[randomIndex];
}

//    Function: Send Bot Response
function sendBotResponse(isFileUpload = false, isImageUpload = false) {
    // Show typing indicator
    showTypingIndicator();

    // Simulate bot thinking time (1-2 seconds)
    const thinkingTime = Math.random() * 1000 + 1000;

    setTimeout(() => {
        // Remove typing indicator
        removeTypingIndicator();

        // Add bot message based on context
        let botMessage;
        if (isImageUpload) {
            botMessage = getRandomImageResponse();
        } else if (isFileUpload) {
            botMessage = getRandomFileResponse();
        } else {
            botMessage = getRandomBotResponse();
        }

        addMessage(botMessage, false);
    }, thinkingTime);
}

// Function: Handle File Upload
function handleFileUpload(event) {
    const file = event.target.files[0];

    // Check if file exists
    if (!file) {
        return;
    }

    // Check if file is an image
    if (isImageFile(file.name)) {
        // Use FileReader to read image as Data URL
        const reader = new FileReader();

        reader.onload = function(e) {
            // Add image message to chat
            addImageMessage(e.target.result, true);

            // Send bot response for image
            sendBotResponse(false, true);
        };

        // Read file as Data URL (base64)
        reader.readAsDataURL(file);
    } else {
        // Handle other file types (PDF, DOC, TXT)
        addFileMessage(file.name, file.size, true);

        // Send bot response for file
        sendBotResponse(true, false);
    }

    // Reset file input so same file can be uploaded again
    fileInput.value = '';
}
//    Function: Handle Send Message
function handleSendMessage() {
    // Get message text and trim whitespace
    const messageText = messageInput.value.trim();

    // Check if message is not empty
    if (messageText === '') {
        return;
    }

    // Add user message to chat
    addMessage(messageText, true);

    // Clear input field
    messageInput.value = '';

    // Focus back on input
    messageInput.focus();

    // Send bot response after a short delay
    sendBotResponse();
}

//    Event Listeners

// Attach button click event - triggers file input
attachButton.addEventListener('click', () => {
    fileInput.click();
});

// File input change event - handles file upload
fileInput.addEventListener('change', handleFileUpload);

// Send button click event
sendButton.addEventListener('click', handleSendMessage);

// Enter key press event
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
});

// Input field focus on page load
window.addEventListener('load', () => {
    messageInput.focus();

    // Add a slight delay before scrolling to ensure DOM is ready
    setTimeout(scrollToBottom, 100);
});

//    Optional: Disable send button when input is empty
messageInput.addEventListener('input', () => {
    if (messageInput.value.trim() === '') {
        sendButton.style.opacity = '0.5';
        sendButton.style.cursor = 'not-allowed';
    } else {
        sendButton.style.opacity = '1';
        sendButton.style.cursor = 'pointer';
    }
});

// Initialize button state
if (messageInput.value.trim() === '') {
    sendButton.style.opacity = '0.5';
    sendButton.style.cursor = 'not-allowed';
}

// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌞' : '🌓';
});