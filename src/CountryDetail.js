import { useDispatch, useSelector } from "react-redux";
import { goBack } from "./Slice";

function CountryDetail({ country }) {
	const dispatch = useDispatch();
	const isDarkMode = useSelector((state) => state.country.isDarkMode); // Get dark mode state

	return (
		<div
			className={`py-10 px-7 transition-colors duration-500 animate-fade-in ${
				isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-900"
			}`}
		>
			<button
				onClick={() => dispatch(goBack())}
				className={`flex items-center justify-center px-6 py-2 space-x-2 border-2 rounded-md shadow-md focus:outline-none focus:ring-2 transition-colors duration-500 ${
					isDarkMode
						? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
						: "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
				}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
					/>
				</svg>
				<p className="text-base font-semibold">Back</p>
			</button>

			<div className="flex flex-col items-center w-full max-w-md mt-14 lg:max-w-6xl lg:flex lg:flex-row lg:items-center lg:justify-around lg:gap-16">
				<div className="relative w-full h-56 overflow-hidden lg:h-80">
					<img
						className="object-cover w-full h-full lg:object-contain"
						src={country?.flags?.svg || "fallback-image.svg"}
						alt={`${country?.name || "Unknown"} flag`}
					/>
				</div>

				<div className="w-full pt-10">
					<div className="lg:flex lg:items-center lg:justify-between lg:pb-10">
						<div>
							<h2
								className={`mb-2 text-2xl font-bold transition-colors duration-500 ${
									isDarkMode ? "text-gray-100" : "text-gray-900"
								}`}
							>
								{country?.name || "Unknown"}
							</h2>
							{[
								{ label: "Native Name", value: country?.nativeName },
								{
									label: "Population",
									value: country?.population?.toLocaleString(),
								},
								{ label: "Region", value: country?.region },
								{ label: "Sub Region", value: country?.subregion },
								{ label: "Capital", value: country?.capital },
							].map(({ label, value }) => (
								<p
									key={label}
									className={`text-base font-medium transition-colors duration-500 ${
										isDarkMode ? "text-gray-300" : "text-black"
									}`}
								>
									{label}:{" "}
									<span
										className={`font-normal transition-colors duration-500 ${
											isDarkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										{value || "Unknown"}
									</span>
								</p>
							))}
						</div>

						<div className="my-10">
							{[
								{
									label: "Top Level Domain",
									value: country?.topLevelDomain?.[0],
								},
								{ label: "Currencies", value: country?.currencies?.[0]?.name },
								{
									label: "Languages",
									value: country?.languages
										?.map((language) => language?.name)
										.join(", "),
								},
							].map(({ label, value }) => (
								<p
									key={label}
									className={`text-base font-medium transition-colors duration-500 ${
										isDarkMode ? "text-gray-300" : "text-black"
									}`}
								>
									{label}:{" "}
									<span
										className={`font-normal transition-colors duration-500 ${
											isDarkMode ? "text-gray-400" : "text-gray-500"
										}`}
									>
										{value || "Unknown"}
									</span>
								</p>
							))}
						</div>
					</div>

					{country?.borders?.length > 0 && (
						<div className="lg:flex lg:gap-5">
							<div>
								<p className="w-32 font-medium text-md">Border Countries:</p>
							</div>
							<div className="grid grid-cols-4 gap-2">
								{country.borders.map((border) => (
									<div
										key={border}
										className={`px-5 py-1 text-sm font-normal border rounded-md transition-colors duration-500 ${
											isDarkMode
												? "text-gray-300 border-gray-600"
												: "text-gray-700 border-gray-300"
										}`}
									>
										{border || "Data not found"}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CountryDetail;
