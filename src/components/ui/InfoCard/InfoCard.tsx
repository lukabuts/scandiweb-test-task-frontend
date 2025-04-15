import { CardProps } from "../types";

const InfoCard: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`text-gray-500 ${className}`}>
      <p>{children}</p>
    </div>
  );
};

export default InfoCard;
