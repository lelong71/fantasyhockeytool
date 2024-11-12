import React, {useEffect, useState} from "react";
import {Dropdown, DropdownButton, Table} from "react-bootstrap";

const DailyAssignments = ({assignmentDisplay}) => {
    const [filteredAssignments, setFilteredAssignments] = useState(assignmentDisplay);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState('');

    useEffect(() => {
        filterAssignments();
    }, [selectedDate, selectedPosition, selectedPlayer, assignmentDisplay]);

    const filterAssignments = () => {
        let filtered = assignmentDisplay;

        if (selectedDate) {
            filtered = filtered.filter(assignment => assignment.date === selectedDate);
        }
        if (selectedPosition) {
            filtered = filtered.filter(assignment => assignment.position === selectedPosition);
        }
        if (selectedPlayer) {
            filtered = filtered.filter(assignment => assignment.playerName === selectedPlayer);
        }

        setFilteredAssignments(filtered);
    };

    const uniqueDates = [...new Set(assignmentDisplay.map(assignment => assignment.date))];
    const uniquePositions = [...new Set(assignmentDisplay.map(assignment => assignment.position))];
    const uniquePlayers = [...new Set(assignmentDisplay.map(assignment => assignment.playerName))];

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-10 col-lg-8 p-3">
                    <h2>Daily Assignments</h2>
                    <div className="d-flex justify-content-between mb-3">
                        <DropdownButton id="dropdown-date" title={`${selectedDate || 'Date:All'}`}>
                            <Dropdown.Item onClick={() => setSelectedDate('')}>All</Dropdown.Item>
                            {uniqueDates.map(date => (
                                <Dropdown.Item key={date} onClick={() => setSelectedDate(date)}>
                                    {date}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <DropdownButton id="dropdown-position" title={`${selectedPosition || 'Position:All'}`}>
                            <Dropdown.Item onClick={() => setSelectedPosition('')}>All</Dropdown.Item>
                            {uniquePositions.map(position => (
                                <Dropdown.Item key={position} onClick={() => setSelectedPosition(position)}>
                                    {position}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <DropdownButton id="dropdown-player" title={`${selectedPlayer || 'Player:All'}`}>
                            <Dropdown.Item onClick={() => setSelectedPlayer('')}>All</Dropdown.Item>
                            {uniquePlayers.map(player => (
                                <Dropdown.Item key={player.id} onClick={() => setSelectedPlayer(player)}>
                                    {player}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Position</th>
                            <th>Player Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAssignments.map((assignment, index) => (
                            <tr key={index}>
                                <td>{assignment.date}</td>
                                <td>{assignment.position}</td>
                                <td>{assignment.playerName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default DailyAssignments;