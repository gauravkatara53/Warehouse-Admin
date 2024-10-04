import { useState, ChangeEvent, useEffect } from "react";
import CustomButton from "@/Components/Common/button";

import CardList from "./CardList";
import CardModal from "./CardModal";

export default function AddCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
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
  const [cvvMasked, setCvvMasked] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setNewCard({ number: "", expiry: "", cvv: "", name: "" });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "expiry") {
      let expiryValue = value.replace(/\D/g, "");
      if (expiryValue.length > 2) {
        expiryValue = `${expiryValue.slice(0, 2)}/${expiryValue.slice(2, 4)}`;
      }
      setNewCard({ ...newCard, expiry: expiryValue });
    } else if (name === "cvv" && value.length <= 3) {
      setNewCard({ ...newCard, [name]: value });
    } else if (name !== "cvv") {
      setNewCard({ ...newCard, [name]: value });
    }
  };

  useEffect(() => {
    if (newCard.cvv) {
      setCvvMasked("*".repeat(newCard.cvv.length));
    }
  }, [newCard.cvv]);

  const handleAddCard = () => {
    if (!validateExpiry(newCard.expiry)) {
      alert(
        "Invalid expiry date. Please use MM/YY format and make sure it's a future date."
      );
      return;
    }
    if (newCard.number.length === 16) {
      const randomCardType = Math.random() > 0.5 ? "visa" : "mastercard";
      const cardNumberMasked = `**** **** **** ${newCard.number.slice(-4)}`;

      if (isEditing && editIndex !== null) {
        const updatedCards = [...cards];
        updatedCards[editIndex] = {
          ...newCard,
          number: cardNumberMasked,
          type: randomCardType,
        };
        setCards(updatedCards);
      } else {
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

  const validateExpiry = (expiry: string) => {
    const [month, year] = expiry.split("/").map((val) => parseInt(val, 10));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    return (
      month >= 1 &&
      month <= 12 &&
      (year > currentYear || (year === currentYear && month >= currentMonth))
    );
  };

  const handleEditCard = (index: number) => {
    const cardToEdit = cards[index];
    setNewCard({
      number: `**** **** **** ${cardToEdit.number.slice(-4)}`,
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
      <div className="flex justify-between items-center">
        <h2 className="text-md font-medium">Payment Method</h2>
        <CustomButton onClick={toggleModal} className="text-sm -ml-1 -mt-2">
          ADD A NEW CARD
        </CustomButton>
      </div>
      <CardList cards={cards} handleEditCard={handleEditCard} />
      {isModalOpen && (
        <CardModal
          isEditing={isEditing}
          newCard={newCard}
          cvvMasked={cvvMasked}
          handleInputChange={handleInputChange}
          handleAddCard={handleAddCard}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
}
