import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons";
import MastercardIcon from "@/assets/mastercard.svg";

interface CardListProps {
  cards: Array<{
    type: string;
    number: string;
    expiry: string;
    cvv: string;
    name: string;
  }>;
  handleEditCard: (index: number) => void;
}

export default function CardList({ cards, handleEditCard }: CardListProps) {
  return (
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
  );
}
