import React from "react";
//---------components
import Deck from "./Deck";
//-------------------

export default function DeckList({ deckList,deleteHandler }) {
	const renderDeckList = deckList.map((deck, index) => (
		<Deck key={deck.id} deck={deck} deleteHandler={deleteHandler}/>
	));
	return <React.Fragment>{renderDeckList}</React.Fragment>;
}
