
# JK Tech Blog Frontend Assignment


This repository contains the frontend application for the JK Tech Blog platform. It is a responsive and modern React app that supports authentication via Google and Facebook, displays a dashboard of user-created blog posts, and allows for creation and detailed viewing of posts.

The app supports Google and Facebook OAuth login, shows a dashboard of blog posts, allows post creation, and provides detailed views. Styled using Material UI and tested with Cypress and Jest, the application also supports containerized deployment using Docker.

Built using React with Typescript, Material-UI for styling, Cypress for integration testing, and Docker for deployment.

## Features

- Login via Google, Facebook (OAuth + JWT)

- Create, view, and explore blog posts

- Responsive, clean UI with Material-UI

- Cypress and Jest based testing

- Docker support for containerization

- Auth-protected routes for dashboard, post creation, and post details


##  Tech Stack

- React – Frontend JavaScript library

- TypeScript – Type-safe development
- React Router v6 – Client-side routing
- Material-UI – UI components
- Axios – API requests
- Cypress – Integration testing
- Jest - Unit testing
- Docker –Containerized frontend deployment


## Clone Repo
```bash
git clone https://github.com/prakhartiwari24/jktech-blog-frontend.git
cd jktech-blog-frontend
```

## Installing Dependencies
```bash
npm install
```

## Configure Environment
**Sets the base URL for backend API requests.**
```bash
# Create .env in root
REACT_APP_API_URL=http://localhost:5002
```


# Running App
```bash
# Development mode
npm start

# Build for production
npm run build
```

## Page Routes
- `/login` - Login with Google, Facebook, or credentials
- `/dashboard` - View list of created posts
- `/create` - 	Create a new blog post
- `/post/:id` - View a post in detail

## API Integration
The frontend interacts with the backend via RESTful endpoints:
- **Authentication**: 
  - Redirects to /auth/google or /auth/facebook
  - Stores JWT from /auth/google/callback or /auth/facebook/callback in local storage.
- **Posts**
  - `POST /posts`: Create a post (JWT required).
  - `GET /posts`: Fetch user posts (JWT required).
  - `GET /posts/:id`: Fetch a public post.

### Example API Call
```bash
import {axios} from "axios";

 axios.post(`${API_URL}/posts`,
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(() => navigate("/dashboard"))
      .catch((err) => console.error("Failed to create post", err));
```


## Testing
### Unit & Integration Testing (Cypress And Jest)
```bash
# Cypress (integration tests)
npx cypress open

# Jest (unit tests)
npm run test
```
## Docker Setup
```bash
docker build -t jktech-blog-frontend .

```

## Run Container
```bash
docker run -p 3000:3000 --env-file .env jktech-blog-frontend

```

## Author

Prakhar Tiwari
[email](mailto:prakhartiwari20@gmail.com)
