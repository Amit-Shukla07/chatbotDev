import Header from "./Header";
import { useState } from "react";
import getAIResponse from "./api/gemini";

function App() {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [lastUserMessage, setLastUserMessage] = useState(""); 



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLastUserMessage(userInput); 
    setAiResponse(""); 

    try {
      const result = await getAIResponse(userInput);
      setAiResponse(result);
    } catch (error) {
      setAiResponse("⚠️ Could not get a response.");
      console.error("Error:", error);
    }

    setUserInput(""); 
  };

  return (
    <div className="w-full min-h-screen bg-[#1e1e1e] text-white flex flex-col">
      <Header />

      {/* Chat Section */}
      <main className="flex-1 overflow-y-auto px-6 py-10 w-full md:w-3/4 lg:w-1/2 mx-auto">
        <div className="space-y-6 text-left">

          {/* Welcome Message */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-400">🤖 AI Assistant</h1>
            <p className="text-md font-light text-gray-400 mt-2">
              Ask me anything!
            </p>
          </div>

          {aiResponse && (
            <div className="space-y-4 mt-10">
              <div className="bg-[#2e2e2e] p-4 rounded-lg max-w-full shadow-md">
                <p className="text-sm text-gray-400">You:</p>
                <p className="text-lg text-white">{lastUserMessage}</p> 
              </div>

              <div className="bg-[#3a3a3a] p-4 rounded-lg max-w-full shadow-md">
                <p className="text-sm text-green-400">AI:</p>
                <p className="text-lg text-white whitespace-pre-wrap">{aiResponse}</p>
              </div>
            </div>
          )}
        </div>
      </main>

     
      <div className="fixed bottom-0 w-full bg-[#1e1e1e] border-t border-gray-700 py-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 mx-auto w-full md:w-3/4 lg:w-1/2 px-4"
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-4 py-3 bg-[#2b2b2b] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
