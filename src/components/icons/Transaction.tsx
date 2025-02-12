const Transaction = ({ color = "currentColor", ...props }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      {...props}
    >
      <path
        d="M8.09282 13.2129C8.14967 13.3499 8.1646 13.5007 8.13573 13.6462C8.10686 13.7917 8.03549 13.9254 7.93063 14.0304L4.93063 17.0304C4.86098 17.1001 4.77826 17.1554 4.68721 17.1932C4.59616 17.2309 4.49857 17.2503 4.40001 17.2503C4.30144 17.2503 4.20385 17.2309 4.1128 17.1932C4.02175 17.1554 3.93903 17.1001 3.86938 17.0304L0.86938 14.0304C0.764371 13.9255 0.692846 13.7918 0.663858 13.6462C0.63487 13.5007 0.649723 13.3498 0.706538 13.2126C0.763352 13.0755 0.859573 12.9583 0.983018 12.8759C1.10646 12.7935 1.25158 12.7496 1.4 12.7497H3.65001L3.65001 1.49974C3.65001 1.30082 3.72902 1.11006 3.86968 0.969406C4.01033 0.828753 4.20109 0.749736 4.40001 0.749736C4.59892 0.749736 4.78968 0.828753 4.93034 0.969406C5.07099 1.11006 5.15001 1.30082 5.15001 1.49974L5.15001 12.7497L7.40001 12.7497C7.54834 12.7498 7.69334 12.7938 7.81665 12.8762C7.93997 12.9587 8.03608 13.0758 8.09282 13.2129ZM16.9306 3.96911L13.9306 0.969111C13.861 0.899378 13.7783 0.844059 13.6872 0.806316C13.5962 0.768573 13.4986 0.749146 13.4 0.749146C13.3014 0.749146 13.2038 0.768573 13.1128 0.806316C13.0218 0.844059 12.939 0.899378 12.8694 0.969111L9.86938 3.96911C9.76437 4.074 9.69285 4.20769 9.66386 4.35326C9.63487 4.49882 9.64972 4.64971 9.70654 4.78683C9.76335 4.92395 9.85957 5.04112 9.98302 5.12353C10.1065 5.20593 10.2516 5.24985 10.4 5.24974H12.65L12.65 16.4997C12.65 16.6986 12.729 16.8894 12.8697 17.0301C13.0103 17.1707 13.2011 17.2497 13.4 17.2497C13.5989 17.2497 13.7897 17.1707 13.9303 17.0301C14.071 16.8894 14.15 16.6986 14.15 16.4997L14.15 5.24974L16.4 5.24974C16.5484 5.24985 16.6935 5.20593 16.817 5.12353C16.9404 5.04112 17.0367 4.92395 17.0935 4.78683C17.1503 4.64971 17.1651 4.49882 17.1362 4.35326C17.1072 4.20769 17.0356 4.074 16.9306 3.96911Z"
        fill="#B3B3B3"
      />
    </svg>
  );
};

export default Transaction;
