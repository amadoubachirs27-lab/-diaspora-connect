function CategoryList({ categories, selectedCategory, onSelect }) {
  return (
    <aside className="sidebar">
      {categories.map(cat => (
        <div
          key={cat.id}
          className={`category-item ${selectedCategory?.id === cat.id ? 'active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat.name}
        </div>
      ))}
    </aside>
  )
}

export default CategoryList