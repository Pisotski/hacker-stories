// How to handle touch event and click event without one interrupting another

const PreventTouchEnd = () => {
	const handleClick = (): void => {
		console.log("click");
	};

	const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>): void => {
		console.log("touchend");

		e.preventDefault();
	};

	return (
		<button type="button" onClick={handleClick} onTouchEnd={handleTouchEnd}>
			Click Me
		</button>
	);
};

export { PreventTouchEnd };
