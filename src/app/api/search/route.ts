import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export const runtime = 'edge';

// GET /api/search - Search posts by query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // In development, return mock search results
    if (process.env.NODE_ENV === 'development') {
      const mockResults = [
        {
          id: 1,
          title: 'Welcome to Your New Blog!',
          content: 'This is your first blog post! This Next.js application is powered by Cloudflare D1...',
          excerpt: 'Welcome to your new Next.js blog powered by Cloudflare D1! Learn about the features and how to get started.',
          author: 'Blog Admin',
          published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ].filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      
      return NextResponse.json({ posts: mockResults, query });
    }

    const env = process.env as any as CloudflareEnv;
    if (!env.DB) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      );
    }

    const db = getDatabase(env);
    
    const posts = await db.searchPosts(query);
    
    return NextResponse.json({ posts, query });
  } catch (error) {
    console.error('Error searching posts:', error);
    return NextResponse.json(
      { error: 'Failed to search posts' },
      { status: 500 }
    );
  }
}