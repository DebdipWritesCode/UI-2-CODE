# 🎯 UI-2-CODE Wheel Assignment App

A sleek and interactive web app to visually assign design responsibilities between teams using a spinning roulette-style wheel.

🔗 **Live Demo:** [https://ui-2-code.vercel.app/](https://ui-2-code.vercel.app/)

This app allows users to:
- View all participating teams and their current assignment status
- Select a team and spin a colorful wheel to randomly assign another team for their design task
- Prevent teams from being selected multiple times or assigning themselves

---

## ✨ Features

- 🌀 Interactive roulette-style spinner using `react-custom-roulette`
- ✅ Auto-saving state using `localStorage`
- 🧠 Smart filtering to avoid duplicate or self-assignments
- 🎨 Vibrant color palette for engaging UI
- 🔊 Spin and assignment sound effects
- 📦 Modular and clean React component structure
- 💾 Data persistence across page reloads

---

## 🛠 Tech Stack

- **React** (with hooks)
- **Tailwind CSS** for styling
- `react-icons` for icons
- `react-custom-roulette` for wheel functionality
- Browser **localStorage** for saving state

---

## 📂 Project Structure

```
src/
├── App.jsx                 # Main component handling team state and modal logic
├── components/
│   └── Wheel.jsx           # Wheel component handling spin logic and UI
├── data/
│   └── teamsData.js        # Initial team data
├── sounds/
│   ├── spin.wav            # (Optional) Spin sound
│   └── assigned.wav        # (Optional) Assignment sound
```

---

## ⚙️ Core Logic

### 🔁 Team Eligibility Rules

When selecting eligible teams for assignment:
1. The current selected team is **excluded**
2. Any team already assigned to another is **excluded**
3. Teams with `allotedDesignTeamID !== null` are considered assigned
4. Assignment is only allowed when **eligible teams are present**

### 🧠 State Isolation for Modal

To prevent the wheel from updating immediately after assignments:
- A **shallow copied snapshot** of `teamsData` is passed to `Wheel` component
- This ensures the wheel doesn't re-render when `setTeamData()` is triggered, and only updates when modal is opened again

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ui2code-wheel-app.git
cd ui2code-wheel-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

---

## 🧪 Sample Team Data Format

```js
{
  id: 1,
  name: "Team Alpha",
  isAllotedDesign: false,
  allotedDesignTeamID: null
}
```

## 📃 License

MIT License © 2025 [Debdip Mukherjee](https://github.com/DebdipWritesCode)