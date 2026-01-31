import React, { useState } from 'react';
import { Sparkles, Copy, Zap } from 'lucide-react';

interface ModelResponse {
  model: string;
  response: string;
  time: string;
  tokens: number;
}

const defaultPrompt = "Explain the difference between REST and GraphQL in interviews.";

const modelResponses: ModelResponse[] = [
  {
    model: 'ChatGPT',
    response: `**REST (Representational State Transfer)**
- Architectural style using HTTP methods (GET, POST, PUT, DELETE)
- Multiple endpoints for different resources
- Fixed data structure returned

**GraphQL**
- Query language for APIs
- Single endpoint
- Client specifies exactly what data it needs

**Pros/Cons:**

REST:
✓ Simple, widely adopted
✓ Better caching
✗ Over-fetching/under-fetching data

GraphQL:
✓ Flexible queries
✓ Strongly typed schema
✗ Complex caching
✗ Steeper learning curve

**Interview Tip:** Emphasize that REST is great for simple, predictable APIs while GraphQL excels when clients need flexible data requirements.`,
    time: '1.2s',
    tokens: 245
  },
  {
    model: 'Gemini',
    response: `**Key Conceptual Differences:**

1. **Data Fetching Approach**
   - REST: Resource-based with multiple endpoints
   - GraphQL: Query-based with single endpoint

2. **Response Structure**
   - REST: Server determines response structure
   - GraphQL: Client defines exact data needs

3. **Practical Usage**
   - REST: Better for public APIs, simple CRUD operations
   - GraphQL: Ideal for complex data relationships, mobile apps

**Real-world Scenario:**
A social media app needs user profile + posts + comments. 
- REST: 3 separate API calls
- GraphQL: 1 query fetching all related data

**Interview Focus:** Demonstrate understanding of trade-offs based on application requirements.`,
    time: '1.4s',
    tokens: 198
  },
  {
    model: 'Perplexity',
    response: `**Core Differences:**

• **Architecture:** REST uses multiple endpoints; GraphQL uses one endpoint
• **Data Control:** GraphQL lets clients request specific fields
• **Versioning:** REST often needs API versioning; GraphQL uses schema evolution

**REST Strengths:**
• Simpler to implement
• Better HTTP caching
• Industry standard

**GraphQL Strengths:**
• Eliminates over-fetching
• Reduces number of requests
• Self-documenting API

**When to Use:**
- REST → Public APIs, microservices, simple resources
- GraphQL → Complex data models, mobile apps, rapid iteration

**Interview Strategy:** Show you understand both are tools, not religions. Choose based on project needs.`,
    time: '1.1s',
    tokens: 176
  },
  {
    model: 'Claude',
    response: `**Fundamental Distinction:**

REST and GraphQL solve the same problem (data transfer over HTTP) but with different philosophies:

**REST (Resource-Oriented):**
- Multiple endpoints representing resources (/users, /posts)
- Standard HTTP methods define operations
- Server controls response payload

**GraphQL (Query-Oriented):**
- Single endpoint (/graphql)
- Client defines exact data requirements via queries
- Strongly-typed schema provides contract

**Trade-offs:**
| Aspect | REST | GraphQL |
|--------|------|---------|
| Learning Curve | Low | Medium |
| Flexibility | Fixed | High |
| Caching | Native HTTP | Custom |
| Tooling | Mature | Growing |

**Interview Insight:** Mention that GraphQL was created by Facebook to address mobile app data efficiency challenges.`,
    time: '1.3s',
    tokens: 212
  },
  {
    model: 'DeepSeek',
    response: `**Technical Comparison:**

**REST API Pattern:**
\`\`\`
GET /api/users/123
GET /api/users/123/posts
GET /api/posts/456/comments
\`\`\`
→ Multiple round trips, potential over-fetching

**GraphQL Pattern:**
\`\`\`graphql
query {
  user(id: 123) {
    name
    posts {
      title
      comments { text }
    }
  }
}
\`\`\`
→ Single request, precise data

**Key Differences:**
1. **Endpoint Structure:** REST has many; GraphQL has one
2. **Data Fetching:** REST fixed; GraphQL flexible
3. **Type System:** REST informal; GraphQL strongly-typed

**Production Considerations:**
- REST: Better for simple CRUD, public APIs
- GraphQL: Better for complex relationships, bandwidth-sensitive apps

**Interview Answer Framework:** Start with definition → Compare patterns → Discuss trade-offs → Provide use case examples`,
    time: '1.5s',
    tokens: 234
  },
  {
    model: 'Grok',
    response: `**The Bottom Line:**

REST = Multiple specialized endpoints
GraphQL = One flexible endpoint that does it all

**REST Example:**
Need user info? → GET /users/123
Need their posts? → GET /users/123/posts
Need comments? → GET /posts/456/comments

Result: 3 HTTP calls, probably getting data you don't need

**GraphQL Example:**
One query gets everything:
"Give me user 123's name, their last 5 posts, and 3 comments per post"
Result: 1 HTTP call, exact data needed

**When REST Wins:**
✓ Simple resource-based APIs
✓ Heavy caching needs
✓ You want HTTP standards everywhere

**When GraphQL Wins:**
✓ Mobile apps (bandwidth matters)
✓ Complex nested data
✓ Rapid frontend iteration

**Interview Power Move:** "Both are tools. REST is like ordering off a menu. GraphQL is like building your own bowl at Chipotle—you get exactly what you want, nothing more."`,
    time: '1.0s',
    tokens: 189
  }
];

export function AIHub() {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [selectedModels, setSelectedModels] = useState<string[]>(['ChatGPT', 'Gemini', 'Perplexity', 'Claude', 'DeepSeek', 'Grok']);
  const [showResponses, setShowResponses] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(false);

  const models = ['ChatGPT', 'Gemini', 'Perplexity', 'Claude', 'DeepSeek', 'Grok'];

  const toggleModel = (model: string) => {
    setSelectedModels(prev =>
      prev.includes(model)
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  const handleRunModels = () => {
    setLoading(true);
    setShowSummary(false);
    setTimeout(() => {
      setShowResponses(true);
      setLoading(false);
    }, 2000);
  };

  const handleSummarize = () => {
    setShowSummary(true);
  };

  const copyToClipboard = (text: string) => {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          // Success - could add a toast notification here
        })
        .catch(() => {
          // Fallback to older method
          fallbackCopy(text);
        });
    } else {
      // Use fallback method
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
    } catch (err) {
      console.error('Failed to copy text: ', err);
      textArea.remove();
    }
  };

  const filteredResponses = modelResponses.filter(r => selectedModels.includes(r.model));

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
            🧠 AI Hub
          </span>
        </h2>
        <p className="text-gray-400">Multi-Model Intelligence Panel - Compare responses across AI models</p>
      </div>

      {/* Prompt Engine Panel */}
      <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-purple-500/5">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">Prompt Engine</h3>
        
        {/* Prompt Input */}
        <div className="mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="w-full h-32 px-4 py-3 bg-[#0B0B0F] border-2 border-blue-500/30 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none shadow-lg shadow-blue-500/10"
            style={{ 
              background: 'linear-gradient(180deg, #0B0B0F 0%, #121218 100%)',
            }}
          />
        </div>

        {/* Model Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3 text-gray-300">Select Models</label>
          <div className="flex flex-wrap gap-2">
            {models.map((model) => (
              <button
                key={model}
                onClick={() => toggleModel(model)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedModels.includes(model)
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-300'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleRunModels}
            disabled={selectedModels.length === 0 || loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {loading ? 'Running Models...' : 'Run All Models'}
          </button>
          {showResponses && (
            <button
              onClick={handleSummarize}
              className="px-6 py-3 bg-white/5 border-2 border-purple-500/50 text-white rounded-lg font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Summarize Insights
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Querying AI models...</p>
        </div>
      )}

      {/* Model Responses Grid */}
      {showResponses && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResponses.map((response) => (
            <div
              key={response.model}
              className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-blue-500/5 hover:border-blue-500/30 transition-all"
            >
              {/* Model Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {response.model}
                </h4>
                <button
                  onClick={() => copyToClipboard(response.response)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  title="Copy response"
                >
                  <Copy className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Response Content */}
              <div className="mb-4 max-h-96 overflow-y-auto custom-scrollbar">
                <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-sans">
                  {response.response}
                </pre>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/10">
                <span className="flex items-center gap-1">
                  ⚡ {response.time}
                </span>
                <span className="flex items-center gap-1">
                  🔤 {response.tokens} tokens
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Unified Summary */}
      {showSummary && (
        <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-violet-500/10 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl p-8 shadow-2xl shadow-purple-500/20 animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              🔮 Unified Summary
            </span>
          </h3>

          <div className="space-y-6 text-gray-300">
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-2">Core Differences</h4>
              <p className="leading-relaxed">REST uses multiple resource-based endpoints with fixed responses, while GraphQL uses a single endpoint where clients specify exact data requirements through flexible queries.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-green-400 mb-2">REST Strengths</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Simple to implement and understand</li>
                <li>Excellent HTTP caching support</li>
                <li>Widely adopted industry standard</li>
                <li>Better for public APIs and microservices</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-2">GraphQL Strengths</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Eliminates over-fetching and under-fetching</li>
                <li>Reduces number of network requests</li>
                <li>Strongly-typed schema provides clarity</li>
                <li>Ideal for mobile apps and complex data models</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-2">When to Use Each</h4>
              <p className="leading-relaxed text-gray-400">Choose REST for simple CRUD operations, public APIs, and when HTTP caching is crucial. Choose GraphQL for bandwidth-sensitive applications, complex nested data relationships, and when rapid frontend iteration is needed.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-orange-400 mb-2">Interview Strategy Tip</h4>
              <p className="leading-relaxed text-gray-400">Demonstrate understanding that both are tools, not competing religions. Show you can evaluate trade-offs based on specific project requirements rather than dogmatic preferences.</p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-center italic text-blue-300">
                💡 <strong>Key Takeaway:</strong> REST is like ordering from a fixed menu; GraphQL is like building a custom bowl—you get exactly what you need, nothing more.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}