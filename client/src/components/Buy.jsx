import { parseEther } from "ethers";
const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);
  const amount = { value: parseEther("0.001") };
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
    // console.log("Transaction is done");
    alert("Transaction is done");
    window.location.reload();
  };
  return (
    <>
      <div className="buy-card">
        {/* <div className="buy-form-heading" style={{fontSize:'25px',textAlign:'center',fontWeight:'bolder',color:'gray'}}>Thanks for the Tip!</div> */}
        <form onSubmit={buyChai}>
          <div className="buy-form-group">
            <label className="buy-form-label" htmlFor="name" style={{fontSize:'25px',textAlign:'center'}}>Name</label>
            <input
              type="text"
              className="buy-form-input"
              id="name"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="buy-form-group">
            <label className="buy-form-label" htmlFor="message" style={{fontSize:'25px'}}>Message</label>
            <input
              type="text"
              className="buy-form-input"
              id="message"
              placeholder="Enter Your Message"
              required
            />
          </div>
          <button
            type="submit"
            className="buy-btn"
            disabled={!state.contract}
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
};
export default Buy;