# shopping-assistant-web-admin

A web administration panel for managing users and roles, built with Angular, featuring user authentication, pagination, and user editing capabilities.

## Table of Contents

- [Features](#features)  
- [Stack](#stack)  
- [Installation](#installation)  
  - [Prerequisites](#prerequisites)  
  - [Setup Instructions](#setup-instructions)  
- [Configuration](#configuration)  

## Features

- User login with email or phone and password authentication  
- JWT token-based authentication with route guarding  
- User listing with paginated views  
- Edit user details including phone, email, and roles  
- Add and remove roles for users  
- Responsive layout with header and footer components  
- API integration via GraphQL and REST for backend communication  

## Stack

- Angular 16  
- TypeScript  
- Bootstrap 5  

## Installation

### Prerequisites

- Node.js (version 18 recommended)  
- npm (comes with Node.js)  
- Angular CLI (`npm install -g @angular/cli@16.0.0`)  

### Setup Instructions

1. Clone the repository:  
```sh
git clone https://github.com/Shchoholiev/shopping-assistant-web-admin.git
cd shopping-assistant-web-admin
```

2. Install project dependencies:  
```sh
npm install
```

3. Run the development server:  
```sh
npm start
```

4. Access the app at:  
```
http://localhost:4200/
```

5. Run unit tests with Karma:  
```sh
npm test
```

## Configuration

Environment configuration files are located in `src/environments/`. The base API URL should be set according to your deployment:

- `environment.ts` & `environment.development.ts` (for development):  
```ts
export const environment = {
  production: false,
  apiUrl: 'https://shopping-assistant-api-dev.azurewebsites.net'
};
```

- `environment.production.ts` (for production):  
```ts
export const environment = {
  production: true,
  apiUrl: 'https://shopping-assistant-api.azurewebsites.net'
};
```

The application uses local storage to store JWT access and refresh tokens under keys `accessToken` and `refreshToken`. Make sure your backend supports the authentication GraphQL schema as expected.

Additional configuration for IIS hosting can be set in the `src/web.config` file, which rewrites routes for Angular's client-side routing and configures caching rules for JavaScript files.
