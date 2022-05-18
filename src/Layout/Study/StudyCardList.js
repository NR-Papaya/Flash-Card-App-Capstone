import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
//----------components
import StudyCard from "../Study/StudyCard";
//--------------------

export default function Cards({ currentDeck }) {
	const cardList = currentDeck.cards;
	const [indexCount, setIndexCount] = useState(0);
	const [cardFaceFront, setCardFaceFront] = useState(true);

	const cardFaceHandler = () => {
		setCardFaceFront(!cardFaceFront);
	};

	const history = useHistory();
	//index counter is used to control which card in the array is shown and it resets the face to front when moving to the next card in the array
	const indexCountHandler = () => {
		if (indexCount === cardList.length - 1) {
			if (
				window.confirm(
					"Restart Cards? \n\nClick `Cancel` to return to the home page."
				)
			) {
				setCardFaceFront(!cardFaceFront);
				setIndexCount(0);
			} else {
				history.push("/");
			}
		} else {
			setCardFaceFront(!cardFaceFront);
			setIndexCount(indexCount + 1);
		}
	};
	//cardlistfront/back gennerate an array of card components to alternate between using the cardFaceFront state and display buttons accordingly
	const cardListFront = cardList.map((card, index) => (
		<StudyCard
			key={card.id}
			cardNum={index + 1}
			face={cardFaceFront}
			content={card.front}
			cardCount={cardList.length}
			flipHandler={cardFaceHandler}
		/>
	));
	const cardListBack = cardList.map((card, index) => (
		<StudyCard
			key={card.id}
			cardNum={index + 1}
			face={cardFaceFront}
			content={card.back}
			cardCount={cardList.length}
			flipHandler={cardFaceHandler}
			nextHandler={indexCountHandler}
		/>
	));
	if (cardList.length < 3) {
		return (
			<React.Fragment>
				<h3>Not enough cards.</h3>
				<p>
					You need at least 3 cards to study. There are{" "}
					{cardList.length} cards in this deck.
				</p>
				<Link
					to={`/decks/${currentDeck.id}/cards/new`}
					className="btn btn-primary"
				>
					Add Cards
				</Link>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				{cardFaceFront
					? cardListFront[indexCount]
					: cardListBack[indexCount]}
			</React.Fragment>
		);
	}
}
