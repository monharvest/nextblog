-- Sample blog posts with free images for testing
-- Run this with: wrangler d1 execute blog-db --file=./database/sample-posts.sql

-- Clear existing sample data first (optional)
DELETE FROM posts WHERE id IN (1, 2, 3);

-- Insert new sample posts with images
INSERT INTO posts (id, title, content, excerpt, author, published, created_at) VALUES 

(1, 'The Future of Web Development in 2025', 
'![Web Development](https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop)

The landscape of web development continues to evolve at breakneck speed. As we navigate through 2025, several key trends are reshaping how we build and deploy applications.

## Edge Computing Revolution

Edge computing has moved from a nice-to-have to an essential architecture pattern. With platforms like Cloudflare Workers and Vercel Edge Functions, we can now run server-side logic closer to users than ever before.

**Key Benefits:**
- Reduced latency for global users
- Better performance for dynamic content
- Cost-effective scaling
- Improved user experience

## The Rise of Serverless Databases

Traditional databases are being challenged by serverless alternatives like:
- **Cloudflare D1**: SQLite at the edge
- **PlanetScale**: MySQL with branching
- **Supabase**: PostgreSQL with real-time features
- **FaunaDB**: Globally distributed ACID transactions

These databases offer automatic scaling, zero maintenance, and pay-per-use pricing models that make them perfect for modern applications.

## AI-Powered Development Tools

2025 has seen an explosion of AI tools that assist developers:
- Code completion and generation
- Automated testing and debugging
- Performance optimization suggestions
- Documentation generation

The future of web development is bright, efficient, and more accessible than ever before!',

'Exploring the latest trends in web development for 2025, including edge computing, serverless databases, and AI-powered development tools.',
'Alex Chen', 1, '2025-01-15 10:30:00'),

(2, 'Building Responsive UIs with Modern CSS', 
'![CSS Grid Layout](https://images.unsplash.com/photo-1545665277-5937750b7c98?w=800&h=400&fit=crop)

Modern CSS has evolved tremendously, giving developers powerful tools to create responsive, beautiful user interfaces without relying heavily on frameworks.

## CSS Grid: The Layout Revolution

CSS Grid has revolutionized how we approach layout design. Unlike Flexbox, which is one-dimensional, Grid allows us to work in two dimensions simultaneously.

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}
```

## Container Queries: True Component-Based Styling

Container queries allow components to respond to their container size rather than the viewport:

```css
@container (min-width: 400px) {
  .card {
    display: flex;
    align-items: center;
  }
}
```

## CSS Custom Properties (Variables)

Dynamic theming and responsive design become much easier with CSS custom properties:

```css
:root {
  --primary-color: #3b82f6;
  --spacing-unit: 1rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #60a5fa;
  }
}
```

## New CSS Functions

Modern CSS includes powerful functions like:
- `clamp()` for responsive typography
- `min()` and `max()` for flexible sizing
- `calc()` for complex calculations

The web platform continues to evolve, giving us native solutions for problems we once needed JavaScript libraries to solve.',

'Learn how modern CSS features like Grid, Container Queries, and Custom Properties are revolutionizing responsive web design.',
'Sarah Johnson', 1, '2025-02-22 14:15:00'),

(3, 'Getting Started with Cloudflare D1 Database', 
'![Database Schema](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop)

Cloudflare D1 is a serverless SQL database that runs on Cloudflare''s global network. In this tutorial, we''ll explore how to set up and use D1 for your next project.

## What is Cloudflare D1?

D1 is built on SQLite, one of the most widely deployed database engines in the world. But unlike traditional SQLite, D1 runs at the edge, providing:

- **Global Distribution**: Your database runs close to your users
- **Automatic Scaling**: No need to manage servers or capacity
- **ACID Transactions**: Full SQL compliance with transactional integrity
- **Cost Effective**: Pay only for what you use

## Setting Up Your First D1 Database

Getting started with D1 is straightforward:

```bash
# Create a new database
wrangler d1 create my-database

# Create your schema
wrangler d1 execute my-database --file=schema.sql

# Query your database
wrangler d1 execute my-database --command="SELECT * FROM users"
```

## Best Practices for D1

### 1. Design for Edge Performance
Keep queries simple and avoid complex joins when possible.

### 2. Use Prepared Statements
Always use parameter binding to prevent SQL injection:

```javascript
const result = await env.DB
  .prepare("SELECT * FROM users WHERE id = ?")
  .bind(userId)
  .first();
```

### 3. Handle Consistency
D1 provides eventual consistency. Design your application to handle this gracefully.

### 4. Monitor Usage
Use Cloudflare Analytics to monitor your database performance and costs.

D1 represents the future of serverless databases, bringing the power of SQL to the edge with unprecedented performance and simplicity.',

'A comprehensive guide to getting started with Cloudflare D1, the serverless SQL database that runs at the edge.',
'Michael Rodriguez', 1, '2025-03-08 09:45:00'),

(4, 'The Art of API Design: Best Practices for 2025', 
'![API Design](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop)

Well-designed APIs are the backbone of modern applications. As we build more connected systems, following API design best practices becomes crucial for maintainability and developer experience.

## RESTful Principles Still Matter

While GraphQL and other approaches have gained popularity, RESTful APIs remain the gold standard for many applications:

### Resource-Based URLs
```
GET /api/posts          # Get all posts
GET /api/posts/123      # Get specific post
POST /api/posts         # Create new post
PUT /api/posts/123      # Update specific post
DELETE /api/posts/123   # Delete specific post
```

### Use HTTP Status Codes Correctly
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Modern API Features

### 1. Comprehensive Error Handling
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### 2. Pagination and Filtering
```
GET /api/posts?page=1&limit=10&status=published&sort=created_at:desc
```

### 3. API Versioning
Use URL versioning for major changes:
```
/api/v1/posts
/api/v2/posts
```

### 4. Rate Limiting
Implement rate limiting to prevent abuse:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1609459200
```

## Security Best Practices

- Always use HTTPS in production
- Implement proper authentication (JWT, OAuth)
- Validate all input data
- Use CORS headers appropriately
- Implement request logging and monitoring

## Documentation and Testing

Great APIs are:
- **Well documented** (OpenAPI/Swagger)
- **Thoroughly tested** (unit, integration, end-to-end)
- **Monitored** (performance, errors, usage)
- **Versioned** (semantic versioning)

Remember: A well-designed API is a joy to use and maintain. Invest time in getting it right from the start!',

'Essential best practices for designing robust, maintainable APIs in 2025, covering REST principles, error handling, security, and documentation.',
'Emily Watson', 0, '2025-03-20 16:20:00');