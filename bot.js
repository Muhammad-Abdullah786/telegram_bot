import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

// Gemini API key
const geminiApiKey = "AIzaSyC3lZGdRFUnQBxZOu9kT0fjL2qgPGBCTLU";
const telegramToken = "7416994828:AAEliKcJWZXcID1oNyNe-lMcy4gOiG9EuQE";

// Create a bot instance using polling method
const bot = new TelegramBot(telegramToken, { polling: true });

// Function to get a response from Gemini
const getGeminiResponse = async (userMessage) => {
    console.log(`User's message: ${userMessage}`);
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, // Add API key to the URL
            {
                contents: [
                    {
                        parts: [
                            { text: userMessage } // Format the message content as required
                        ]
                    }
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000, // 10 seconds
            }
        );

        // Adjust the response handling based on Gemini's response format
        const geminiResponse = response.data.candidates[0].content.parts[0].text.trim(); // Correct response handling
        console.log(`Gemini response: ${geminiResponse}`);
        return geminiResponse;
    } catch (error) {
        console.error('Error from Gemini API:', error.message);
        return "Sorry, I couldn't process your request at the moment.";
    }
};

// Listen for incoming messages
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    // Handle the /start command
    if (messageText === '/start') {
        await bot.sendMessage(chatId, 'Welcome to the Gemini Bot! Ask me anything!');
        console.log(`The chat ID is: ${chatId}`);
    } else {
        const geminiResponse = await getGeminiResponse(messageText || '');
        console.log(`User's message: ${messageText}`);
        await bot.sendMessage(chatId, geminiResponse);
    }
});


// todo: below is chatgpt
// import TelegramBot from 'node-telegram-bot-api';
// import axios from 'axios';
// const telegramToken = "7416994828:AAEliKcJWZXcID1oNyNe-lMcy4gOiG9EuQE"
// const openaiApiKey = "GEMINI_API_KEY=AIzaSyADD89uZ53un5A579Vk4_Fta4i7xiARJIk"

// // Create a bot instance using polling method
// const bot = new TelegramBot(telegramToken, { polling: true });

// // Function to get a response from ChatGPT
// const getChatGPTResponse = async (userMessage) => {
//     console.log(`the user msg is : ${userMessage}`)
//     try {

//         const response = await axios.post(
//             'https://api.openai.com/v1/chat/completions',
//             { model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: userMessage }] },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${openaiApiKey}`,
//                 },
//                 timeout: 10000, // 10 seconds
//             }
//         );

//         // Extract and return the ChatGPT response
//         console.log(`the response is : ${response.data.choices[0].message.content.trim()}`)
//         return response.data.choices[0].message.content.trim();
//     } catch (error) {
//         console.error('Error  from chat gpt fetching ChatGPT response:', error.message);
//         return "Sorry, I couldn't process your request at the moment.";
//     }
// };

// // Listen for any incoming messages
// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const messageText = msg.text;

//     // Handle the /start command
//     if (messageText === '/start') {
//         await bot.sendMessage(chatId, 'Welcome to the Ken Bot! Ask me anything!');
//         console.log(`the chat id is : ${chatId}`)
//     } else {
//         const chatGPTResponse = await getChatGPTResponse(messageText || '');
//         console.log(`the message is ${messageText}`)
//         await bot.sendMessage(chatId, chatGPTResponse);
//     }
// });
