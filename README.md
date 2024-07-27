# QueueCrew

## 🎮 About The Project

QueueCrew is a web application designed to streamline the decision-making process for friend groups when selecting a game to play together. It addresses the common challenge of reaching a consensus in group gaming sessions by allowing users to suggest games and vote on them.

### Built With

* Frontend: React with Tailwind CSS
* Backend: Hono
* Database: Turso
* Authentication: Discord OAuth
* Real-time Updates: WebSockets

## 🚀 Features

- Discord integration for seamless login
- Create and manage gaming groups
- Suggest games for group play sessions
- Vote on game suggestions
- Real-time updates for an interactive experience
- Mobile-responsive design

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v20 or later)
* pnpm
* Discord Developer Account (for OAuth setup)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AnthonyW90/QueueCrew.git
   ```
2. Install NPM packages
   ```sh
   cd QueueCrew
   pnpm install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   TURSO_DATABASE_URL=your_turso_database_url
   ```
4. Start the development server
   ```sh
   pnpm dev
   ```

## 📖 Usage

After logging in with Discord, you can:
1. Create a new group or join an existing one
2. Suggest games for your group to play
3. Vote on game suggestions
4. View real-time results of the voting

For more details, check out our [User Guide](link-to-user-guide).

## 🗺️ Roadmap

- [ ] Basic group management
- [ ] Game suggestion and voting system
- [ ] Real-time updates
- [ ] Integration with popular game libraries (Steam, Epic Games, etc.)
- [ ] Advanced scheduling features
- [ ] Mobile app version

See the [open issues](https://github.com/AnthonyW90/QueueCrew.git/issues) for a full list of proposed features and known issues.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please refer to the [Contributing Guidelines](link-to-contributing-guidelines) for more information.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Your Name - [@DefaultGamingN](https://twitter.com/DefaultGamingN)

Project Link: [https://github.com/AnthonyW90/QueueCrew.git](https://github.com/AnthonyW90/QueueCrew.git)

## 🙏 Acknowledgments

* [Discord API](https://discord.com/developers/docs/intro)
* [Hono](https://honojs.dev/)
* [Turso](https://turso.tech/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)

---

⭐️ If you find this project useful, please consider giving it a star!