import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
//------Components
import DeckList from "./DeckList";
//----------------

export default function Home() {
	const [deckList, setDeckList] = useState([]);
	const [deleteEvent, setDeleteEvent] = useState(false);
	const [idToDelete, setIdToDelete] = useState(null);

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

	useEffect(() => {
		const abortController = new AbortController();
		if (deleteEvent) {
			const deleteADeck = async () => {
				try {
					await deleteDeck(idToDelete, abortController.signal);
					const data = await listDecks(abortController.signal);
					setDeckList([...data]);
				} catch (error) {
					console.log(error.message);
				}
			};
			deleteADeck();
			return () => abortController.abort();
		}
	}, [deleteEvent, idToDelete]);

	const deleteHandler = (event) => {
		const deleteId = event.target.parentNode.parentNode.parentNode.id;
		setDeleteEvent(!deleteEvent);
		setIdToDelete(deleteId);
	};

	if (deckList) {
		return (
			<React.Fragment>
				<Link
					to="/decks/new"
					type="button"
					className="btn btn-secondary"
				>
					Create Deck
				</Link>
				<DeckList deckList={deckList} deleteHandler={deleteHandler} />
			</React.Fragment>
		);
	}
}
