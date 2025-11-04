import Image from "next/image";
import { memo } from "react";

interface RecipeCardProps {
  imageURL: string;
  title: string;
  cuisineType: string;
  priority?: boolean;
}

const RecipeCard = memo(({ title, cuisineType, imageURL, priority = false }: RecipeCardProps) => {
  return (
    <div className="shadow-md border border-gray-300 rounded-lg p-3 flex flex-col gap-2 w-full">
      <div className="relative h-48 w-full">
        <Image
          alt={title}
          src={imageURL}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
          className="aspect-3/2 object-cover rounded-lg"
        />
      </div>
      <div className="capitalize font-semibold text-2xl">{title}</div>
      <div className="capitalize text-gray-400">{cuisineType}</div>
    </div>
  );
});

export default RecipeCard;
