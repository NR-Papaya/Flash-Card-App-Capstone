import React from "react";

export default function StudyCard({
	content,
	cardNum,
	cardCount,
	flipHandler,
	nextHandler,
	face
}) {
	return (
		<div className="card w-75">
			<div className="card-body">
				<h5 className="card-title">
					Card {cardNum} of {cardCount}
				</h5>
				<p className="card-text">{content}</p>
				{face ? (
					<button className="btn btn-secondary" onClick={flipHandler}>
						Flip
					</button>
				) : (
					<React.Fragment>
						<button
							className="btn btn-secondary"
							onClick={flipHandler}
						>
							Flip
						</button>
						<button
							className="btn btn-primary"
							onClick={nextHandler}
						>
							Next
						</button>
					</React.Fragment>
				)}
			</div>
		</div>
	);
}
