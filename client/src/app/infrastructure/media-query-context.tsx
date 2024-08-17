import React, { createContext, useContext, ReactNode } from "react";
import { useMediaQuery } from "@mui/material";

interface MediaQueryContextType {
	xs: boolean;
	sm: boolean;
	md: boolean;
	lg: boolean;
	xl: boolean;
	screenSize: "xs" | "sm" | "md" | "lg" | "xl";
}

const MediaQueryContext = createContext<MediaQueryContextType | undefined>(
	undefined
);

interface MediaQueryProviderProps {
	children: ReactNode;
}

export const MediaQueryProvider: React.FC<MediaQueryProviderProps> = ({
	children,
}) => {
	const xs = useMediaQuery("(max-width:599px)");
	const sm = useMediaQuery("(min-width:600px) and (max-width:899px)");
	const md = useMediaQuery("(min-width:900px) and (max-width:1199px)");
	const lg = useMediaQuery("(min-width:1200px) and (max-width:1535px)");
	const xl = useMediaQuery("(min-width:1536px)");

	let screenSize: "xs" | "sm" | "md" | "lg" | "xl";
	if (xl) {
		screenSize = "xl";
	} else if (lg) {
		screenSize = "lg";
	} else if (md) {
		screenSize = "md";
	} else if (sm) {
		screenSize = "sm";
	} else {
		screenSize = "xs";
	}

	return (
		<MediaQueryContext.Provider
			value={{
				xs,
				sm,
				md,
				lg,
				xl,
				screenSize,
			}}
		>
			{children}
		</MediaQueryContext.Provider>
	);
};

export const useMediaQueryContext = (): MediaQueryContextType => {
	const context = useContext(MediaQueryContext);
	if (!context) {
		throw new Error(
			"useMediaQueryContext must be used within a MediaQueryProvider"
		);
	}
	return context;
};
