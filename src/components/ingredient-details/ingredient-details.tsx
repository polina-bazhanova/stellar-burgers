import { FC } from 'react';
import { IngredientDetailsUI, Preloader } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { IngredientsSelector } from '@slices';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log('ID from useParams:', id);

  const ingredients = useSelector(IngredientsSelector.IngredientsDataSelector);
  console.log('Ingredients from store:', ingredients);

  const ingredientData = ingredients.find((item) => item._id === id);
  console.log('Found ingredientData:', ingredientData);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
