export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/posts')) {
      if (request.method === 'GET') {
        const posts = [
          {
            id: 1,
            title: 'The Future of Web Development in 2025',
            content: '![Web Development](https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop)\n\nThe landscape of web development continues to evolve at breakneck speed. As we navigate through 2025, several key trends are reshaping how we build and deploy applications.\n\n## Edge Computing Revolution\n\nEdge computing has moved from a nice-to-have to an essential architecture pattern. With platforms like Cloudflare Workers and Vercel Edge Functions, we can now run server-side logic closer to users than ever before...',
            excerpt: 'Exploring the latest trends in web development for 2025, including edge computing, serverless databases, and AI-powered development tools.',
            author: 'Alex Chen',
            published: true,
            created_at: '2025-01-15T10:30:00Z',
            updated_at: '2025-01-15T10:30:00Z'
          },
          {
            id: 2,
            title: 'Building Responsive UIs with Modern CSS',
            content: '![CSS Grid Layout](https://images.unsplash.com/photo-1545665277-5937750b7c98?w=800&h=400&fit=crop)\n\nModern CSS has evolved tremendously, giving developers powerful tools to create responsive, beautiful user interfaces without relying heavily on frameworks.\n\n## CSS Grid: The Layout Revolution\n\nCSS Grid has revolutionized how we approach layout design. Unlike Flexbox, which is one-dimensional, Grid allows us to work in two dimensions simultaneously...',
            excerpt: 'Learn how modern CSS features like Grid, Container Queries, and Custom Properties are revolutionizing responsive web design.',
            author: 'Sarah Johnson',
            published: true,
            created_at: '2025-02-22T14:15:00Z',
            updated_at: '2025-02-22T14:15:00Z'
          },
          {
            id: 3,
            title: 'Getting Started with Cloudflare D1 Database',
            content: '![Database Schema](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop)\n\nCloudflare D1 is a serverless SQL database that runs on Cloudflare\\'s global network. In this tutorial, we\\'ll explore how to set up and use D1 for your next project.\n\n## What is Cloudflare D1?\n\nD1 is built on SQLite, one of the most widely deployed database engines in the world...',
            excerpt: 'A comprehensive guide to getting started with Cloudflare D1, the serverless SQL database that runs at the edge.',
            author: 'Michael Rodriguez',
            published: true,
            created_at: '2025-03-08T09:45:00Z',
            updated_at: '2025-03-08T09:45:00Z'
          }
        ];
        
        return new Response(JSON.stringify({ posts }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // Serve the main page
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NextBlog - A Modern Blog Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body class="bg-gray-50 min-h-screen">
    <div id="root"></div>
    
    <script type="text/babel">
        const { useState, useEffect } = React;
        
        function BlogApp() {
            const [posts, setPosts] = useState([]);
            const [loading, setLoading] = useState(true);
            
            useEffect(() => {
                fetch('/api/posts')
                    .then(res => res.json())
                    .then(data => {
                        setPosts(data.posts || []);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error('Error fetching posts:', err);
                        setLoading(false);
                    });
            }, []);
            
            if (loading) {
                return (
                    <div className="container mx-auto px-4 py-8">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading posts...</p>
                        </div>
                    </div>
                );
            }
            
            return (
                <div className="container mx-auto px-4 py-8">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">NextBlog</h1>
                        <p className="text-xl text-gray-600">A Modern Blog Platform Powered by Next.js and Cloudflare D1</p>
                    </header>

                    <main className="max-w-4xl mx-auto">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map(post => (
                                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                        <div className="flex justify-between items-center text-sm text-gray-500">
                                            <span>By {post.author}</span>
                                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </main>

                    <footer className="mt-16 text-center text-gray-500">
                        <p>&copy; 2025 NextBlog. Built with Next.js, deployed on Cloudflare.</p>
                        <p className="mt-2">
                            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                            Site is live and operational!
                        </p>
                    </footer>
                </div>
            );
        }
        
        ReactDOM.render(<BlogApp />, document.getElementById('root'));
    </script>
</body>
</html>`;
    
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
};