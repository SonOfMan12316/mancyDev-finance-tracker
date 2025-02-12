const Home = ({ color = "currentColor", ...props }) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      {...props}
    >
      <path
        d="M18.3 8.83256L18.3 17.4997C18.3 17.8976 18.142 18.2791 17.8607 18.5604C17.5794 18.8417 17.1979 18.9997 16.8 18.9997H13.05C12.6522 18.9997 12.2707 18.8417 11.9894 18.5604C11.7081 18.2791 11.55 17.8976 11.55 17.4997L11.55 13.7497C11.55 13.5508 11.471 13.3601 11.3304 13.2194C11.1897 13.0788 10.999 12.9997 10.8 12.9997H7.80005C7.60114 12.9997 7.41037 13.0788 7.26972 13.2194C7.12907 13.3601 7.05005 13.5508 7.05005 13.7497L7.05005 17.4997C7.05005 17.8976 6.89201 18.2791 6.61071 18.5604C6.3294 18.8417 5.94787 18.9997 5.55005 18.9997H1.80005C1.40222 18.9997 1.02069 18.8417 0.739389 18.5604C0.458084 18.2791 0.300049 17.8976 0.300049 17.4997L0.300049 8.83256C0.300017 8.62496 0.343079 8.41961 0.42651 8.22951C0.50994 8.03942 0.631922 7.86871 0.784736 7.72819L8.28474 0.651936L8.29505 0.641623C8.57118 0.390498 8.93102 0.251343 9.30427 0.251343C9.67751 0.251343 10.0374 0.390498 10.3135 0.641623C10.3167 0.645292 10.3201 0.648737 10.3238 0.651936L17.8238 7.72819C17.9751 7.86945 18.0955 8.04049 18.1775 8.23055C18.2594 8.42061 18.3012 8.62558 18.3 8.83256Z"
        fill="#B3B3B3"
      />
    </svg>
  );
};

export default Home;
