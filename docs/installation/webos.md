# WebOS Installation [WebOS Only]

WebOS requires sideloading the application using Developer Mode. This guide provides two options for installing Nuvio: automatically using the Nuvio Installer, or manually using the WebOS Dev Manager.

>[!NOTE]
> WebOS support is continually improving but may have minor limitations compared to Android TV.

## Option 1: Nuvio Installer (Automated)
The official installer provides a simplified way to deploy Nuvio directly to your TV without needing to manually download packages or use WebOS Dev Manager.

### 1. Enable Developer Mode on your TV
  - On your LG TV, open the **Content Store** (or Apps).
  - Search for and install the **Developer Mode** app.
  - Open the Developer Mode app. You will be prompted to log in with an LG Developer account. If you don't have one, create it at the LG Developer portal.
  - Once logged in, toggle **Dev Mode Status** to ON. The TV will restart.
  - After the restart, open the Developer Mode app again and toggle **Key Server** to ON.

### 2. Run the Nuvio Installer
  - Download and run the latest `Nuvio-WebTV-Installer` from the [Official Nuvio Releases](https://github.com/NuvioMedia/NuvioWeb/releases/latest).
    - *(macOS users: If the app is blocked, move it to Applications and run `xattr -dr com.apple.quarantine "/Applications/Nuvio WebTV Installer.app"` and `codesign --force --deep --sign - "/Applications/Nuvio WebTV Installer.app"` in the terminal).*
    - *windows users: If the app is blocked, click on more then run anyway*
  - Select **LG WebOS** on the "Select your TV OS" screen.
  - Choose **Simple Installation (Recommended)** to automatically fetch the latest release from GitHub.
  - On the configuration screen, enter your **TV IP Address**.
  - Enter your **Developer Mode Passphrase** (found in the Developer Mode app on your TV, required for the first connection).
  - Click **Install** and wait for the process to complete.

---

## Option 2: WebOS Dev Manager (Manual)
If you prefer not to use the automated installer, you can manually sideload the app using WebOS Dev Manager.

### Prerequisites
- A PC (Windows, macOS, or Linux).
- The **WebOS Dev Manager** installed on your PC.
- The latest `NuvioTV-webOS-*.ipk` file from the [Official Nuvio Releases](https://github.com/NuvioMedia/NuvioWeb/releases/latest).

### 1. Enable Developer Mode on your TV
  - On your LG TV, open the **Content Store** (or Apps).
  - Search for and install the **Developer Mode** app.
  - Open the Developer Mode app. You will be prompted to log in with an LG Developer account. If you don't have one, create it at the LG Developer portal.
  - Once logged in, toggle **Dev Mode Status** to ON. The TV will restart.
  - After the restart, open the Developer Mode app again and toggle **Key Server** to ON.

### 2. Connect your TV to WebOS Dev Manager
   - Open **WebOS Dev Manager** on your PC.
   - Click **Add Device**.
   - Enter the **IP Address** and **Passphrase** exactly as they appear in the Developer Mode app on your TV.
   - Follow the prompts to finish pairing.

### 3. Install the Package
  - In WebOS Dev Manager, navigate to the **Apps** section.
  - Click **Install**, and select the `NuvioTV-webOS-*.ipk` file you downloaded earlier.
  - Wait for the installation to finish.
  - Once installed, Nuvio will appear in your TV's launcher. 

---

## Troubleshooting
- **Session Expiration:** Developer Mode sessions expire after a certain amount of time (usually 999 hours or less). If this happens, your apps may disappear or fail to launch. Open the Developer Mode app and click **Extend Session** to refresh the timer.
- **Connection Issues:** Ensure both your TV and PC are on the same local network.
