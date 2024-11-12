import React, {useState, useEffect} from 'react';
import {Button, Tabs, Tab, Accordion} from 'react-bootstrap';

import Schedule from './component/Schedule';
import {PlayerManagement} from "./component/PlayerManagement";
import {WeeklySummary, WeeklySummaryChart} from "./component/WeeklySummaryReport";
import DailyAssignments from "./component/DailyAssignments";

import {players, constraints} from "./component/Data";

// Define the component
const FantasyHockeyTool = () => {
    // State management
    const [scheduleList, setScheduleList] = useState([]);
    const [playerList, setPlayerList] = useState([]);
    const [positionConstraints, setPositionConstraints] = useState({});
    const [weeklySummary, setWeeklySummary] = useState([]);
    const [assignmentDisplay, setAssignmentDisplay] = useState([]);

    // Mimic constructor and loadData
    useEffect(() => {
        loadData();
    }, []);

    // Load data function
    const loadData = () => {
        // Example schedule data for a month (4 weeks)
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const teams = ["Buffalo", "Toronto", "New York"];
        let dayCounter = 1; // Starting from 10/01/2024

        const schedules = [];
        for (let week = 0; week < 4; week++) {
            for (const day of days) {
                const date = `10/${dayCounter}/2024`;
                const homeTeam = teams[week % teams.length];
                const awayTeam = teams[(week + 1) % teams.length];
                schedules.push({day, date, homeTeam, awayTeam});
                dayCounter++;
            }
        }
        setScheduleList(schedules);
        setPlayerList(players);
        setPositionConstraints(constraints);
    };

    // Optimize assignments function
    const optimizeAssignments = () => {
        const dailyAssignments = {};

        scheduleList.forEach(schedule => {
            const dailyPositionMap = {};
            Object.keys(positionConstraints).forEach(position => {
                dailyPositionMap[position] = [];
            });

            const singlePositionPlayers = [];
            const dualPositionPlayers = [];

            playerList.forEach(player => {
                if (player.team === schedule.homeTeam || player.team === schedule.awayTeam) {
                    if (player.secondaryPosition === null || player.secondaryPosition === '') {
                        singlePositionPlayers.push(player);
                    } else {
                        dualPositionPlayers.push(player);
                    }
                }
            });

            // Assign single position players first
            singlePositionPlayers.forEach(player => {
                assignPlayerToPosition(dailyPositionMap, player);
            });

            // Assign dual position players next
            dualPositionPlayers.forEach(player => {
                assignPlayerToPosition(dailyPositionMap, player);
            });

            dailyAssignments[schedule.date] = dailyPositionMap;
        });

        printAssignments(dailyAssignments);
        printWeeklySummary(dailyAssignments);
    };

    // Assign player to position
    const assignPlayerToPosition = (dailyPositionMap, player) => {
        const primary = player.primaryPosition;
        const secondary = player.secondaryPosition;

        if (canAssign(dailyPositionMap, primary)) {
            dailyPositionMap[primary].push(player);
        } else if (secondary && canAssign(dailyPositionMap, secondary)) {
            dailyPositionMap[secondary].push(player);
        }
    };

    // Check if a player can be assigned to a position
    const canAssign = (dailyPositionMap, position) => {
        return dailyPositionMap[position].length < positionConstraints[position];
    };

    // Print assignments
    const printAssignments = (dailyAssignments) => {
        const displayData = [];
        Object.keys(dailyAssignments).forEach(date => {
            const positionMap = dailyAssignments[date];
            Object.keys(positionMap).forEach(position => {
                positionMap[position].forEach(player => {
                    displayData.push({date, position, playerName: player.name});
                });
            });
        });
        setAssignmentDisplay(displayData);
    };

    // Print weekly summary
    const printWeeklySummary = (dailyAssignments) => {
        const weeklyPositionCount = {};
        let weekStartDate = null;
        const summary = [];

        Object.keys(dailyAssignments).forEach((date, index, dates) => {
            const dailyPositionMap = dailyAssignments[date];
            Object.keys(dailyPositionMap).forEach(position => {
                const count = dailyPositionMap[position].length;
                weeklyPositionCount[position] = (weeklyPositionCount[position] || 0) + count;
            });

            if (!weekStartDate) {
                weekStartDate = date;
            }

            // Check if the current date is the end of the week or the last date in the list
            const isEndOfWeek = (index + 1) % 7 === 0 || index === dates.length - 1;
            if (isEndOfWeek) {
                const weekEndDate = date;
                summary.push({week: `${weekStartDate} - ${weekEndDate}`, positions: {...weeklyPositionCount}});
                Object.keys(weeklyPositionCount).forEach(position => {
                    weeklyPositionCount[position] = 0;
                });
                weekStartDate = null;
            }
        });

        setWeeklySummary(summary);
    };

    const handlePlayerListUpdated = (newPlayerList) => {
        players.length = 0;
        players.push(...newPlayerList);
        setPlayerList(newPlayerList);
        optimizeAssignments();
    }
/*
    return (
        <div>
            <div className="text-center p-4">
                <h1>Fantasy Hockey Tool</h1>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <Tabs defaultActiveKey="playerInfo" id="fantasy-tabs">
                        <Tab eventKey="playerInfo" title="Player Information">
                            <PlayerManagement onUpdate={handlePlayerListUpdated} />
                        </Tab>
                        <Tab eventKey="schedule" title="Schedule">
                            <Schedule scheduleList={scheduleList}/>
                        </Tab>
                        <Tab eventKey="assignPlayers" title="Player Assignment">
                            <DailyAssignments assignmentDisplay={assignmentDisplay}/>
                            <br/><br/>
                            <Button onClick={optimizeAssignments}>Assign Players</Button>
                        </Tab>
                        <Tab eventKey="weeklySummary" title="Weekly Summary">
                            <WeeklySummaryChart weeklySummary={weeklySummary} />
                            <br/><br/>
                            <WeeklySummary weeklySummary={weeklySummary}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );

 */
    return (
        <div>
            <div className="text-center p-4">
                <h1>Fantasy Hockey Tool</h1>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Player Information</Accordion.Header>
                            <Accordion.Body>
                                <PlayerManagement onUpdate={handlePlayerListUpdated} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Schedule</Accordion.Header>
                            <Accordion.Body>
                                <Schedule scheduleList={scheduleList} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Player Assignment</Accordion.Header>
                            <Accordion.Body>
                                <DailyAssignments assignmentDisplay={assignmentDisplay} />
                                <br /><br />
                                <Button onClick={optimizeAssignments}>Assign Players</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Weekly Summary</Accordion.Header>
                            <Accordion.Body>
                                <WeeklySummaryChart weeklySummary={weeklySummary} />
                                <br /><br />
                                <WeeklySummary weeklySummary={weeklySummary} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default FantasyHockeyTool;