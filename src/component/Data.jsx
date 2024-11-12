// data file
// Example player data

// Function to generate a unique playerId
const generatePlayerId = (player, index) => {
    // Use the player's name, team, and index to create a unique ID
    const namePart = player.name.replace(/\s+/g, '').toLowerCase(); // Remove spaces and convert to lowercase
    const teamPart = player.team.toLowerCase();
    return `${namePart}_${teamPart}_${index}`;
}

const _players = [
    {name: "Rasmus Dahlin", team: "Buffalo", primaryPosition: "D", secondaryPosition: null},
    {name: "Jack Eichel", team: "Buffalo", primaryPosition: "C", secondaryPosition: "RW"},
    {name: "Auston Matthews", team: "Toronto", primaryPosition: "C", secondaryPosition: null},
    {name: "Derek Le", team: "Buffalo", primaryPosition: "C", secondaryPosition: null},
    {name: "Jaden Guzman", team: "Buffalo", primaryPosition: "RW", secondaryPosition: null},
    {name: "Pat Mahoney", team: "Buffalo", primaryPosition: "RW", secondaryPosition: "LW"},
    {name: "John Doe", team: "Buffalo", primaryPosition: "C", secondaryPosition: "RW"},
    {name: "Mitch Marner", team: "Toronto", primaryPosition: "RW", secondaryPosition: "C"},
    {name: "Morgan Rielly", team: "Toronto", primaryPosition: "D", secondaryPosition: null},
    {name: "Henrik Lundqvist", team: "New York", primaryPosition: "G", secondaryPosition: null}
];

// Example usage
const players = _players.map((player, index) => {
    return {
        ...player,
        id: generatePlayerId(player, index)
    };
});

// Example position constraints
const constraints = {
    "C": 2,
    "RW": 2,
    "LW": 2,
    "D": 2,
    "G": 1
};
const weeklyConstraints = {
    "Max-C": 14,
    "Max-RW": 14,
    "Max-LW": 14,
    "Max-D": 14,
    "Max-G": 7
}
export {players, constraints, weeklyConstraints, generatePlayerId};