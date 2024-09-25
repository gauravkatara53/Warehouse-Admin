import { useState, ChangeEvent, useEffect } from "react";
import CustomButton from "@/Components/Common/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons";
import MastercardIcon from "@/assets/mastercard.svg";

export default function AddCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // To track if we are editing an existing card
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index of the card being edited
  const [cards, setCards] = useState([
    {
      type: "mastercard",
      number: "**** **** **** 1234",
      expiry: "05/23",
      cvv: "123",
      name: "John Doe",
    },
    {
      type: "visa",
      number: "**** **** **** 5678",
      expiry: "09/24",
      cvv: "456",
      name: "Jane Smith",
    },
  ]);
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const [cvvMasked, setCvvMasked] = useState(""); // For showing masked CVV

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setNewCard({ number: "", expiry: "", cvv: "", name: "" }); // Reset fields on close
    setIsEditing(false); // Ensure the editing state is reset
    setEditIndex(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Expiry date auto-formatting (MM/YY)
    if (name === "expiry") {
      let expiryValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (expiryValue.length > 2) {
        expiryValue = `${expiryValue.slice(0, 2)}/${expiryValue.slice(2, 4)}`;
      }
      setNewCard({ ...newCard, expiry: expiryValue });
    }
    // For CVV input, limit to 3 digits
    else if (name === "cvv" && value.length <= 3) {
      setNewCard({ ...newCard, [name]: value });
    } else if (name !== "cvv") {
      setNewCard({ ...newCard, [name]: value });
    }
  };

  // Handle masking CVV after user types
  useEffect(() => {
    if (newCard.cvv) {
      setCvvMasked("*".repeat(newCard.cvv.length)); // Masking CVV as stars
    }
  }, [newCard.cvv]);

  const handleAddCard = () => {
    // Expiry validation (MM/YY and must be a future date)
    if (!validateExpiry(newCard.expiry)) {
      alert(
        "Invalid expiry date. Please use MM/YY format and make sure it's a future date."
      );
      return;
    }

    // Check if card number is 16 digits
    if (newCard.number.length === 16) {
      const randomCardType = Math.random() > 0.5 ? "visa" : "mastercard";
      const cardNumberMasked = `**** **** **** ${newCard.number.slice(-4)}`;

      if (isEditing && editIndex !== null) {
        // Update existing card
        const updatedCards = [...cards];
        updatedCards[editIndex] = {
          ...newCard,
          number: cardNumberMasked,
          type: randomCardType, // Randomly choose type for the purpose of this example
        };
        setCards(updatedCards);
      } else {
        // Add a new card
        setCards([
          ...cards,
          { ...newCard, number: cardNumberMasked, type: randomCardType },
        ]);
      }

      setIsModalOpen(false);
    } else {
      alert("Card number must be 16 digits");
    }
  };

  // Expiry validation function (MM/YY format and future date)
  const validateExpiry = (expiry: string) => {
    const [month, year] = expiry.split("/").map((val) => parseInt(val, 10));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the current year
    const currentMonth = currentDate.getMonth() + 1; // Get current month (0-indexed)

    // Check if month is valid and expiry date is in the future
    if (
      month >= 1 &&
      month <= 12 &&
      (year > currentYear || (year === currentYear && month >= currentMonth))
    ) {
      return true;
    }
    return false;
  };

  // Handle editing existing card
  const handleEditCard = (index: number) => {
    const cardToEdit = cards[index];
    setNewCard({
      number: `**** **** **** ${cardToEdit.number.slice(-4)}`, // Masked number
      expiry: cardToEdit.expiry,
      cvv: cardToEdit.cvv,
      name: cardToEdit.name,
    });
    setIsEditing(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-md font-medium">Payment Method</h2>
        <CustomButton onClick={toggleModal} className="text-sm -ml-1 -mt-2">
          ADD A NEW CARD
        </CustomButton>
      </div>

      {/* Saved Cards Section */}
      <div className="mt-4 space-y-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded-md p-4"
          >
            <div className="flex items-center">
              {card.type === "visa" ? (
                <FontAwesomeIcon
                  icon={faCcVisa}
                  className="text-3xl mr-4 text-blue-600"
                />
              ) : (
                <img
                  src={MastercardIcon}
                  alt="Mastercard"
                  className="h-8 w-auto mr-4"
                />
              )}
              <div>
                <p className="text-sm text-gray-600">{card.number}</p>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="text-gray-600 cursor-pointer"
              onClick={() => handleEditCard(index)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
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
              {/* Card Number Input */}
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

              {/* Expiry and CVV */}
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
                    maxLength={5} // Ensure MM/YY format
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
                    maxLength={3} // Limit CVV to 3 digits
                    placeholder="CVV"
                  />
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCard.name}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 mt-1"
                  placeholder="Enter cardholder name"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <CustomButton onClick={handleAddCard}>
                {isEditing ? "Update Card" : "Add Card"}
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
