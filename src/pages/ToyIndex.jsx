import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadToys, setFilter, setSort, removeToy } from '../store/actions/toy.actions.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useDispatch } from 'react-redux'

import Lottie from 'lottie-react'
import DetailsAnimation from '../assets/style/animations/DetailsAnimation.json'



export function ToyIndex() {
  const dispatch = useDispatch()

  const maxPage = useSelector(storeState => storeState.toyModule.maxPage)
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const isLoading = useSelector(storeState => storeState.toyModule.flag.isLoading)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const sortBy = useSelector(storeState => storeState.toyModule.sortBy)

  const [pageIdx, setPageIdx] = useState(0)
  const [toyLabels, setToyLabels] = useState([])

  // console.log('🧪 sortBy sending to backend:', sortBy)

  useEffect(() => {
    Promise.all([
      toyService.getToyLabels(),
      dispatch(loadToys(pageIdx)) // ← dispatch it!
    ])
      .then(([labels]) => setToyLabels(labels))
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Cannot load toys')
      })
  }, [filterBy, sortBy, pageIdx])

  function onSetFilter(newFilter) {
    dispatch(setFilter(newFilter))
    setPageIdx(0)
  }

  function onSetSort(newSort) {
    dispatch(setSort(newSort)) // ✅ dispatch the Redux action!
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

  // console.log('toys:', toys)
  // console.log('typeof toys:', typeof toys, '| value:', toys)

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
            <button onClick={() => onNextPage(1)} disabled={pageIdx >= maxPage - 1}>Next</button>
            {!toys.length && <p>No toys to show</p>}
          </div>
        </>
      )}

      <Lottie animationData={DetailsAnimation} loop={true} style={{ height: 200 }} />


    </section>
  )
}