-- Database schema for the Next.js blog
-- This file can be used to initialize your D1 database

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL,
  published BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT OR IGNORE INTO posts (id, title, content, excerpt, author, published) VALUES 
(1, 'Welcome to Your New Blog!', 
 'This is your first blog post! This Next.js application is powered by Cloudflare D1, a serverless SQL database that runs at the edge. 

You can create, edit, and delete posts through the API endpoints, and everything is stored securely in your D1 database.

Features of this blog:
- Create and manage blog posts
- Search functionality
- Responsive design with Tailwind CSS
- Edge runtime for fast performance
- TypeScript for better development experience

To get started, try creating a new post using the form on the right side of the page!',
 'Welcome to your new Next.js blog powered by Cloudflare D1! Learn about the features and how to get started.',
 'Blog Admin', 1),

(2, 'Understanding Cloudflare D1',
 'Cloudflare D1 is a serverless SQL database that runs on Cloudflare''s global network. Here are some key benefits:

**Performance**: D1 runs at the edge, close to your users, providing low-latency database access worldwide.

**Scalability**: Automatically scales to handle your workload without managing servers.

**Cost-effective**: Pay only for what you use with transparent pricing.

**Developer-friendly**: Use familiar SQL syntax with modern tooling support.

**Integration**: Seamlessly integrates with Cloudflare Workers and Pages.

This blog demonstrates a real-world application using D1 for data persistence in a Next.js application.',
 'Learn about Cloudflare D1 and why it''s perfect for modern web applications.',
 'Tech Writer', 1),

(3, 'Draft Post Example',
 'This is an example of a draft post. Draft posts are not visible to regular visitors but can be seen in the admin interface.

You can use drafts to:
- Work on posts before publishing
- Save incomplete content
- Review content with others
- Schedule future publications

When you''re ready, simply update the published status to make it live!',
 'An example draft post showing how unpublished content works.',
 'Content Editor', 0);