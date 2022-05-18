import React, { useState, useEffect } from "react";
import { readDeck } from "../../utils/api";
import { Link, useParams } from "react-router-dom";
//---------components
import StudyCardList from "./StudyCardList";
//-------------------

export default function Study() {
	const [currentDeck, setCurrentDeck] = useState(null);
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

	return (
		<React.Fragment>
			{currentDeck ? (
				<React.Fragment>
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to="/">Home</Link>
							</li>
							<li className="breadcrumb-item">
								<Link to={`/decks/${currentDeck.id}/`}>
									{currentDeck.name}
								</Link>
							</li>
							<li
								className="breadcrumb-item active"
								aria-current="page"
							>
								Study
							</li>
						</ol>
					</nav>
					<h1>Study: {currentDeck.name}</h1>
					<StudyCardList currentDeck={currentDeck} />
				</React.Fragment>
			) : null}
		</React.Fragment>
	);
}
