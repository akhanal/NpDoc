# NpDoc

NpDoc is a mobile application that facilitates interaction between patients and their doctors. The app uses APIs provided by a backend service, which is hosted separately.

## Features

- User authentication (login)
- Display list of doctors
- View detailed doctor profiles
- Chat or call a doctor

## Code Organization
```plaintext
NpDoc/
├── app/
│   ├── _layout.js           # Defines the app layout and routes
│   ├── index.js             # Landing page for login
│   ├── home.js              # Home page displaying list of doctors
│   ├── doctor-details.js    # Doctor details page
│   └── components/
│       └── DoctorList.js    # Component to list doctors
├── context/
│   └── GlobalContext.js     # Global context to manage user state
├── utils/
│   └── storage.js           # Utility functions for local storage
├── styles/
│   └── styles.js            # Contains styles for colors, typography, layout, buttons, lists, and forms
├── babel.config.js          # Babel configuration file
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

### Main Components

1. **Layout and Routing**
    - **File:** `app/_layout.js`
    - **Description:** Defines the layout and routes using `expo-router`. The main entry point is set to `expo-router/entry` in `package.json`.

2. **Landing Page**
    - **File:** `app/index.js`
    - **Description:** Provides the login screen and navigates to the home page if the user is already logged in.

3. **Home Page**
    - **File:** `app/home.js`
    - **Description:** Displays a list of doctors. Clicking on a doctor navigates to the doctor details page.

4. **Doctor Details Page**
    - **File:** `app/doctor-details.js`
    - **Description:** Shows detailed information about a doctor and provides options to chat or call the doctor.

### Context and Utilities

1. **Global Context**
    - **File:** `context/GlobalContext.js`
    - **Description:** Manages the logged-in user's state.

2. **Local Storage**
    - **File:** `utils/storage.js`
    - **Description:** Provides methods to store and retrieve values locally, used for persisting the logged-in user.

### Styles

1. **Styles**
    - **File:** `styles/styles.js`
    - **Description:** Contains style definitions for colors, typography, layout, buttons, lists, and forms.

## Project Setup

To set up and run the project locally:

1. Clone the repository:
    ```sh
    git clone https://github.com/akhanal/NpDoc.git
    cd NpDoc
    ```

2. Install dependencies:
    ```sh
    npx expo install
    ```

3. Start the development server:
    ```sh
    npx expo start
    ```

## Acknowledgements

Special thanks to ChatGPT and Claude Chat for their support and assistance in developing this project.

## License

[MIT License](LICENSE)
