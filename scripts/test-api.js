#!/usr/bin/env node

/**
 * Test script for the blog API endpoints
 * Run with: node scripts/test-api.js
 */

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing Blog API Endpoints\n');

  try {
    // Test GET /api/posts
    console.log('1. Testing GET /api/posts');
    const postsResponse = await fetch(`${BASE_URL}/api/posts`);
    const postsData = await postsResponse.json();
    console.log(`   Status: ${postsResponse.status}`);
    console.log(`   Posts found: ${postsData.posts?.length || 0}`);

    // Test POST /api/posts
    console.log('\n2. Testing POST /api/posts');
    const newPost = {
      title: 'Test Post from API',
      content: 'This is a test post created via the API to verify functionality.',
      excerpt: 'A test post to verify API functionality.',
      author: 'API Tester',
      published: true
    };

    const createResponse = await fetch(`${BASE_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    if (createResponse.ok) {
      const createdPost = await createResponse.json();
      console.log(`   Status: ${createResponse.status}`);
      console.log(`   Created post ID: ${createdPost.post?.id}`);

      // Test GET /api/posts/[id]
      if (createdPost.post?.id) {
        console.log('\n3. Testing GET /api/posts/[id]');
        const postResponse = await fetch(`${BASE_URL}/api/posts/${createdPost.post.id}`);
        const postData = await postResponse.json();
        console.log(`   Status: ${postResponse.status}`);
        console.log(`   Post title: ${postData.post?.title}`);
      }
    } else {
      const error = await createResponse.json();
      console.log(`   Status: ${createResponse.status}`);
      console.log(`   Error: ${error.error}`);
    }

    // Test GET /api/search
    console.log('\n4. Testing GET /api/search');
    const searchResponse = await fetch(`${BASE_URL}/api/search?q=test`);
    const searchData = await searchResponse.json();
    console.log(`   Status: ${searchResponse.status}`);
    console.log(`   Search results: ${searchData.posts?.length || 0}`);

    console.log('\n✅ API testing completed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\nMake sure your development server is running: npm run dev');
  }
}

testAPI();