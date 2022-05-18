import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

function DeckNew() {
	const date = new Date();
	const initId = `${date.getUTCFullYear()}${date.getUTCMonth()}${date.getDate()}${date.getHours()}${date.getSeconds()}${date.getMilliseconds()}`;

	const [deckId, setDeckId] = useState(initId);

	const initDeck = {
		cards: [],
		description: "",
		id: deckId,
		name: "",
	};
	const [newDeck, setNewDeck] = useState(initDeck);

	const changeHandler = (event) => {
		const deckKey = event.target.name;
		const deckValue = event.target.value;
		setNewDeck({ ...newDeck, [deckKey]: deckValue });
	};

	const history = useHistory();
	const submitHandler = async (event) => {
		event.preventDefault();
		const abortController = new AbortController();
		try {
			await createDeck(newDeck, abortController.signal);
			history.push(`/decks/${deckId}`);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item active" aria-current="page">
						Create Deck
					</li>
				</ol>
			</nav>
			<h1>Create Deck</h1>
			<form onSubmit={submitHandler}>
				<div className="form-group">
					<label htmlFor="deckName">Name</label>
					<input
						type="text"
						className="form-control"
						id="deckName"
						name="name"
						placeholder="Deck Name"
						onChange={changeHandler}
						value={newDeck.name}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="deckDescription">Example textarea</label>
					<textarea
						className="form-control"
						id="deckDescription"
						name="description"
						rows="3"
						placeholder="Brief description of the deck"
						value={newDeck.description}
						onChange={changeHandler}
						required
					></textarea>
				</div>
				<div style={{ display: "flex" }}>
					<Link
						to="/"
						className="btn btn-secondary"
						style={{ margin: "0 10px 0 0" }}
					>
						Cancel
					</Link>
					<button
						type="submit"
						className="btn btn-primary"
						style={{ margin: "0 10px 0 0" }}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
export default DeckNew;
