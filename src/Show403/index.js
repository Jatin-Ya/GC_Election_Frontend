import AkshayGIF from "../assets/akshay-kumar-meme.gif";
const Show403 = () => {
  return (
    <div>
      <br />
      <h3>You have already Voted</h3>
      <br />
      <img
        src={AkshayGIF}
        alt="already voted"
        style={{ width: "min(500px, 100%)" }}
      />
    </div>
  );
};

export default Show403;
