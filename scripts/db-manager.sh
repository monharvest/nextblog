#!/bin/bash

# Database management script for the Next.js blog

echo "🗃️  Blog Database Management"
echo "=========================="

# Check if wrangler is available
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Please install it first:"
    echo "   npm install -g wrangler"
    exit 1
fi

case "$1" in
    "init")
        echo "📋 Initializing database schema..."
        wrangler d1 execute blog-db --file=./database/schema.sql
        echo "✅ Local database initialized!"
        echo ""
        echo "🌐 Initializing remote database..."
        wrangler d1 execute blog-db --remote --file=./database/schema.sql
        echo "✅ Remote database initialized!"
        ;;
    "query")
        if [ -z "$2" ]; then
            echo "📊 Showing all posts:"
            wrangler d1 execute blog-db --command="SELECT id, title, author, published, created_at FROM posts ORDER BY created_at DESC"
        else
            echo "🔍 Executing query: $2"
            wrangler d1 execute blog-db --command="$2"
        fi
        ;;
    "remote")
        if [ -z "$2" ]; then
            echo "📊 Showing all posts (remote):"
            wrangler d1 execute blog-db --remote --command="SELECT id, title, author, published, created_at FROM posts ORDER BY created_at DESC"
        else
            echo "🔍 Executing remote query: $2"
            wrangler d1 execute blog-db --remote --command="$2"
        fi
        ;;
    "count")
        echo "📈 Database statistics:"
        wrangler d1 execute blog-db --command="SELECT COUNT(*) as total_posts FROM posts"
        wrangler d1 execute blog-db --command="SELECT COUNT(*) as published_posts FROM posts WHERE published = 1"
        wrangler d1 execute blog-db --command="SELECT COUNT(*) as draft_posts FROM posts WHERE published = 0"
        ;;
    "clean")
        echo "🧹 Cleaning database (removing all posts)..."
        read -p "Are you sure? This cannot be undone. (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            wrangler d1 execute blog-db --command="DELETE FROM posts"
            echo "✅ Database cleaned!"
        else
            echo "❌ Operation cancelled."
        fi
        ;;
    *)
        echo "Usage: $0 {init|query|remote|count|clean}"
        echo ""
        echo "Commands:"
        echo "  init              Initialize database with schema and sample data"
        echo "  query [SQL]       Execute query on local database"
        echo "  remote [SQL]      Execute query on remote database" 
        echo "  count             Show database statistics"
        echo "  clean             Remove all posts (destructive!)"
        echo ""
        echo "Examples:"
        echo "  $0 init"
        echo "  $0 query"
        echo "  $0 query \"SELECT * FROM posts WHERE published = 1\""
        echo "  $0 remote"
        echo "  $0 count"
        exit 1
        ;;
esac