import FinishedGIF from "../assets/tata-bye-bye-rahul-gandhi-funny-meme.gif";

const Finished = () => {
  return(
    <>
    <div>
      <br />
      <h3>Voting is Finished</h3>
      <br />
      <img
        src={FinishedGIF}
        alt="Voting is Finished"
        style={{ width: "min(500px, 100%)" }}
      />
    </div>
    </>
  )
}

export default Finished;