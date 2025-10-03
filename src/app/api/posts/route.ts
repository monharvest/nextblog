import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export const runtime = 'edge';

// GET /api/posts - Get all published posts
export async function GET(request: NextRequest) {
  try {
    // In development, return mock data since D1 isn't available
    if (process.env.NODE_ENV === 'development') {
      const mockPosts = [
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
          content: '![Database Schema](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop)\n\nCloudflare D1 is a serverless SQL database that runs on Cloudflare\'s global network. In this tutorial, we\'ll explore how to set up and use D1 for your next project.\n\n## What is Cloudflare D1?\n\nD1 is built on SQLite, one of the most widely deployed database engines in the world...',
          excerpt: 'A comprehensive guide to getting started with Cloudflare D1, the serverless SQL database that runs at the edge.',
          author: 'Michael Rodriguez',
          published: true,
          created_at: '2025-03-08T09:45:00Z',
          updated_at: '2025-03-08T09:45:00Z'
        }
      ];
      return NextResponse.json({ posts: mockPosts });
    }

    const env = process.env as any as CloudflareEnv;
    if (!env.DB) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      );
    }

    const db = getDatabase(env);
    
    // Initialize tables if they don't exist
    await db.initializeTables();
    
    const posts = await db.getPublishedPosts();
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    // In development, return mock response
    if (process.env.NODE_ENV === 'development') {
      const body = await request.json() as {
        title: string;
        content: string;
        excerpt: string;
        author: string;
        published?: boolean;
      };
      
      const mockPost = {
        id: Math.floor(Math.random() * 1000),
        ...body,
        published: body.published || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return NextResponse.json({ post: mockPost }, { status: 201 });
    }

    const env = process.env as any as CloudflareEnv;
    if (!env.DB) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      );
    }

    const db = getDatabase(env);
    
    const body = await request.json() as {
      title: string;
      content: string;
      excerpt: string;
      author: string;
      published?: boolean;
    };
    const { title, content, excerpt, author, published } = body;
    
    if (!title || !content || !excerpt || !author) {
      return NextResponse.json(
        { error: 'Title, content, excerpt, and author are required' },
        { status: 400 }
      );
    }
    
    const post = await db.createPost({
      title,
      content,
      excerpt,
      author,
      published: published || false
    });
    
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}