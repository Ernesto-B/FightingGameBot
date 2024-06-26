# Project Requirements

### Core Features
1. Display match tallies against a specific opponent.
2. Display total wins and total losses globally.
3. Server rankings, scoreboard between everyone in the server.
4. Elo system for ranking users.
5. Clan system, where users can join a clan and compete against other clans.

### Commands

#### Player Commands:
- `/help`: displays all commands.
- `/profile {player}` : returns a users wins, losses, and highest ranking in server.
- `/rank-match {player (defaults to user)} {player2}` : logs a ranked match between two users, and the winner. Match results will affect elo rankings. Both players have to click the corresponding reaction to confirm the match.
- `/match {player (defaults to user)} {player2}` : logs a friendly match between two users, and the winner. Match results will not affect elo.
- `/leaderboard` : displays a leaderboard of users within the server that have used the bot, ranked by unique elo system (if you beat someone in a higher rank you get 3 points as opposed to 2).
- `/match-history {player (defaults to user)} {player2}`: displays match tallies between two users. 

#### Clan Commands:
- `/clan {clanName}` : gets information on the clan, including members, wins, losses, and ranking.
- `/clan-create {clanName}` : creates a clan with the user as the leader.
- `/clan-invite {player} {clanName}` : invites a user to the clan. Only the leader of the clan can invite users.
- `/clan-leaderboard` : displays a leaderboard of users within the server that have used the bot, ranked by unique elo system (if you beat someone in a higher rank you get 3 points as opposed to 2).
- `/clan-leader {playerTarget} {clanName}`: Changes the current leader of the clan, can only be done by the LEADER

#### Admin Commands:
- `/settings` : displays the current elo system settings, and the different elo settings.
- `/eloSystem {setting}` : change the elo scale or elo calculations to your own settings.

## Technical Specifications
- **Redis**: Used to store user data and match data, as well as server data.
- **Discord.js**: Used to interact with the Discord API.
- **Node.js**: Used to run the bot.

## Milestones
- Creating database schema.
- Creating bot.
- All core features implemented.
- All commands implemented.

## Future Enhancements
- Website explaining instructions and how to use the bot and how to install the bot on your own server.
- More statitics and analytics for users from the database.
- Achievements and rewards for users, displayed on the leaderboard and profile.
- Clan matches.
- Multi-language support.
- Clan admins

## Learning Objectives
- Gaining experience with Redis.
- Being able to create different representations of data, and data visualizations.
- Doing operations on data, and creating a ranking system.
- Creating functional discord bot.
- Implement CI/CD pipeline for the bot.