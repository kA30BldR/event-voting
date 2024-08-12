# System Overview

## Built Version
- **Node:** 22.5.1
- **Yarn:** 1.22.22

# Environment Configuration
To set up your environment variables for the application, follow these steps:

1. **Find the `.example.env` File**
   Locate the `.example.env` file in each repository. This file contains sample environment variables that you need to configure for your environment.

2. **Create a `.env` File**
   In the same directory where the `.example.env` file is located, create a new file named `.env`. This file will store your actual environment variables.

3. **Copy the Contents**
   Copy the contents from the `.example.env` file into the newly created `.env` file. This provides a starting point with all the necessary environment variable keys.

4. **Update the `.env` File**
   Modify the values in the `.env` file according to your environment. Ensure you set the values specific to your local development or production environment.
   For example, update database URLs, API keys, and other configuration settings according to your setup.

5. **Apply Changes**
   Save the `.env` file. Your application will now use the values defined in this file.

**Note:** These steps are applicable for all repositories within the project. Ensure you repeat these steps for each repository where the `.example.env` file is present.

## Backend System
- **Built using:** Node.js
- **Repositories:** Four TypeScript repositories
- **Architecture:** Microservice pattern
- **CQRS:** Implements CQRS for separating write and read commands
- **API Gateway:** Serves as the entry point and validates requests
- **User Service:** Handles authentication and authorization
- **Event Command and Query Service:** Manages user requests related to events

## Frontend
- **Built with:** React and TypeScript
- **Components:** Material Design components
- **Authentication:** JWT-authenticated registration and login pages
- **Architecture:** TSX-based micro-component architecture

## Future Implementations
- Implement refresh token functionality for session management
- Manage API documentation with Swagger for microservices
- Develop global error handling, particularly for CQRS
- Restrict API access to be exclusively through the gateway
- Implement extensive validations
- Create a shared code base for common code (e.g., schema, interfaces)
