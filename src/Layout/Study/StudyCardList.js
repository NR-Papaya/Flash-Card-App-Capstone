import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//----------components
import StudyCard from "../Study/StudyCard"
//--------------------

export default function Cards({ currentDeck }) {
	const [cardList, setCardList] = useState(currentDeck.cards);
	const [indexCount, setIndexCount] = useState(0);
	const [cardFaceFront, setCardFaceFront] = useState(true);

	const cardFaceHandler = () => {
		setCardFaceFront(!cardFaceFront);
	};
	
	const history = useHistory()
	
	const indexCountHandler = () => {
		if (indexCount === cardList.length - 1) {
			console.log("line 16 cards");
			if (window.confirm("Restart Cards?")) {
				setCardFaceFront(!cardFaceFront);
				setIndexCount(0);
			}else{history.push("/")}
		} else {
			setCardFaceFront(!cardFaceFront);
			setIndexCount(indexCount + 1);
		}
	};

	const cardListFront = cardList.map((card, index) => (
		<StudyCard
			card={card}
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
			card={card}
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
				<button className="btn btn-primary">Add Cards</button>
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