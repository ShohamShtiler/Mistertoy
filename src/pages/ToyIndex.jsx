import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadToys, setFilter, setSort, removeToy } from '../store/actions/toy.actions.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const isLoading = useSelector(storeState => storeState.toyModule.flag.isLoading)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const sortBy = useSelector(storeState => storeState.toyModule.sortBy)

  const [pageIdx, setPageIdx] = useState(0)
  const [toyLabels, setToyLabels] = useState([])

  useEffect(() => {
    Promise.all([toyService.getToyLabels(), loadToys(pageIdx)])
      .then(([labels]) => setToyLabels(labels))
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Cannot load toys')
      })
  }, [filterBy, sortBy, pageIdx])

  function onSetFilter(newFilter) {
    setFilter(newFilter)
    setPageIdx(0)
  }

  function onSetSort(newSort) {
    setSort(newSort)
    setPageIdx(0)
  }

  function onNextPage(diff) {
    setPageIdx(prevPageIdx => prevPageIdx + diff)
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => showSuccessMsg('Toy removed'))
      .catch(err => {
        console.log('Cannot remove toy', err)
        showErrorMsg('Cannot remove toy')
      })
  }

  return (
    <section className="toy-index main-layout">
      <h1>Toy Store</h1>

      <ToyFilter
        filterBy={filterBy}
        onSetFilter={onSetFilter}
        sortBy={sortBy}
        onSetSort={onSetSort}
        toyLabels={toyLabels}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ToyList toys={toys} onRemoveToy={onRemoveToy} />
          <div className="pagination">
            <button onClick={() => onNextPage(-1)} disabled={pageIdx === 0}>Prev</button>
            <button onClick={() => onNextPage(1)}>Next</button>
          </div>
        </>
      )}
    </section>
  )
}