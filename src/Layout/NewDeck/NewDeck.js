import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, listDecks } from "../../utils/api/index";

function NewDeck() {
	const [deckList, setDeckList] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const getListDecks = async () => {
			try {
				const data = await listDecks(abortController.signal);
				setDeckList([...data]);
			} catch (error) {
				console.log(error.message);
			}
		};
		getListDecks();
		return () => abortController.abort();
	}, []);

	const deckId = deckList.length;
	const [submitted, setSubmitted] = useState(false);
	const initDeck = {
		cards: [],
		description: "",
		id: deckId,
		name: "",
	};
	const [newDeck, setNewDeck] = useState(initDeck);
	const history = useHistory();

	useEffect(() => {
		if (submitted) {
			const abortController = new AbortController();

			const addDeck = async () => {
				try {
					await createDeck(newDeck, abortController.signal);
				} catch (error) {
					console.log(error.message);
				}
			};
			addDeck();
			// history.push(`/decks/${deckId}`)
			return () => abortController.abort();
		}
	}, [deckId, history, newDeck, submitted]);

	const submitHandler = (event) => {
		event.preventDefault();
		setSubmitted(!submitted);
	};
	const changeHandler = (event) => {
		const deckKey = event.target.name;
		const deckValue = event.target.value;
		setNewDeck({ ...newDeck, [deckKey]: deckValue });
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
export default NewDeck;
