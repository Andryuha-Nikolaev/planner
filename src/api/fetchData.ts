import { notFound } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchData = async <T>(
	endpoint: string,
	options: RequestInit = {},
	token?: string | null
): Promise<T> => {
	try {
		if (!baseUrl) {
			throw new Error("Base URL is not defined");
		}

		const url = `${baseUrl}${endpoint}`;

		const baseOptions: RequestInit = {
			next: {
				revalidate: 10,
			},
		};

		const authOptions: RequestInit = {
			headers: token ? { Authorization: `Bearer ${token}` } : {},
		};

		const finalOptions: RequestInit = {
			...baseOptions,
			...authOptions,
			...options,
			headers: {
				...baseOptions.headers,
				...authOptions.headers,
				...options.headers,
			},
		};

		const response = await fetch(url, finalOptions);

		if (!response.ok) {
			switch (response.status) {
				case 404:
					notFound();
					break;
				case 401:
					return null as T;
				// case 500:
				//   throw new Error("Internal server error");
				default:
					throw new Error(`Error! status: ${response.status}`);
			}
		}

		const data = await response.json();
		return data as T;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};
