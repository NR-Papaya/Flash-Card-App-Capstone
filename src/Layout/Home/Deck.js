import React from "react";
import { Link } from "react-router-dom";

export default function Deck({ deck,deleteHandler }) {
	const cards = deck.cards;
	return (
		<div
			className="card"
			id={deck.id}
			style={{ width: "35rem", margin: "10px 0" }}
		>
			<div className="card-body">
				<div
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<h5 className="card-title">{deck.name}</h5>
					<p>{cards.length} cards</p>
				</div>

				<p className="card-text">{deck.description}</p>
				<div
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<div style={{ display: "flex" }}>
						<Link
							to={`/decks/${deck.id}`}
							className="btn btn-secondary"
							style={{ margin: "0 10px 0 0" }}
						>
							View
						</Link>
						<Link
							to={`/decks/${deck.id}/study`}
							className="btn btn-primary"
						>
							Study
						</Link>
					</div>
					<button type="delete" onClick={deleteHandler} className="btn btn-danger">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
