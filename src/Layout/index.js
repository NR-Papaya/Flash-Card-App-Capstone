import React from "react";
import { Route, Switch } from "react-router-dom";
//----------components
import Header from "./Header";
import NotFound from "./NotFound";
import EditCard from "./Cards/EditCard";
import NewCard from "./Cards/NewCard";
import Edit from "./Edit/Edit";
import Home from "./Home/Home";
import NewDeck from "./NewDeck/NewDeck";
import Study from "./Study/Study";
import View from "./View/View";
//----------

function Layout() {

		return (
			<>
				<Header />
				<div className="container">
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/decks/:deckId">
							<View />
						</Route>
						<Route path="/decks/new">
							<NewDeck/>
						</Route>
						<Route path="/decks/:deckId/study">
							<Study />
						</Route>
						<Route path="/decks/:deckId/edit">
							<Edit />
						</Route>
						<Route path="/decks/:deckId/cards/new">
							<NewCard />
						</Route>
						<Route path="/decks/:deckId/cards/:cardId/edit">
							<EditCard />
						</Route>
						<Route>
							<NotFound />
						</Route>
					</Switch>
				</div>
			</>
		);
}

export default Layout;
