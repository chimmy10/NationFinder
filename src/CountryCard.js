import { useDispatch, useSelector } from "react-redux";
import { clickCountry } from "./Slice";

function CountryCard({ data }) {
	const dispatch = useDispatch();
	const isDarkMode = useSelector((state) => state.country.isDarkMode); // Access dark mode state

	const handleClick = () => {
		dispatch(clickCountry(data));
	};

	return (
		<div className="transition-all animate-fade-in">
			<button
				onClick={handleClick}
				className={`max-w-xs sm:max-w-lg w-full rounded-lg text-center overflow-hidden shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-2xl ${
					isDarkMode
						? "bg-gray-800 hover:bg-gray-700 text-gray-300"
						: "bg-white hover:bg-gray-100 text-black"
				}`}
			>
				{/* Flag Section */}
				<div className="relative w-full h-full transition-all ">
					<img
						className="h-48 transition-all w-96 sm:w-full"
						src={data.flags.png}
						alt={`${data.name} flag`}
					/>
				</div>

				{/* Country Details */}
				<div
					className={`px-7 pt-4 pb-10 text-left transition-colors duration-200 ease-in-out ${
						isDarkMode ? "text-gray-300" : "text-black"
					}`}
				>
					<h2
						className={`text-xl font-bold mb-2 transition-colors duration-200 ease-in-out ${
							isDarkMode ? "text-gray-100" : "text-gray-950"
						}`}
					>
						{data.name}
					</h2>
					<p className="text-base font-medium">
						Population:{" "}
						<span
							className={`font-normal transition-colors duration-200 ease-in-out ${
								isDarkMode ? "text-gray-400" : "text-gray-500"
							}`}
						>
							{data.population === 0
								? "No data found"
								: data.population.toLocaleString()}
						</span>
					</p>
					<p className="text-base font-medium">
						Region:{" "}
						<span
							className={`font-normal transition-colors duration-200 ease-in-out ${
								isDarkMode ? "text-gray-400" : "text-gray-500"
							}`}
						>
							{data.region}
						</span>
					</p>
					<p className="text-base font-medium">
						Capital:{" "}
						<span
							className={`font-normal transition-colors duration-200 ease-in-out ${
								isDarkMode ? "text-gray-400" : "text-gray-500"
							}`}
						>
							{data.capital || "none"}
						</span>
					</p>
				</div>
			</button>
		</div>
	);
}

export default CountryCard;
