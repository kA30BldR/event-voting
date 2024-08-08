# System Overview

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
- Utilize `.env` files for secure key storage
- Restrict API access to be exclusively through the gateway
- Implement extensive validations
- Create a shared code base for common code (e.g., schema, interfaces)
