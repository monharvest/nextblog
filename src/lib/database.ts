// Database utility functions for blog operations

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  published?: boolean;
}

export class DatabaseService {
  constructor(private db: D1Database) {}

  // Initialize database tables
  async initializeTables() {
    const createPostsTable = `
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        author TEXT NOT NULL,
        published BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await this.db.exec(createPostsTable);
  }

  // Get all published posts
  async getPublishedPosts(): Promise<BlogPost[]> {
    const { results } = await this.db
      .prepare('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC')
      .all<BlogPost>();
    return results || [];
  }

  // Get all posts (including drafts)
  async getAllPosts(): Promise<BlogPost[]> {
    const { results } = await this.db
      .prepare('SELECT * FROM posts ORDER BY created_at DESC')
      .all<BlogPost>();
    return results || [];
  }

  // Get post by ID
  async getPostById(id: number): Promise<BlogPost | null> {
    const result = await this.db
      .prepare('SELECT * FROM posts WHERE id = ?')
      .bind(id)
      .first<BlogPost>();
    return result || null;
  }

  // Create new post
  async createPost(postData: CreatePostData): Promise<BlogPost> {
    const { title, content, excerpt, author, published = false } = postData;
    
    const result = await this.db
      .prepare(`
        INSERT INTO posts (title, content, excerpt, author, published)
        VALUES (?, ?, ?, ?, ?)
        RETURNING *
      `)
      .bind(title, content, excerpt, author, published ? 1 : 0)
      .first<BlogPost>();

    if (!result) {
      throw new Error('Failed to create post');
    }
    
    return result;
  }

  // Update post
  async updatePost(id: number, postData: Partial<CreatePostData>): Promise<BlogPost> {
    const { title, content, excerpt, author, published } = postData;
    
    const result = await this.db
      .prepare(`
        UPDATE posts 
        SET title = COALESCE(?, title),
            content = COALESCE(?, content),
            excerpt = COALESCE(?, excerpt),
            author = COALESCE(?, author),
            published = COALESCE(?, published),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        RETURNING *
      `)
      .bind(
        title || null,
        content || null,
        excerpt || null,
        author || null,
        published !== undefined ? (published ? 1 : 0) : null,
        id
      )
      .first<BlogPost>();

    if (!result) {
      throw new Error('Post not found');
    }
    
    return result;
  }

  // Delete post
  async deletePost(id: number): Promise<boolean> {
    const result = await this.db
      .prepare('DELETE FROM posts WHERE id = ?')
      .bind(id)
      .run();
    
    return result.success && result.meta.changes > 0;
  }

  // Search posts
  async searchPosts(query: string): Promise<BlogPost[]> {
    const { results } = await this.db
      .prepare(`
        SELECT * FROM posts 
        WHERE published = 1 AND (
          title LIKE ? OR 
          content LIKE ? OR 
          excerpt LIKE ?
        )
        ORDER BY created_at DESC
      `)
      .bind(`%${query}%`, `%${query}%`, `%${query}%`)
      .all<BlogPost>();
    
    return results || [];
  }
}

// Helper function to get database instance from request context
export function getDatabase(env: CloudflareEnv): DatabaseService {
  return new DatabaseService(env.DB);
}