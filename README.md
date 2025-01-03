
### Project overview

### Prerequisites

Make sure you have the following installed:

1. [Docker](https://docs.docker.com/get-docker/)
2. [Docker Compose](https://docs.docker.com/compose/install/)

---

### Running the Application Locally

Follow these steps to run the application locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AndresPastrana/pokenow.git
   cd pokenow
   ```

2. **(Optional) Ensure Dependencies Are Up to Date**:
    If you're developing outside Docker, install dependencies with:

    ```bash
    pnpm install
    ```

3. **Run with Docker Compose**:
   Build and start the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. **Access the Application**:
   Once the application is running, open your browser and navigate to:

   ```
   http://localhost:3000
   ```

---

### File Structure

Below is a brief overview of the file structure:

```plaintext
├── .dockerignore   # Files to exclude from the Docker build
├── Dockerfile      # Docker configuration for the app
├── docker-compose.yml # Docker Compose configuration
├── package.json    # Project dependencies
├── pnpm-lock.yaml  # Lock file for dependencies
├── public/         # Static files (e.g., images, fonts)
├── pages/          # Next.js pages
├── components/     # Reusable React components
├── .env.example    # Example environment variables
└── README.md       # Project documentation
```

---

### Environment Variables

You can configure environment variables by creating a `.env` file in the root directory. Use `.env.template` as a reference.

```plaintext
NEXT_PUBLIC_API_URL=http://api.example.com
```

---

### Useful Commands

- **Start Development Server**:

  ```bash
  pnpm run dev
  ```

- **Build for Production**:

  ```bash
  pnpm run build
  ```

- **Start Production Server**:

  ```bash
  pnpm start
  ```

---

### Troubleshooting

- **Issue**: Container fails to start.
  - **Fix**: Ensure Docker is running and the `.dockerignore` file excludes `node_modules`.

- **Issue**: Port conflicts.
  - **Fix**: Update the exposed port in `docker-compose.yml` or shut down other applications using the same port.

---

### Contributions

Contributions, issues, and feature requests are welcome! Feel free to open an issue or a pull request.

---

### License

This project is licensed under the [MIT License](LICENSE).

---

### Author

Created by [Andres Pastrana](https://your-website.com).
