## Secret Santa Backend

This repository contains the backend server for a Secret Santa pairing generator, providing the necessary API endpoints for the frontend application. It utilizes Express.js as the web framework and MongoDB as the database. 

This backend server is designed to work with the [Secret-Santa frontend application](https://github.com/erriza/Secret-Santa). You can run both the frontend and backend together or run the backend alone with the frontend static files served via `app.use(express.static('dist'));`.

**To run both frontend and backend together:**

1. Follow the instructions in both repositories to install dependencies and set up environment variables.
2. Start the frontend development server using `npm start` in the `Secret-Santa` directory.
3. Start the backend server using `npm start` in the `Secret-Santa-Backend` directory.


**To run the backend alone with the frontend static files:**

1. Follow the instructions below for this repository, so you can install dependencies and set up environment variables.
2. Start the backend server using `npm start` in the `Secret-Santa-Backend` directory.
3. Open your browser and visit `http://localhost:3001/`

**NOTE:**  If you want to modify the frontend code while running the backend, you need to create a new build of the frontend application and copy the updated `dist` folder to the backend directory. 


### Requirements

- Node.js and npm
- MongoDB installed and running locally or on a remote server.

### Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/erriza/Secret-Santa-Backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Secret-Santa-Backend
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```
   MONGO_URI=mongodb://localhost:27017/secret-santa
   PORT=3000
   ```

   - Replace `mongodb://localhost:27017/secret-santa` with your MongoDB connection string.
   - Change the `PORT` value if you want to use a different port.

5. Start the server:
   ```bash
   npm start
   ```

### Database Structure

The server uses MongoDB to store family data and pairing history. 

- **Families:**
    - `_id` (ObjectId): Unique identifier for the family.
    - `name` (String): Name of the family.
    - `members` (Array of Objects): Array of members belonging to this family. Each member object contains:
        - `_id` (ObjectId): Unique identifier for the member.
        - `name` (String): Name of the member.
        - `familyId` (Number): The family ID of the member. 

### API Endpoints

The server exposes the following API endpoints:

### API Endpoints

#### **`/api/families`**

- **GET:** Retrieves all families from the database.
- **POST:** Creates a new family or adds a member to an existing family. 
    - Requires a body with `familyName` and `memberName` fields.
    - If a family with `familyName` exists, it adds the `memberName` to the family.
    - If a family with `familyName` doesn't exist, it creates a new family with the `familyName` and adds the `memberName` as the first member.

#### **`/api/families/:familyId/members/:memberId`**

- **DELETE:** Removes a member from a family. 
    - `familyId` and `memberId` are both required.
    - If the family is empty after removing the member, the family itself is deleted.

#### **`/api/families/:familyId`**

- **DELETE:** Deletes an entire family.
    - `familyId` is required.

### Contribution

Feel free to contribute to the project by reporting issues, submitting pull requests, or suggesting new features.

### Acknowledgements

- Express.js for building the REST API.
- MongoDB for data storage.

### Update ESLint Configuration

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked` 
