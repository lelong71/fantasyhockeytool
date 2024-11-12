import React, {useState} from "react";
import {Table, Dropdown, DropdownButton} from 'react-bootstrap';

import CanvasJSReact from '@canvasjs/react-charts';

import {weeklyConstraints} from "./Data";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Weekly Summary Component
const WeeklySummary = ({weeklySummary}) => {
    const [selectedWeek, setSelectedWeek] = useState('All Weeks');
    const [selectedPosition, setSelectedPosition] = useState('All Positions');

    const weeks = ['All Weeks', ...weeklySummary.map(summary => summary.week)];
    const positions = ['All Positions', 'C', 'RW', 'LW', 'D', 'G'];

    const handleWeekSelect = (week) => {
        setSelectedWeek(week);
    };

    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
    };

    const filteredSummary = weeklySummary.filter(summary => {
        const weekMatches = selectedWeek === 'All Weeks' || summary.week === selectedWeek;
        const positionMatches = selectedPosition === 'All Positions' || summary.positions[selectedPosition] !== undefined;
        return weekMatches && positionMatches;
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-10 col-lg-8 p-3">
                    <h2>Weekly Summary</h2>
                    <div className="d-flex justify-content-between mb-3">
                        <DropdownButton id="dropdown-week" title={selectedWeek} onSelect={handleWeekSelect}>
                            {weeks.map((week, index) => (
                                <Dropdown.Item key={index} eventKey={week}>{week}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <DropdownButton id="dropdown-position" title={selectedPosition} onSelect={handlePositionSelect}>
                            {positions.map((position, index) => (
                                <Dropdown.Item key={index} eventKey={position}>{position}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Week</th>
                                <th>Position</th>
                                <th>Count</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredSummary.map((summary, index) => (
                                Object.keys(summary.positions).map((position, posIndex) => (
                                    (selectedPosition === 'All Positions' || selectedPosition === position) && (
                                        <tr key={`${index}-${posIndex}`}>
                                            <td>{summary.week}</td>
                                            <td>{position}</td>
                                            <td>{summary.positions[position]}</td>
                                        </tr>
                                    )
                                ))
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WeeklySummaryChart = ({ weeklySummary }) => {
    // Prepare data series for each position
    const positionSeriesMap = {};
    const baseLinePositionSeriesMap = {};

    weeklySummary.forEach(weekData => {
        const weekLabel = `${weekData.week}`;
        weekData.baseLinePosition = weeklyConstraints;
        Object.keys(weekData.positions).forEach(position => {
            if (!positionSeriesMap[position]) {
                positionSeriesMap[position] = {
                    type: "column",
                    name: position,
                    showInLegend: true,
                    dataPoints: []
                };
            }
            let basePosition = "Max-" + position;
            if (!baseLinePositionSeriesMap[basePosition]) {
                baseLinePositionSeriesMap[basePosition] = {
                    type: "column",
                    name: basePosition,
                    showInLegend: true,
                    dataPoints: []
                };
            }
            positionSeriesMap[position].dataPoints.push({ label: weekLabel, y: weekData.positions[position] });
            baseLinePositionSeriesMap[basePosition].dataPoints.push({ label: weekLabel, y: weekData.baseLinePosition[basePosition] });
        });
    });

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: ""
        },
        axisY: {
            prefix: "",
            //gridThickness: 0,
            tickLength: 0,
            suffix: "",
            title: "Position Count",
            includeZero: true
        },
        legend: {
            cursor: "pointer",
            itemclick: function (e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                }
                else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }
        },
        toolTip: {
            shared: true
        },
        data: []
    };
    // Convert positionSeriesMap to an array and assign to options.data
    options.data = Object.values(positionSeriesMap);
    //options.data = options.data.concat(Object.values(baseLinePositionSeriesMap));
    return (
        weeklySummary.length > 0 &&
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

export {WeeklySummary, WeeklySummaryChart}