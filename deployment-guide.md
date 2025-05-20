# Deployment Instructions for Marketing Budget Calculator

## Setup Instructions

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Step 1: Initialize a new React application
```bash
npx create-react-app marketing-calculator-app
cd marketing-calculator-app
```

### Step 2: Install dependencies
```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3: Set up project structure
1. Create the components directory:
```bash
mkdir -p src/components
```

2. Copy the `MarketingCalculator.jsx` file into the `src/components` directory

3. Replace the following files with the versions provided in this export:
   - Replace `package.json` in the root directory
   - Replace `tailwind.config.js` in the root directory
   - Replace `src/index.js` 
   - Replace `src/index.css`
   - Replace `src/App.js`
   - Replace `public/index.html`

### Step 4: Build for production
```bash
npm run build
```
This will create a `build` directory with optimized production files.

### Step 5: Deploy to your server
Upload the contents of the `build` directory to your production server.

## Deployment Options

### Option 1: Static Hosting
You can deploy the built files to any static hosting service:
- Netlify
- Vercel
- Amazon S3
- GitHub Pages

Example with Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Option 2: Traditional Web Server
1. Copy the contents of the `build` directory to your web server's public directory
2. Configure your web server to serve `index.html` for all routes
   
For Apache, add to `.htaccess`:
```
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

For Nginx, add to your server configuration:
```
location / {
  try_files $uri $uri/ /index.html;
}
```

### Option 3: Docker Deployment
1. Create a `Dockerfile` in the project root:

```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Create an `nginx.conf` file:

```
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html =404;
    }
}
```

3. Build and run the Docker container:

```bash
docker build -t marketing-calculator .
docker run -p 80:80 marketing-calculator
```

## Troubleshooting

If you encounter any issues during deployment:

1. **CSS not loading**: Ensure Tailwind is properly set up
2. **Icons not appearing**: Verify lucide-react is installed
3. **Blank page**: Check the browser console for errors
4. **Routing issues**: Verify your server's configuration for handling client-side routing