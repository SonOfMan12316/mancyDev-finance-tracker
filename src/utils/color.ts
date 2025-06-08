export const tailwindToHex = (tailwindColor: string): string => {
  const colorMap: Record<string, string> = {
    "ch-beige": "#F8F4F0",
    "ch-green": "#277C78",
    "ch-cyan": "#82C9D7",
    "ch-purple": "#826CB0",
    "ch-red": "#C94736",
    "ch-grey": "#696868",
    "ch-navy": "#626070",
    "ch-yellow": "#F2CDAC",
    "ch-magenta": "#934F6F",
    "ch-torquoise": "#597C7C",
    "ch-brown": "#93674C",
    "ch-blue": "#3F82B2",
    "ch-black": "#000000",
    "ch-modal": "#000000b3",
  };

  return colorMap[tailwindColor] || "#F8F4F0";
};
