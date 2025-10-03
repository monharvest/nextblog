# Next.js Blog with Cloudflare D1

A full-stack blog application built with Next.js and powered by Cloudflare D1 database. This project demonstrates how to build a modern, serverless blog with edge computing capabilities.

## Features

- 📝 Create, read, update, and delete blog posts
- 🔍 Real-time search functionality
- 📱 Responsive design with Tailwind CSS
- ⚡ Edge runtime for optimal performance
- 🗃️ Cloudflare D1 database integration
- 🚀 Serverless deployment on Cloudflare Pages
- 📊 Blog statistics and analytics
- 🌙 Dark mode support

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes with Edge Runtime
- **Database**: Cloudflare D1 (SQLite-compatible)
- **Deployment**: Cloudflare Pages with OpenNext
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Cloudflare account
- Wrangler CLI

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up your D1 database**
   ```bash
   # Create a new D1 database (if you haven't already)
   wrangler d1 create blog-db
   
   # Initialize the database schema
   wrangler d1 execute blog-db --file=./database/schema.sql
   ```

3. **Update your database binding**
   
   Your `wrangler.jsonc` is already configured with your database:
   ```json
   "d1_databases": [
     {
       "binding": "DB",
       "database_name": "blog-db", 
       "database_id": "fed461dc-20ec-4aa9-a911-a4d88b3fa6e9"
     }
   ]
   ```

4. **Generate types**
   ```bash
   npm run cf-typegen
   ```

### Development

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

Note: In development mode, the database operations will be simulated since D1 is not available locally. For full functionality, deploy to Cloudflare Pages.

### Database Operations

**Initialize database with sample data:**
```bash
wrangler d1 execute blog-db --file=./database/schema.sql
```

**Query your database:**
```bash
wrangler d1 execute blog-db --command="SELECT * FROM posts"
```

**Add the database locally for development:**
```bash
wrangler d1 execute blog-db --local --file=./database/schema.sql
```

## Deployment

### Deploy to Cloudflare Pages

1. **Build and deploy**
   ```bash
   npm run deploy
   ```

2. **Or build and preview locally**
   ```bash
   npm run preview
   ```

### Manual Deployment Steps

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy with OpenNext:
   ```bash
   npx opennextjs-cloudflare build
   npx opennextjs-cloudflare deploy
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all published posts |
| POST | `/api/posts` | Create a new post |
| GET | `/api/posts/[id]` | Get a specific post |
| PUT | `/api/posts/[id]` | Update a specific post |
| DELETE | `/api/posts/[id]` | Delete a specific post |
| GET | `/api/search?q=query` | Search posts |

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Homepage
│   ├── components/       # React components
│   └── lib/              # Utility functions
├── database/
│   └── schema.sql        # Database schema
├── wrangler.jsonc        # Cloudflare configuration
└── package.json
```

## Environment Variables

The application uses Cloudflare's environment bindings rather than traditional environment variables:

- `DB`: D1 database binding (configured in wrangler.jsonc)
- `ASSETS`: Static assets binding

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run cf-typegen` | Generate Cloudflare types |
| `npm run deploy` | Deploy to Cloudflare |
| `npm run preview` | Preview build locally |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [OpenNext Documentation](https://opennext.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is open source and available under the [MIT License](LICENSE).
