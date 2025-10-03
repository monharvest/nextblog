'use client';

import { useState, useEffect } from 'react';
import { BlogList, CreatePostForm, SearchBar } from '@/components/BlogComponents';
import { BlogPost } from '@/lib/database';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json() as { posts: BlogPost[] };
        setPosts(data.posts || []);
      } else {
        setError('Failed to fetch posts');
      }
    } catch (err) {
      setError('Failed to connect to API');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Next.js Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Powered by Cloudflare D1 Database
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <SearchBar />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Latest Posts
            </h2>
            {error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                Error: {error}
              </div>
            ) : (
              <BlogList posts={posts} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CreatePostForm onPostCreated={() => {
                setLoading(true);
                fetchPosts();
              }} />
              
              {/* Stats */}
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Blog Stats
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Total Posts:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{posts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Published:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {posts.filter(p => p.published).length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
                  Getting Started
                </h3>
                <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                  <p>• Create your first blog post using the form</p>
                  <p>• Search existing posts with the search bar</p>
                  <p>• Data is stored in Cloudflare D1 database</p>
                  <p>• Deploy with <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">npm run deploy</code></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>Built with Next.js, Tailwind CSS, and Cloudflare D1</p>
        </footer>
      </div>
    </div>
  );
}
