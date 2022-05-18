import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
//------Components
import DeckList from "./DeckList";
//----------------

export default function Home() {
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

	const deleteHandler = async (event) => {
		const deleteId = event.target.parentNode.parentNode.parentNode.id;
		if(window.confirm("Delete this deck?")){
			const abortController = new AbortController();
			try {
				await deleteDeck(deleteId, abortController.signal);
				const data = await listDecks(abortController.signal);
				setDeckList([...data]);
			} catch (error) {
				console.log(error.message);
			}
		}
			
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
