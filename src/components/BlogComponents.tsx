'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/database';

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No posts found. Be the first to create one!
        </div>
      ) : (
        posts.map((post) => (
          <article 
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {post.title}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              By {post.author} • {new Date(post.created_at).toLocaleDateString()}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {post.excerpt}
            </p>
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 rounded-full text-xs ${
                post.published 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
              }`}>
                {post.published ? 'Published' : 'Draft'}
              </span>
              <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                Read more →
              </button>
            </div>
          </article>
        ))
      )}
    </div>
  );
}

export function CreatePostForm({ onPostCreated }: { onPostCreated?: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    published: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Post created successfully!');
        setFormData({
          title: '',
          content: '',
          excerpt: '',
          author: '',
          published: false
        });
        // Call the callback to refresh posts
        if (onPostCreated) {
          onPostCreated();
        }
      } else {
        const errorData = await response.json() as { error: string };
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create New Post</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Publish immediately
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>

        {message && (
          <div className={`p-3 rounded-md ${
            message.includes('Error') || message.includes('Failed')
              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
              : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
          }`}>
            {message}
          </div>
        )}
      </div>
    </form>
  );
}

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json() as { posts: BlogPost[] };
        setResults(data.posts);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      
      {isSearching && (
        <div className="absolute right-3 top-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        </div>
      )}

      {showResults && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-3 text-gray-500 dark:text-gray-400">No results found</div>
          ) : (
            results.map((post) => (
              <div
                key={post.id}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0"
              >
                <div className="font-medium text-gray-900 dark:text-white">{post.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">By {post.author}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}