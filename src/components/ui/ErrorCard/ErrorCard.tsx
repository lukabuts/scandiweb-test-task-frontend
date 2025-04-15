import { CardProps } from "../types";

const ErrorCard: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`text-red-600 ${className || ""}`}>
      <p>{children}</p>
    </div>
  );
};

export default ErrorCard;
