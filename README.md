TODO LIST API

Description:
	A REST API for a todo list with pagination and MongoDB as database.

Features:
	GET($BASE_URL/api/todos/:page/:limit)
	POST($BASE_URL/api/todos)
	**body: {"toDo": String}
	PUT($BASE_URL/api/todos)
	**body: {"id": Int, "toDo": String}
	DELETE($BASE_URL/api/todos)
	**body: {"id": Int}

Installation:
	Clone the repository: git clone https://github.com/laudenilasin/todo-list.git
	Change into the project directory: cd todo-list
	Install dependencies: npm install
	Turn on docker compose (for MongoDB database): docker-compose up

Configuration:
	Refer to .env.local for environment variables list.

To Start Server:
	Start the server: npm start, node app.js, etc.
	Access the API endpoints:
		Example: GET /api/todos/:page/:limit - Get a list of todos with pagination
		Example: POST /api/todos - Create a todo item

To Run Tests:
	Run tests: npm test
		*JEST and supertest used.
