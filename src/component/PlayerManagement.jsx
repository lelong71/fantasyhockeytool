import React, {useEffect, useState} from "react";
import {Button, Col, Dropdown, DropdownButton, Form, Row, Table} from "react-bootstrap";
import Stack from "react-bootstrap/Stack";

import {generatePlayerId, players} from "./Data";

const PlayerForm = ({ onAddPlayer, onEditPlayer, player }) => {
    const [primaryButtonTitle, setPrimaryButtonTitle] = useState(player ? 'Save' : 'Add Player')
    // Initialize form data state
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        team: "",
        primaryPosition: "",
        secondaryPosition: ""
    });

    const positions = ["C", "RW", "LW", "D", "G"];

    // Update state when the player prop changes
    useEffect(() => {
        if (player) {
            setFormData({
                id: player.id || "",
                name: player.name || "",
                team: player.team || "",
                primaryPosition: player.primaryPosition || "",
                secondaryPosition: player.secondaryPosition || ""
            });
            setPrimaryButtonTitle("Save");
        } else {
            setPrimaryButtonTitle("Add Player");
        }
    }, [player]);

    const clearForm = () => {
        setFormData({
            id: "",
            name: "",
            team: "",
            primaryPosition: "",
            secondaryPosition: ""
            // Reset other fields as necessary
        });
        setPrimaryButtonTitle("Add Player");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (player) {
            onEditPlayer(formData);
            clearForm();
        } else {
            onAddPlayer(formData);
        }

        // Reset form fields if adding a new player
        if (!player) {
            clearForm();
        }
    };

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const setPrimaryPosition = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            ["primaryPosition"]: e,
        }));
    };

    const setSecondaryPosition = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            ["secondaryPosition"]: e,
        }));
    }
    return (
        <div className="p-3">
            <Form onSubmit={handleSubmit} className="p-3">
                <Form.Group controlId="formPlayerName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        width="50%"
                        placeholder="Enter player name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formPlayerTeam">
                    <Form.Label>Team</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter team name"
                        name="team"
                        value={formData.team}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="primaryPosition">
                    <Form.Label>Primary Position</Form.Label>
                    <DropdownButton
                        variant="secondary"
                        name="primaryPosition"
                        title={formData.primaryPosition || "Select Primary Position"}
                        onSelect={setPrimaryPosition}
                    >
                        {positions.map((position) => (
                            <Dropdown.Item key={position} eventKey={position}>
                                {position}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Form.Group>

                <Form.Group controlId="secondaryPosition">
                    <Form.Label>Secondary Position</Form.Label>
                    <DropdownButton
                        variant="secondary"
                        name="secondaryPosition"
                        title={formData.secondaryPosition || "Select Secondary Position"}
                        onSelect={setSecondaryPosition}
                    >
                        {positions.map((position) => (
                            <Dropdown.Item key={position} eventKey={position}>
                                {position}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Form.Group>
                <br/><br/>
                <Button className="me-2" variant="primary" type="submit">
                    {primaryButtonTitle}
                </Button>
                <Button variant="secondary" type="button" onClick={clearForm}>
                    Clear
                </Button>
            </Form>
        </div>
    );
};

// Player Information Component
const PlayerInformation = ({onEditPlayer, onDeletePlayer, playerList}) => {
    const handleDeleteClick = (playerId) => {
        onDeletePlayer(playerId);
    };

    const handleEditClick = (player) => {
        onEditPlayer(player);
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Primary</th>
                    <th>Secondary</th>
                    <th>Team</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {playerList.map(player => (
                    <tr key={player.id} onClick={() => handleEditClick(player)}>
                        <td>{player.name}</td>
                        <td>{player.primaryPosition}</td>
                        <td>{player.secondaryPosition || 'N/A'}</td>
                        <td>{player.team}</td>
                        <td>
                            <Button variant="danger" onClick={(e) => {e.stopPropagation(); handleDeleteClick(player.id);}}>x</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};


const PlayerManagement = ({onUpdate}) => {
    const [playerList, setPlayerList] = useState(players);
    const [editingPlayer, setEditingPlayer] = useState();

    const handleAddPlayer = (newPlayer) => {
        newPlayer.id = generatePlayerId(newPlayer, playerList.length);
        const newPlayerList = [newPlayer,...playerList];
        setPlayerList(newPlayerList);
        onUpdate(newPlayerList);
    };

    const handleEditPlayer = (updatedPlayer) => {
        const newPlayerList = playerList.map(player =>
            player.id === updatedPlayer.id ? updatedPlayer : player
        );
        setPlayerList(newPlayerList);
        onUpdate(newPlayerList);
        setEditingPlayer(null); // Clear the editing player after update
    }

    const showEditPlayerForm = (player) => {
        setEditingPlayer(player);
    }

    const handleDeletePlayer = (id) => {
        // Filter out the player with the given id
        const updatedPlayers = playerList.filter(player => player.id !== id);
        // Update the state with the new list of players
        setPlayerList(updatedPlayers);
        onUpdate(updatedPlayers);
    }

    return (
        <Stack gap={2}>
            <div className="p-3">
                <PlayerForm onAddPlayer={handleAddPlayer}
                            onEditPlayer={handleEditPlayer}
                            player={editingPlayer}/>
            </div>
            <div className="p-3">
                <PlayerInformation
                    onEditPlayer={showEditPlayerForm}
                    onDeletePlayer={handleDeletePlayer}
                    playerList={playerList} />
            </div>
        </Stack>
    );
};

export {PlayerForm, PlayerInformation, PlayerManagement}