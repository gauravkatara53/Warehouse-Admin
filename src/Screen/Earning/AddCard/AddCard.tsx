import CustomButton from "@/Components/Common/button"; // Assuming you have this component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // For using FontAwesome icons
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"; // For the pencil icon
import { faCcVisa } from "@fortawesome/free-brands-svg-icons"; // For Visa icon
import MastercardIcon from "@/assets/mastercard.svg"; // Adjust the path according to your structure

export default function AddCard() {
  return (
    <div className="p-4">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-md font-medium">Payment Method</h2>
        <CustomButton className="text-sm  -ml-1 -mt-2">
          ADD A NEW CARD
        </CustomButton>
      </div>

      {/* Saved Cards Section */}
      <div className="mt-4 space-y-4">
        {/* Mastercard */}
        <div className="flex justify-between items-center border rounded-md p-4">
          <div className="flex items-center">
            <img
              src={MastercardIcon} // Use the imported SVG for Mastercard
              alt="Mastercard"
              className="h-8 w-auto mr-4 text-red-600" // Set height and auto width
            />
            <div>
              <p className="text-sm text-gray-600">**** **** **** 1234</p>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="text-gray-600 cursor-pointer"
          />
        </div>

        {/* Visa Card */}
        <div className="flex justify-between items-center border rounded-md p-4">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faCcVisa}
              className="text-3xl mr-4 text-blue-600" // Keep blue color
            />
            <div>
              <p className="text-sm text-gray-600">**** **** **** 5678</p>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="text-gray-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
