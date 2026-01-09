#!/bin/bash

npx swagger-typescript-api generate --path http://localhost:5280/swagger/v1/swagger.json --output ./src/generated --name BackendName --api-class-name="Client"