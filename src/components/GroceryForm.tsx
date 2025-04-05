import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { GroceryItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface GroceryFormProps {
  onAddItem: (item: GroceryItem) => void;
}

const GroceryForm: React.FC<GroceryFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira o nome do item.",
        variant: "destructive",
      });
      return;
    }

    if (price <= 0) {
      toast({
        title: "Preço inválido",
        description: "O preço deve ser maior que zero.",
        variant: "destructive",
      });
      return;
    }

    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: name.trim(),
      quantity,
      price,
    };

    onAddItem(newItem);
    setName("");
    setQuantity(1);
    setPrice(0);

    toast({
      title: "Item adicionado",
      description: `${name} foi adicionado à sua lista.`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-lg shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Item</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Arroz, Feijão..."
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantidade</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            className="w-full"
            placeholder="0,00"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 flex items-center gap-2"
      >
        <Plus size={18} />
        Adicionar Item
      </Button>
    </form>
  );
};

export default GroceryForm;
