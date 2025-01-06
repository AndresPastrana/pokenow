## Project Overview

This web application allows users to interact with Pokémon data through the **PokéAPI**. Users can search for Pokémon by name, filter Pokémon based on various attributes, and view the data in paginated results for an optimized experience. The app is built using **Next.js** for the React framework and **Docker** for containerization, ensuring smooth setup and deployment both locally and in production environments.

---

## Key Features

1. **Pokémon Search and Filter**:
   - Users can search for Pokémon by name and filter the results based on attributes like type and abilities.
   - The search and filter are applied only to the **current page’s results**, ensuring faster performance and a smoother user experience by not querying the entire dataset of the **PokéAPI**.
   - This allows users to quickly find and narrow down the list of Pokémon displayed on the current page, enhancing the browsing experience.

2. **Paginated Pokémon Data**:
   - Display Pokémon data in **paginated results**, improving performance by loading a limited number of items per page.
   - Allows users to navigate through different pages of Pokémon data seamlessly.

3. **Favorites List with Local Storage Persistence**:
   - Save favorite Pokémon to a personalized list with **local storage persistence**.
   - Ensures favorites are retained even after page refreshes.

4. **Custom Hooks and Component Patterns**:
   - Use **custom hooks** to manage state and side effects efficiently, improving code reusability and readability.
   - Implement **component patterns** to optimize code structure and ensure maintainability, especially as the app scales.

5. **Containerization with Docker**:
   - The app is containerized using **Docker** for easy setup and deployment.
   - Can be run in any Docker-supported environment, ensuring portability and consistency across development and production setups.

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
   docker-compose up -d
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
├── app/          # Next.js pages
├── components/     # Reusable React components
├── .template.env    # Example environment variables
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

## Future Enhancements

- **Dark Mode Implementation**:
  - Add a dark mode option for a more user-friendly and customizable experience, adjusting the app’s theme based on user preferences.

- **Pagination Controls Improvement**:
  - Enhance the pagination controls with additional features like jump-to-page, infinite scrolling, or dynamic page size adjustments.

- **User Authentication**:
  - Implement user authentication to allow users to log in and sync their favorite Pokémon across devices.

- **Offline Support**:
  - Add offline capabilities with service workers, so users can continue browsing and interacting with Pokémon data when they have no internet connection.

- **API Rate Limiting Handling**:
  - Implement a more robust handling for API rate limits to ensure smooth user experience when interacting with the PokéAPI.

- **Internationalization (i18n)**:
  - Add support for multiple languages to reach a broader audience.

- **Enhanced Search and Filter**:
  - Expand the search and filtering functionality to include more advanced filters (e.g., by Pokémon stats, abilities, or region) and allow multiple filter criteria.

---

### Contributions

Contributions, issues, and feature requests are welcome! Feel free to open an issue or a pull request.

---

### License

This project is licensed under the [MIT License](LICENSE).

---

### Author

Created by [Andres Pastrana]
