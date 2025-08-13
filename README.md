# 🍽️ Restaurant Picker Roulette

An interactive **restaurant picker roulette** where users can spin a wheel of given categories. Once a category is chosen, a random restaurant is selected from it and displayed with relevant details.

---

## 📌 Features

- 🎡 **Roulette Wheel** — Spin to pick a category
- 🍔 **Random Restaurant Selection** — Picks from predefined lists
- 🎨 **Tailwind CSS Styling** — Clean, responsive design
- ⚡ **Vite + TypeScript** — Fast, modern development stack
- 🛠️ **Easily Customizable** — Add new categories or restaurants in minutes

---

## 🚀 Live Demo
[View Demo](https://restaurantpickerroulette.netlify.app/)

---

## 🛠️ Tech Stack

- **TypeScript** — Main language for type safety and maintainability
- **Vite** — Fast development & build tooling
- **Tailwind CSS** — Utility-first styling
- **JavaScript** — Minor utility scripts
- **ESLint** — Code linting and formatting

---

## 📂 Project Structure

```
restaurant-picker/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── src/
│   ├── main.ts        # App entry point
│   ├── data.ts        # Restaurant/category data
│   ├── wheel.ts       # Roulette wheel logic
│   └── styles.css
└── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/RYK26/restaurant-picker.git
   cd restaurant-picker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```
   Open your browser at the URL printed in the terminal (usually `http://localhost:5173`).

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## ✏️ Customization

- **Add Restaurants:** Edit `src/data.ts` to update categories and restaurant lists.
- **Change Styles:** Modify `src/styles.css` or Tailwind classes directly in components.
- **Adjust Wheel Behavior:** Tweak spin logic in `src/wheel.ts`.

---

## 🤝 Contributing

Contributions are welcome!  
If you'd like to improve the app, fix bugs, or add features:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and adapt it for your own projects.

---

## 📷 Screenshots
*(Add images or GIFs here to showcase the roulette wheel in action)*

---

**Author:** [RYK26](https://github.com/RYK26)
