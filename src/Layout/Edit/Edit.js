import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index";

function Edit() {
	const { deckId } = useParams();
	const [currentDeck, setCurrentDeck] = useState(undefined);
	const history = useHistory();
    
    
	const [submitted, setSubmitted] = useState(false);
	const submitHandler = (event) => {
		event.preventDefault();
		setSubmitted(!submitted);
		setTimeout(() => {
			history.push(`/decks/${deckId}`);
		}, 500);
	};

	useEffect(() => {
		const abortController = new AbortController();
		const viewCurrentDeck = async () => {
			try {
				const data = await readDeck(deckId, abortController.signal);
				setCurrentDeck({ ...data });
			} catch (error) {
				console.log(error.message);
			}
		};
		viewCurrentDeck();
		return () => abortController.abort();
	}, [deckId]);

	useEffect(() => {
		const abortController = new AbortController();
		if (submitted) {
			const viewCurrentDeck = async () => {
				try {
					await updateDeck(currentDeck, abortController.signal);
				} catch (error) {
					console.log(error.message);
				}
			};
			viewCurrentDeck();
		}

		return () => abortController.abort();
	}, [deckId, submitted, currentDeck]);

	const changeHandler = (event) => {
		const deckKey = event.target.name;
		const deckValue = event.target.value;
		setCurrentDeck({ ...currentDeck, [deckKey]: deckValue });
	};
	if (currentDeck) {
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li className="breadcrumb-item">
							<Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link>
						</li>
						<li
							className="breadcrumb-item active"
							aria-current="page"
						>
							Edit Deck
						</li>
					</ol>
				</nav>
				<h1>Edit Deck</h1>
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
							value={currentDeck.name}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="deckDescription">
							Description
						</label>
						<textarea
							className="form-control"
							id="deckDescription"
							name="description"
							rows="3"
							placeholder="Brief description of the deck"
							value={currentDeck.description}
							onChange={changeHandler}
							required
						></textarea>
					</div>
					<div style={{ display: "flex" }}>
						<Link
							to={`/decks/${deckId}`}
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
	} else {
		return null;
	}
}
export default Edit;
