import "./Dropdowns.css";
import { useEffect, useState } from "react";
import { getTaskCategory } from "../services/categoryFetcher";

export const CategoryDropdown = ({ setSelectedCategoryId, onChange }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategoriesArray = await getTaskCategory();
        setCategory(allCategoriesArray);
      } catch (error) {
        console.error("Failed to fetch categories.", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);

    if (setSelectedCategoryId) {
      setSelectedCategoryId(categoryId);
    } else if (onChange) {
      onChange(event);
    }
  };

  return (
    <div>
      <select
        className="categories-dropdown"
        onChange={handleCategoryChange}
        name="categoryId"
        defaultValue={0}
      >
        <option value={0} disabled hidden>Select a category</option>
        {category.map((categoryObject) => {
          return (
            <option key={categoryObject.id} value={categoryObject.id}>
              {categoryObject.categoryName}
            </option>
          );
        })}
      </select>
    </div>
  );
};
