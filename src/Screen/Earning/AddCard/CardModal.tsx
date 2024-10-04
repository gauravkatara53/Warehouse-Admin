import { ChangeEvent } from "react";
import CustomButton from "@/Components/Common/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface CardModalProps {
  isEditing: boolean;
  newCard: { number: string; expiry: string; cvv: string; name: string };
  cvvMasked: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAddCard: () => void;
  toggleModal: () => void;
}

export default function CardModal({
  isEditing,
  newCard,
  cvvMasked,
  handleInputChange,
  handleAddCard,
  toggleModal,
}: CardModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {isEditing ? "Edit Card" : "Add Card"}
          </h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer"
            onClick={toggleModal}
          />
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="text-sm font-medium">
              Card Number
            </label>
            <input
              type="text"
              name="number"
              maxLength={16}
              value={newCard.number}
              onChange={handleInputChange}
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter 16-digit card number"
            />
          </div>

          <div className="flex space-x-4">
            <div>
              <label htmlFor="expiry" className="text-sm font-medium">
                Expiry (MM/YY)
              </label>
              <input
                type="text"
                name="expiry"
                value={newCard.expiry}
                onChange={handleInputChange}
                className="w-full border rounded p-2 mt-1"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div>
              <label htmlFor="cvv" className="text-sm font-medium">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={cvvMasked}
                onChange={handleInputChange}
                className="w-full border rounded p-2 mt-1"
                maxLength={3}
                placeholder="CVV"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cardHolderName" className="text-sm font-medium">
              Cardholder Name
            </label>
            <input
              type="text"
              name="name"
              value={newCard.name}
              onChange={handleInputChange}
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter cardholder's name"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <CustomButton
              onClick={handleAddCard}
              className="text-white bg-[#9F8EF2] hover:bg-[#aa9ee9]"
            >
              {isEditing ? "Update Card" : "Add Card"}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
