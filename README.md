# NpDoc

NpDoc is a mobile application that facilitates interaction between patients and their doctors. The app uses APIs provided by a backend service, which is hosted separately.

## Features

- User authentication (login)
- Display list of doctors
- View detailed doctor profiles
- Chat or call a doctor

## Code Organization
```plaintext
├── NpDoc/
│   ├── app.json
│   ├── README.md
│   ├── babel.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── context/
│   │   ├── GlobalContext.js
│   ├── app/
│   │   ├── index.js
│   │   ├── home.js
│   │   ├── doctor-details.js
│   │   ├── doctor-home.js (New)
│   │   ├── _layout.js
│   ├── config/
│   │   ├── config.js
│   ├── utils/
│   │   ├── getWebRTC.js
│   │   ├── storage.js
│   ├── styles/
│   │   ├── styles.js
│   ├── components/
│   │   ├── VideoCall.js
│   │   ├── DoctorVideoCall.js (New)
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

### About WebRTC
```plaintext
Client1         Signaling Server        Client2
   |                   |                   |
   |---Offer (SDP)---->|                   |
   |                   |---Offer (SDP)---->|
   |                   |                   |
   |                   |<--Answer (SDP)----|
   |<--Answer (SDP)----|                   |
   |                   |                   |
   |---ICE Candidate-->|                   |
   |                   |---ICE Candidate-->|
   |                   |                   |
   |<--ICE Candidate---|                   |
   |                   |<--ICE Candidate---|
   |                   |                   |
   |<-- Direct Peer-to-Peer Connection --->|
   |                   |                   |
```
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
