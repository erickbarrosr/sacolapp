import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import GroceryForm from "@/components/GroceryForm";
import GroceryItemComponent from "@/components/GroceryItem";
import GrocerySummary from "@/components/GrocerySummary";
import { GroceryItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const STORAGE_KEY = "verde-lista-facil-items";

const Index: React.FC = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const { toast } = useToast();

  // Load items from local storage on component mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error("Error loading saved items:", error);
    }
  }, []);

  // Save items to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving items:", error);
    }
  }, [items]);

  const handleAddItem = (item: GroceryItem) => {
    setItems([...items, item]);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    toast({
      title: "Item removido",
      description: "O item foi removido da sua lista.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center gap-3 justify-center">
            <ShoppingCart size={28} />
            <h1 className="text-2xl font-bold text-center">VaiDá?</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-lg">
        <div className="space-y-6">
          <GroceryForm onAddItem={handleAddItem} />

          {items.length > 0 ? (
            <>
              <div className="space-y-2">
                <h2 className="text-lg font-medium">
                  Itens da Lista ({items.length})
                </h2>
                {items.map((item) => (
                  <GroceryItemComponent
                    key={item.id}
                    item={item}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </div>

              <GrocerySummary items={items} />
            </>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="mx-auto text-neutral/40" size={48} />
              <p className="mt-4 text-gray-500">
                Sua lista está vazia. Adicione itens acima.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-10 py-4 text-center text-sm text-gray-500">
        <p>&copy; 2025 VaiDá?</p>
      </footer>
    </div>
  );
};

export default Index;
