import { useEffect, useRef, useState } from 'react';
import { FiMessageSquare, FiX, FiSend, FiMinus } from 'react-icons/fi';

// Predefined quick suggestions for the user to click on
const SUGGESTIONS = [
  "What's new this season?",
  'Recommend a winter jacket',
  'Summer clothing',
];

export default function ChatWidget() {
  // Tracks if the chat window is open
  const [open, setOpen] = useState(false);

  // Tracks if the chat window is minimized
  const [minimized, setMinimized] = useState(false);

  // The current text in the input field
  const [input, setInput] = useState('');

  // List of messages exchanged between user and assistant
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      role: 'assistant', // can be 'assistant' or 'user'
      text: "Hi! I'm your NovaWear assistant 👋 How can I help?",
    },
  ]);

  // Shows whether the assistant is "typing"
  const [typing, setTyping] = useState(false);

  // Reference to the message scroll container (used to auto-scroll)
  const scrollRef = useRef(null);

  // Whether the user has entered any text (enables/disables Send button)
  const canSend = input.trim().length > 0;

  // When messages change or chat opens/minimizes, scroll to bottom automatically
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, minimized, typing]);

  // Handles sending a message (from typing or quick suggestion)
  const handleSend = (text) => {
    const content = text ?? input.trim(); // use provided text or typed text
    if (!content) return;

    // Add the user's message to the chat
    const userMsg = { id: crypto.randomUUID(), role: 'user', text: content };
    setMessages((prev) => [...prev, userMsg]);
    setInput(''); // clear input
    setTyping(true); // show assistant "typing" animation

    // Placeholder for a real backend call
    setTimeout(() => {
      const reply = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'AI Chatbot implementation is currently under development, but once implemented you will be able to ask for clothing recommendations from our site!',
      };
      setMessages((prev) => [...prev, reply]);
      setTyping(false); // stop typing animation
    }, 1500);
  };

  // Handles when a user clicks a predefined quick suggestion
  const handleQuickReply = (text) => {
    if (!open) setOpen(true); // open chat if closed
    handleSend(text); // send suggestion text
  };

  return (
    <>
      {/* Floating chat button in bottom-right corner */}
      <button
        onClick={() => {
          setOpen((prev) => !prev);
          setMinimized(false);
        }}
        className='fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center'
      >
        {/* Change icon depending on open state */}
        {open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
      </button>

      {/* Chat panel that appears when open */}
      {open && (
        <div className='fixed bottom-24 right-6 z-50 w-88 max-w-[92vw]'>
          <div className='bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden'>
            {/* Header section with title and buttons */}
            <div className='flex items-center justify-between px-4 py-3 bg-blue-600 text-white'>
              <div className='font-semibold'>NovaWear Assistant</div>
              <div className='flex items-center gap-2'>
                {/* Minimize button */}
                <button
                  onClick={() => setMinimized((m) => !m)}
                  className='p-1 rounded hover:bg-white/10'
                >
                  <FiMinus />
                </button>
                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  className='p-1 rounded hover:bg-white/10'
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* Chat body (hidden when minimized) */}
            {!minimized && (
              <>
                {/* Message list area */}
                <div
                  ref={scrollRef}
                  className='max-h-[60vh] overflow-auto px-4 py-3 bg-gray-50'
                >
                  {/* Loop through messages and render them */}
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`mb-2 flex ${
                        m.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-3 py-2 text-sm leading-relaxed max-w-[80%] ${
                          m.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-md'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {typing && (
                    <div className='mb-2 flex justify-start'>
                      <div className='bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md px-3 py-2 text-sm'>
                        <span className='inline-flex items-center gap-1'>
                          <span className='animate-pulse'>.</span>
                          <span className='animate-pulse delay-150'>.</span>
                          <span className='animate-pulse delay-300'>.</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Quick reply buttons shown only if chat is new */}
                  {messages.length <= 2 && (
                    <div className='mt-3 flex flex-wrap gap-2'>
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleQuickReply(s)}
                          className='text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-100 transition'
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message composer at the bottom */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className='flex items-center gap-2 px-3 py-3 border-t border-gray-200 bg-white'
                >
                  <input
                    className='flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Type a message…'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  {/* Send button (disabled when input is empty) */}
                  <button
                    type='submit'
                    disabled={!canSend}
                    className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      canSend
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <FiSend />
                    Send
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
