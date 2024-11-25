import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setSearchTerm, setRegion, search } from "./Slice";
import CountryCard from "./CountryCard";
import CountryDetail from "./CountryDetail";

function App() {
	const searchTerm = useSelector((state) => state.country.searchTerm);
	const countries = useSelector((state) => state.country.countries);
	const regions = useSelector((state) => state.country.regions);
	const selected = useSelector((state) => state.country.selected);
	const isDarkMode = useSelector((state) => state.country.isDarkMode);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(search());
	}, [dispatch]);

	useEffect(() => {
		if (selected) {
			window.scrollTo(0, 0);
		}
	}, [selected]);

	const filteredCountries = countries.filter((country) => {
		const matchesSearchTerm = country.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesRegion =
			regions === "Filter by Region" || country.region === regions;

		return matchesSearchTerm && matchesRegion;
	});

	return (
		<div
			className={`min-h-screen transition-all duration-200 ease-in-out ${
				isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
			}`}
		>
			<div
				className={`${
					isDarkMode ? "bg-gray-800" : "bg-gray-100"
				} flex items-center justify-between sm:items-center md:items-center lg:items-center shadow-md py-8 px-5 fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-in-out`}
			>
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="font-bold text-md sm:text-lg md:text-xl lg:text-2xl"
				>
					Where in the world?
				</button>
				<button
					className="flex space-x-2 text-sm font-medium"
					onClick={() => dispatch(toggleTheme())}
				>
					{isDarkMode ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="white"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
							/>
						</svg>
					)}

					<p>{!isDarkMode ? "Light Mode" : "Dark Mode"}</p>
				</button>
			</div>

			<div className="pt-24">
				{!selected && (
					<div className="md:flex md:items-center md:justify-between">
						<div className="relative w-full p-6 md:max-w-xl">
							<input
								id="example"
								type="text"
								placeholder="Search for a country..."
								className={`w-full py-4 italic placeholder-gray-400 transition-all duration-200 ease-in-out border rounded-lg shadow-lg pl-14 focus:outline-none ${
									isDarkMode
										? "bg-gray-800 text-white border-gray-600 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300"
										: "bg-white text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
								}`}
								value={searchTerm}
								onChange={(e) => dispatch(setSearchTerm(e.target.value))}
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="absolute w-5 h-5 text-gray-500 transition-all duration-200 ease-in-out transform -translate-y-1/2 left-12 top-1/2 group-hover:text-blue-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
								/>
							</svg>
						</div>

						<div className="relative px-6 py-4 max-w-72">
							<select
								id="region"
								className={`w-full px-4 py-4 pr-8 transition-all duration-200 ease-in-out border rounded-lg shadow-sm appearance-none focus:outline-none ${
									isDarkMode
										? "bg-gray-800 text-white border-gray-600 focus:ring-blue-300 focus:border-blue-300"
										: "bg-white text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
								}`}
								value={regions}
								onChange={(e) => dispatch(setRegion(e.target.value))}
							>
								<option>Filter by Region</option>
								<option value="Africa">Africa</option>
								<option value="Americas">Americas</option>
								<option value="Asia">Asia</option>
								<option value="Europe">Europe</option>
								<option value="Oceania">Oceania</option>
							</select>
						</div>
					</div>
				)}

				{!selected ? (
					<div className="flex flex-col items-center justify-center gap-12 pb-10 sm:grid sm:grid-cols-2 sm:gap-4 md:gap-10 sm:px-5 lg:grid-cols-3 xl:grid-cols-4">
						{filteredCountries.map((country, index) => (
							<CountryCard key={index} data={country} />
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center gap-12 lg:mx-auto lg:max-w-6xl lg:flex lg:flex-row">
						<CountryDetail country={selected} />
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
