import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'
import L from 'leaflet'
import { BranchMapUpdater } from './BranchMapUpdater'



const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

export function BranchMap() {
    const [branches, setBranches] = useState([
        { name: 'Tel Aviv', position: [32.0853, 34.7818] },
        { name: 'Jerusalem', position: [31.7683, 35.2137] },
        { name: 'Haifa', position: [32.794, 34.9896] },
    ])

    const [center, setCenter] = useState(branches[0].position)

    const [newBranch, setNewBranch] = useState({
        name: '',
        lat: '',
        lng: ''
    })

    function handleAddBranch(e) {
        e.preventDefault()
        const newMarker = {
            name: newBranch.name,
            position: [parseFloat(newBranch.lat), parseFloat(newBranch.lng)]
        }
        setBranches(prev => [...prev, newMarker])
        setCenter(newMarker.position)
        setNewBranch({ name: '', lat: '', lng: '' })
    }
    

    return (
        <section className="branch-map">
            <MapContainer center={center} zoom={10} style={{ height: '400px', width: '100%' }}>
                <BranchMapUpdater center={center} />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {branches.map(branch => (
                    <Marker key={branch.name} position={branch.position} icon={defaultIcon}>
                        <Popup>{branch.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div className="branch-buttons">
                {branches.map(branch => (
                    <button key={branch.name} onClick={() => setCenter(branch.position)}>
                        {branch.name}
                    </button>
                ))}
            </div>

            <form className="add-branch-form" onSubmit={handleAddBranch}>
                <input
                    type="text"
                    placeholder="New location"
                    value={newBranch.name}
                    onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    step="any"
                    placeholder="Latitude"
                    value={newBranch.lat}
                    onChange={(e) => setNewBranch({ ...newBranch, lat: e.target.value })}
                    required
                />
                <input
                    type="number"
                    step="any"
                    placeholder="Longitude"
                    value={newBranch.lng}
                    onChange={(e) => setNewBranch({ ...newBranch, lng: e.target.value })}
                    required
                />
                <button type="submit">Add Location</button>
            </form>
        </section>
    )
}