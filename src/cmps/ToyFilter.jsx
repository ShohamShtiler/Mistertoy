import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'

import '../assets/style/cmps/ToyFilter.css'

export function ToyFilter({ filterBy, sortBy, onSetFilter, onSetSort, toyLabels }) {
  const [filterState, setFilterState] = useState({ ...filterBy })
  const [sortState, setSortState] = useState({ ...sortBy })

  const debouncedOnSetFilterRef = useRef()

  useEffect(() => {
    debouncedOnSetFilterRef.current = utilService.debounce(onSetFilter, 500)
  }, [])

  useEffect(() => {
    if (debouncedOnSetFilterRef.current) {
      debouncedOnSetFilterRef.current(filterState)
    }
  }, [filterState])

  function handleChange({ target }) {
    const { name, value, type } = target
    let val = type === 'checkbox' ? target.checked : value

    if (name === 'inStock') {
      val = value === 'all' ? null : value === 'true'
    }

    setFilterState(prev => ({ ...prev, [name]: val }))
  }

  function handleLabelsChange(ev) {
    const options = [...ev.target.selectedOptions].map(opt => opt.value)
    setFilterState(prev => ({ ...prev, labels: options }))
  }

  function handleSortChange(ev) {
    const [type, desc] = ev.target.value.split('|')
    const newSort = { type, desc: +desc }
    setSortState(newSort)
    onSetSort(newSort)
  }

  return (
    <section className="toy-filter">
      <h3>Filter Toys</h3>

      <input
        type="text"
        name="txt"
        placeholder="Search by name..."
        value={filterState.txt}
        onChange={handleChange}
      />

      <select name="inStock" onChange={handleChange} value={filterState.inStock === null ? 'all' : filterState.inStock}>
        <option value="all">All</option>
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>

      <select multiple name="labels" value={filterState.labels} onChange={handleLabelsChange}>
        {toyLabels.map(label => (
          <option key={label} value={label}>{label}</option>
        ))}
      </select>

      <select value={`${sortState.type}|${sortState.desc}`} onChange={handleSortChange}>
        <option value="name|1">Name ↑</option>
        <option value="name|-1">Name ↓</option>
        <option value="price|1">Price ↑</option>
        <option value="price|-1">Price ↓</option>
        <option value="createdAt|1">Created ↑</option>
        <option value="createdAt|-1">Created ↓</option>
      </select>
    </section>
  )
}