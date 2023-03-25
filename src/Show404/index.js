import DontBelong from "../assets/you-dont-belong-here-clint-collins.gif";

const Show404 = () => {
  return (
    <div>
      <br />
      <h3>User not in this School</h3>
      <br />
      <img
        src={DontBelong}
        alt="not this hostel"
        style={{ width: "min(500px, 100%)" }}
      />
    </div>
  );
};

export default Show404;
