import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readCard, readDeck,updateCard } from "../../utils/api";
//----------components
import CardForm from "./CardForm";
//--------------------

export default function EditCard() {
	let { deckId, cardId } = useParams();

	const [card, setCard] = useState(null);
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
	
	useEffect(() => {
		const abortController = new AbortController();
		const viewCurrentCard = async () => {
			try {
				const data = await readCard(cardId, abortController.signal);
				setCard({ ...data });
			} catch (error) {
				console.log(error.message);
			}
		};
		viewCurrentCard();
		return () => abortController.abort();
	}, [deckId]);

	const history = useHistory();
	const submitHandler = async (event) => {
		event.preventDefault();
		const abortController = new AbortController();
		try {
			await updateCard(card, abortController.signal);
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

	if (currentDeck && card) {
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
							Edit Card: {cardId}
						</li>
					</ol>
				</nav>
				<h3>{currentDeck.name}: Edit Card</h3>
				<CardForm
					submitHandler={submitHandler}
					card={card}
					onChangeHandler={onChangeHandler}
				/>
			</div>
		);
	} else {
		return null;
	}
}
