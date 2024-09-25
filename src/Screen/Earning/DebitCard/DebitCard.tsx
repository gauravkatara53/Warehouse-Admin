export default function DBCard() {
  return (
    <>
      <div className="w-90 sm:w-98 h-48 sm:h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-md ">
        <img
          className="relative object-cover w-full h-full rounded-xl"
          src="https://i.imgur.com/kGkSg1v.png"
        />

        <div className="w-full px-6 sm:px-8 absolute top-4 sm:top-8">
          <div className="flex justify-between">
            <div>
              <p className="font-light text-xs sm:text-sm">Name</p>
              <p className="font-medium tracking-widest text-sm sm:text-lg">
                Rajesh
              </p>
            </div>
            <img
              className="w-10 h-10 sm:w-14 sm:h-14"
              src="https://i.imgur.com/bbPHJVe.png"
            />
          </div>
          <div className="pt-1">
            <p className="font-light text-xs sm:text-sm">Card Number</p>
            <p className="font-medium tracking-more-wider text-sm sm:text-lg">
              4642 3489 9867 7632
            </p>
          </div>
          <div className="pt-4 sm:pt-6 pr-4 sm:pr-6">
            <div className="flex justify-between">
              <div>
                <p className="font-light text-xs">Valid</p>
                <p className="font-medium tracking-wider text-sm">11/15</p>
              </div>
              <div>
                <p className="font-light text-xs">Expiry</p>
                <p className="font-medium tracking-wider text-sm">03/25</p>
              </div>
              <div>
                <p className="font-light text-xs">CVV</p>
                <p className="font-bold tracking-more-wider text-sm">···</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
