import React from "react";
import { Trash2 } from "lucide-react";
import { GroceryItem } from "@/types";

interface GroceryItemProps {
  item: GroceryItem;
  onDelete: (id: string) => void;
}

const GroceryItemComponent: React.FC<GroceryItemProps> = ({
  item,
  onDelete,
}) => {
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm">
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-primary font-medium">
          {formatCurrency(item.price * item.quantity)}
        </p>
        <button
          onClick={() => onDelete(item.id)}
          className="p-1 text-neutral hover:text-red-500 transition-colors"
          aria-label="Remover item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default GroceryItemComponent;
