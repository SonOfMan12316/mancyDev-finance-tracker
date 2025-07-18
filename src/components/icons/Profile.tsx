const Profile = ({ ...props }) => {
  return (
    <svg
      width={20}
      height={22}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.103 10.786a4.893 4.893 0 100-9.786 4.893 4.893 0 000 9.786z"
        stroke="currentColor"
        strokeWidth={1.76959}
      />
      <path
        d="M14.997 12.742h.344a2.936 2.936 0 012.913 2.572l.382 3.057a1.956 1.956 0 01-1.942 2.2H3.514a1.958 1.958 0 01-1.942-2.2l.381-3.057a2.936 2.936 0 012.915-2.572h.343"
        stroke="currentColor"
        strokeWidth={1.76959}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Profile;
