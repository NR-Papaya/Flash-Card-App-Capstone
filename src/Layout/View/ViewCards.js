import React from "react";

export default function ViewCards({ card }) {
	return (
		<div className="card w-100">
			<div className="card-body">
				<div
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<p
						className="card-text"
						style={{ width: "50%", margin: "10px" }}
					>
						{card.front}
					</p>
					<p
						className="card-text"
						style={{ width: "50%", margin: "10px" }}
					>
						{card.back}
					</p>
				</div>
				<div style={{ display: "flex", justifyContent: "right" }}>
					<button
						className="btn btn-secondary"
						style={{ margin: "5px" }}
					>
						Edit
					</button>
					<button
						className="btn btn-danger"
						style={{ margin: "5px" }}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
