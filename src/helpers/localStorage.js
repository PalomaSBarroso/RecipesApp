export const LocalStorage = (
  currentFavoriteRecipe,
  id,
  setIsFavorite,
) => {
  const obj = {
    alcoholicOrNot: currentFavoriteRecipe.strAlcoholic || '',
    id: currentFavoriteRecipe.idMeal || currentFavoriteRecipe.idDrink,
    type: currentFavoriteRecipe.strAlcoholic ? 'drink' : 'meal',
    name: currentFavoriteRecipe.strMeal || currentFavoriteRecipe.strDrink,
    nationality: currentFavoriteRecipe.strArea || '',
    category: currentFavoriteRecipe.strCategory,
    image: currentFavoriteRecipe.strMealThumb || currentFavoriteRecipe.strDrinkThumb,
  };
  const localFavoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const localDuplicateId = localFavoritesRecipes
    ?.some((el) => (el.id === id));
  if (localFavoritesRecipes && localDuplicateId) {
    if (localFavoritesRecipes.some((el) => el.id === id)) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(localFavoritesRecipes.filter((el) => el.id !== id)));
      setIsFavorite(false);
      return;
    }
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(localFavoritesRecipes.filter((el) => el.id !== id)));
    setIsFavorite(false);
    return;
  }
  if (!localFavoritesRecipes) {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([obj]));
    setIsFavorite(true);
  }
  if (localFavoritesRecipes !== null) {
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...localFavoritesRecipes, obj]));
    setIsFavorite(true);
  }
};

export const LocalRecipesInProgress = (checked, targetId, id) => {
  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (checked) {
    if (recipeInProgress === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([{ targetId, id }]));
    }
    if (recipeInProgress) {
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify([...recipeInProgress, { targetId, id }]));
    }
  } else {
    const newEl = recipeInProgress.filter((el) => el.id === id);
    localStorage
      .setItem('inProgressRecipes', JSON
        .stringify(newEl.filter((el) => el.targetId !== targetId)));
  }
};

export const LocalRecipesDone = (pathname, id) => {
  const recipeDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const recipeInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipe = recipeInProgress?.filter((el) => el.id === id);
  const obj = {
    id,
    type: pathname,
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: recipe[0].name,
    image: recipe[0].image,
    doneDate: new Date().toLocaleDateString(),
    tags: [],
  };
  if (recipeDone === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([obj]));
  }
  if (recipeDone) {
    localStorage.setItem('doneRecipes', JSON.stringify([...recipeDone, obj]));
  }
};
