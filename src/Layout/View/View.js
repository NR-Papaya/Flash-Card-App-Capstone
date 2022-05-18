import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api/index";
//---------Components
import ViewCards from "./ViewCards";
//-------------------

export default function View() {
	const [currentDeck, setCurrentDeck] = useState(null);
	const history = useHistory();
	const { deckId } = useParams();

	useEffect(() => {
		const abortController = new AbortController();

		const getDeck = async () => {
			try {
				const data = await readDeck(deckId, abortController.signal);
				setCurrentDeck(data);
			} catch (error) {
				console.log(error.message);
			}
		};
		getDeck();
		return () => abortController.abort();
	}, [deckId]);


	const deleteHandler = async (event) => {
		if (window.confirm("Delete this deck?")) {
			const abortController = new AbortController();
			try {
				await deleteDeck(deckId, abortController.signal);
				history.push("/")
			} catch (error) {
				console.log(error.message);
			}
		}
	};
	const deleteHandlerCards = async (event)=>{
		const cardDeleteId = event.target.id
		if (window.confirm("Delete this card?")){
			const abortController = new AbortController()
			try{
				await deleteCard(cardDeleteId,abortController.signal)
				history.push(`/decks/${currentDeck.id}`)
			}
			catch(error){console.log(error.message)}
		}
	}

	if (currentDeck) {
		const returnableCardsList = currentDeck.cards.map((card, index) => (
			<ViewCards card={card} key={index} deleteHandlerCards={deleteHandlerCards}/>
		));
		return (
			<React.Fragment>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li
							className="breadcrumb-item active"
							aria-current="page"
						>
							{currentDeck.name}
						</li>
					</ol>
				</nav>
				<h4>{currentDeck.name}</h4>
				<p>{currentDeck.description}</p>
				<div
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<div>
						<Link
							to={`/decks/${currentDeck.id}/edit`}
							className="btn btn-secondary"
							style={{ margin: "0 10px 0 0" }}
						>
							Edit
						</Link>
						<Link
							to={`/decks/${currentDeck.id}/study`}
							className="btn btn-primary"
							style={{ margin: "0 10px 0 0" }}
						>
							Study
						</Link>
						<Link
							to={`/decks/${currentDeck.id}/cards/new`}
							className="btn btn-primary"
							style={{ margin: "0 10px 0 0" }}
						>
							Add Cards
						</Link>
					</div>
					<button
						type="delete"
						onClick={deleteHandler}
						className="btn btn-danger"
						style={{ margin: "0 10px 0 0" }}
					>
						Delete
					</button>
				</div>
				<br />
				<h1>Cards</h1>
				{returnableCardsList}
			</React.Fragment>
		);
	} else {
		return null;
	}
}
