export const PAGE = {
  NUMBER: 1,
  SIZE: 10,
};

export const getInitials = (name: string = ""): string | undefined => {
  const parts = name.trim().split(" ");
  if(parts.length === 1) {
    return parts[0][0]?.toUpperCase() || "";
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
