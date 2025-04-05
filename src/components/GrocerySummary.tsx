import React from "react";
import { GroceryItem } from "@/types";

interface GrocerySummaryProps {
  items: GroceryItem[];
}

const GrocerySummary: React.FC<GrocerySummaryProps> = ({ items }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-2">Resumo</h2>
      <div className="flex justify-between py-2 border-b border-gray-100">
        <span className="text-gray-600">Total de Itens</span>
        <span className="font-medium">{totalItems}</span>
      </div>
      <div className="flex justify-between py-2">
        <span className="text-gray-600">Valor Total</span>
        <span className="text-xl font-bold text-primary">
          {formatCurrency(totalPrice)}
        </span>
      </div>
    </div>
  );
};

export default GrocerySummary;
