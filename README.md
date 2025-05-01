# TaskVibe 🖥️

![GitHub stars](https://img.shields.io/github/stars/manishrajdoot/taskvibe?style=social) ![GitHub forks](https://img.shields.io/github/forks/manishrajdoot/taskvibe?style=social) ![License](https://img.shields.io/github/license/manishrajdoot/taskvibe)

TaskVibe is a unique to-do app designed to streamline task management with a modern, neumorphic interface. It offers light/dark theme switching, task scheduling with automatic deletion, sound effects, and offline support through Progressive Web App (PWA) functionality. Stay organized with TaskVibe’s intuitive features and visually appealing design.

## ✨ Features

- **Neumorphic Design**: Modern, soft UI with light and dark theme support for a pleasant user experience.
- **Task Management**: Add, complete, and delete tasks with optional comments, due dates, and times.
- **Automatic Task Deletion**: Tasks with due dates/times are automatically removed when the deadline is reached.
- **Filters**: View all, active, or completed tasks with easy filter buttons.
- **Theme Switching**: Toggle between light (☀️) and dark (🌙) modes with a plane-themed switch.
- **Local Storage**: Tasks persist across page reloads using browser local storage.
- **Sound Effects**: Subtle animations and feedback for task interactions.
- **Progressive Web App (PWA)**: Installable on devices with offline support.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- **Email Subscription**: Subscribe to updates via the footer form (powered by EmailJS).
- **FAQ Page**: Access a dedicated FAQ page for common questions.
- **Accessibility**: Includes ARIA labels and focus styles for better usability.

## 🌐 Live Demo

Try TaskVibe live at: [https://manishrajdoot.github.io/TaskVibe](https://manishrajdoot.github.io/TaskVibe)

*Note*: If the live demo link isn’t active, enable GitHub Pages in the repository settings (see "Enable GitHub Pages" under Installation).

## 📸 Screenshots

*Follow these steps to add screenshots:*

1. Take screenshots of TaskVibe in different modes (e.g., light theme, dark theme, mobile view).
2. Create a `screenshots/` folder in the repository:
   - On GitHub, go to your repository, click **Add file** > **Create new file**, name it `screenshots/placeholder.txt`, and commit to create the folder.
3. Upload your images (e.g., `light-theme.png`, `dark-theme.png`) to the `screenshots/` folder:
   - Click **Add file** > **Upload files** on GitHub, or use `git add screenshots/*.png` locally.
4. Update this section with the image links. Replace the placeholders below:
   - Light Theme: ![Light Theme](screenshots/light-theme.png)
   - Dark Theme: ![Dark Theme](screenshots/dark-theme.png)
   - Mobile View: ![Mobile View](screenshots/mobile-view.png)

## 🚀 Getting Started

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Safari).
- A local server for testing (e.g., `http-server` for HTTPS/localhost, required for PWA features).

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/manishrajdoot/taskvibe.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd taskvibe
   ```
3. **Serve the Application**:
   Use a local HTTPS server to test the app (required for PWA and EmailJS features):
   ```bash
   npx http-server -c-1 --ssl
   ```
   Alternatively, use VS Code’s Live Server extension or any other local server.
4. **Open in Browser**:
   Navigate to the URL provided by the server (e.g., `https://localhost:8080`).

### Enable GitHub Pages (Optional)
To host TaskVibe online:
1. Go to the repository on GitHub (`https://github.com/manishrajdoot/taskvibe`).
2. Navigate to **Settings** > **Pages**.
3. Under "Source," select the `main` branch and save.
4. Wait a few minutes, then access the live site at `https://manishrajdoot.github.io/taskvibe`.

## 🖱️ Usage

- **Add a Task**:
  - Enter a task description, optional comment, date, and time in the form.
  - Click "Add Task" or press Enter.
- **Complete a Task**:
  - Click the checkbox next to a task to mark it as completed.
- **Delete a Task**:
  - Click the trash icon to delete a task.
- **Filter Tasks**:
  - Use the "All," "Active," or "Completed" buttons to filter tasks.
- **Toggle Theme**:
  - Click the plane toggle in the top-right corner to switch between light and dark modes.
- **View FAQ**:
  - Click the FAQ button in the top-left corner to open the FAQ page.
- **Subscribe**:
  - Enter your email in the footer form to subscribe to updates.
- **Install as PWA**:
  - Click the "Install TaskVibe" button in the footer to install the app on your device.

## 🛠️ Technologies Used

- **HTML5**: Core structure of the web app.
- **CSS3**: Neumorphic styling, responsive design, and theme switching.
- **JavaScript**: Task management logic, theme switching, and PWA functionality.
- **EmailJS**: For handling email subscriptions in the footer.
- **Web APIs**:
  - `LocalStorage`: For persisting tasks and theme preferences.
  - `Service Worker`: For offline support via PWA.
- **Libraries**:
  - Boxicons for icons.
  - Tailwind CSS for utility styling in the footer.
- **Fonts**: Segoe UI for typography.

## 📂 Project Structure

```
taskvibe/
├── index.html         # Main HTML file
├── style.css          # Stylesheet for the main app
├── script.js          # JavaScript logic for task management
├── faq.html           # FAQ page HTML
├── faq.css            # Stylesheet for the FAQ page
├── manifest.json      # PWA manifest for app installation
├── sw.js              # Service Worker for offline support
├── .env               # Environment variables for EmailJS (not tracked in Git)
└── README.md          # Project documentation
```

## 👨‍💻 Developer

Developed by [Manish Rajdoot](https://www.instagram.com/manish.rajdoot/) © 2025.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## ❓ Troubleshooting

- **Images Not Appearing**:
  - Ensure you’ve uploaded screenshots to the `screenshots/` folder and updated the links in the "Screenshots" section.
  - For favicon: If the icon doesn’t display, replace the URL in `index.html`, `faq.html`, and `manifest.json` with a local file:
    1. Add a `favicon.png` (192x192) to the repository root.
    2. Update `<link rel="icon">` tags and `manifest.json` to reference `/favicon.png`.
- **Email Subscription Not Working**:
  - Verify your EmailJS setup:
    - Check the Service ID (`service_pwiiwdf`) and Template ID (`template_ym54agl`) in EmailJS dashboard.
    - Ensure the `.env` file is correctly configured (though `.env` should not be pushed to GitHub for security).
    - Test locally with HTTPS, as EmailJS requires a secure context.
- **PWA Not Installing**:
  - Ensure you’re serving the app over HTTPS or localhost.
  - Check the browser console for Service Worker errors.

---

Happy task managing with TaskVibe! 🖥️
