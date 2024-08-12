# Express API Gateway

This Express application serves as a bridge for all incoming requests, directing them to various services in the system.

## Overview

- **API Gateway**: Routes all incoming requests to the appropriate service.
- **Communication**: Interfaces with the User Service Module, Command Module, and Query Module.
- **Direct Access**: Direct access to specific services is still allowed as service-specific token checks are not yet implemented.

## Services

1. **USER SERVICE**
   - Handles Authentication and Authorization.
   - Validates user credentials and manages user sessions.

2. **Command Module**
   - Processes write operations and commands.
   - Manages changes to data.

3. **Query Module**
   - Handles read operations and queries.
   - Retrieves data and provides it to clients.

## Features

- **Routing**: Routes requests to appropriate services.
- **Centralized Request Handling**: Manages and logs requests at a central point.
- **Flexible Configuration**: Supports direct access to services until service-specific token checks are implemented.
