import React from "react";

export default function Category({ setChosenCategory, category, start }) {
  return (
    <>
      {!start.begin && (
        <div>
          <h3 className="category__header__inner">Choose category</h3>
          <select
            className="select"
            onChange={e => setChosenCategory(e.target.value)}
          >
            <option></option>
            {category.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
