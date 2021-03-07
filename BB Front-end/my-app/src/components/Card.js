/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

function Card(props) {

    const [BB, setBB] = useState("");

    useEffect(() => {
        setBB(props.BB);
    }, [props])

    return (
        <div style={{display: "block"}} className="">
            <div className="card mx-auto m-4 py-2" style={{ width: "50%" }}>
                <div className="card-body text-center">
                    <h5 className="card-title">{BB.BBName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{BB.contact}</h6>
                    <p className="card-text">{BB.location}</p>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        </div>
    )



}

export default Card;