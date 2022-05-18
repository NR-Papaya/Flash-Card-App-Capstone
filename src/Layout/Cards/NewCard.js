import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
//----------components
import CardForm from "./CardForm";
//--------------------

export default function NewCard() {
	let { deckId } = useParams();
	const date = new Date();
	const cardId = parseInt(
		`${date.getUTCFullYear()}${date.getUTCMonth()}${date.getDate()}${date.getHours()}${date.getSeconds()}${date.getMilliseconds()}`
	);
	const initCard = {
		id: cardId,
		front: "",
		back: "",
		deckId: toString(deckId),
	};
	const [card, setCard] = useState(initCard);
	const [currentDeck, setCurrentDeck] = useState(null);

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

	const history = useHistory();
	const submitHandler = async (event) => {
		event.preventDefault();
		const abortController = new AbortController();
		try {
			await createCard(deckId, card, abortController.signal);
			history.push(`/decks/${deckId}`);
		} catch (error) {
			console.log(error.message);
		}
	};
	const onChangeHandler = (event) => {
		const cardKey = event.target.name;
		const cardValue = event.target.value;
		setCard({ ...card, [cardKey]: cardValue });
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
							<Link to={`/decks/${deckId}`}>
								{currentDeck.name}
							</Link>
						</li>
						<li
							className="breadcrumb-item active"
							aria-current="page"
						>
							Add Card
						</li>
					</ol>
				</nav>
				<h3>{currentDeck.name}: Add Card</h3>
				<CardForm
					submitHandler={submitHandler}
					card={card}
					onChangeHandler={onChangeHandler}
					deckId={deckId}
				/>
			</div>
		);
	} else {
		return null;
	}
}
