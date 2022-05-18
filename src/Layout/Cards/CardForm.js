import React from "react";
import { Link } from "react-router-dom";

export default function CardForm({
	submitHandler,
	card,
	onChangeHandler,
	deckId,
	type
}) {
	const cardFormInputs = (
		<form onSubmit={submitHandler}>
			<div className="form-group">
				<label htmlFor="front">
					<h6>Front</h6>
				</label>
				<textarea
					className="form-control"
					id="front"
					rows="3"
					value={card.front}
					name="front"
					onChange={onChangeHandler}
					required
				></textarea>
			</div>
			<div className="form-group">
				<label htmlFor="back">
					<h6>Back</h6>
				</label>
				<textarea
					className="form-control"
					id="back"
					rows="3"
					value={card.back}
					name="back"
					onChange={onChangeHandler}
					required
				></textarea>
			</div>
			<div style={{ display: "flex" }}>
				<Link
					to={`/decks/${deckId}`}
					className="btn btn-secondary"
					style={{ margin: "0 10px 0 0" }}
				>
					Cancel
				</Link>
				<button
					type="submit"
					className="btn btn-primary"
					style={{ margin: "0 10px 0 0" }}
				>
					{type}
				</button>
			</div>
		</form>
	);

	return <React.Fragment>{cardFormInputs}</React.Fragment>;
}
