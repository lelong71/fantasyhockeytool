import {Table} from "react-bootstrap";
import React from "react";

const Schedule = ({scheduleList}) => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-12 col-md-10 col-lg-8 p-3">
                <h2>Schedule</h2>
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Day</th>
                            <th>Date</th>
                            <th>Home Team</th>
                            <th>Away Team</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scheduleList.map((schedule, index) => (
                            <tr key={index}>
                                <td>{schedule.day}</td>
                                <td>{schedule.date}</td>
                                <td>{schedule.homeTeam}</td>
                                <td>{schedule.awayTeam}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    </div>
);
export default Schedule;