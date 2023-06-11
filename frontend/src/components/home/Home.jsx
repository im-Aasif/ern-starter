import { useDispatch, useSelector } from "react-redux";
import { changeByAmt, decrement, increment } from "../../common/store/slices";

function Home() {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();
	return (
		<>
			<h1>Home</h1>
			<div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignContent: "space-between",
						alignItems: "flex-start",
						gap: "10px",
						padding: "10px",
					}}
				>
					<button
						aria-label="Increment value"
						onClick={() => dispatch(increment())}
					>
						Increment
					</button>

					<button
						aria-label="Decrement value"
						onClick={() => dispatch(decrement())}
					>
						Decrement
					</button>
					<button
						aria-label="Change value"
						onClick={() => dispatch(changeByAmt(5))}
					>
						Change by 5
					</button>
					<button
						aria-label="Change value"
						onClick={() => dispatch(changeByAmt(-5))}
					>
						Change by -5
					</button>
					<span>{count}</span>
				</div>
			</div>
		</>
	);
}
export default Home;
