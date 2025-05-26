import React, { useState } from 'react';
import { Container } from "react-bootstrap";
// import Multiselect from 'multiselect-react-dropdown';

function Selectmultidropdown({setDocdata , docData}) {

     console.log('manish ',docData);

    const [options] = useState(['Full-time Employees', 'part-time Employees', 'Intern Employees' , 'Trainee Employees']);
    const [country, setCountry] = useState(options);

    return (
        <React.Fragment>
            <Container className="content">
                <div className="row">
                    <div className="col-sm-12">

                        <form className="row g-3" method='post'>
                            <div className="col-md-5">
                                <div className="text-dark">
                                   
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default Selectmultidropdown;
