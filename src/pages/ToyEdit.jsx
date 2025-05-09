import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from '@mui/material'

import { toyService } from '../services/toy.service.js'
import { saveToy } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

// Yup validation schema
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    price: yup
        .number()
        .typeError('Price must be a number')
        .positive('Price must be positive')
        .required('Price is required'),
    labels: yup.array().min(1, 'Pick at least one label'),
})

export function ToyEdit() {
    const [labels, setLabels] = useState([])

    const { toyId } = useParams()
    const navigate = useNavigate()

    const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: toyService.getEmptyToy()
    })

    const selectedLabels = watch('labels') || []

    useEffect(() => {
        loadToyLabels()
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => reset(toy)) // pre-fill form
            .catch(err => {
                console.error('Toy not found:', err)
                showErrorMsg('Toy not found!')
                navigate('/toy')
            })
    }

    function loadToyLabels() {
        toyService.getToyLabels()
            .then(setLabels)
            .catch(() => {
                showErrorMsg('Cannot load labels')
                navigate('/toy')
            })
    }

    function onSubmit(toy) {
        saveToy(toy)
            .then(savedToy => {
                showSuccessMsg(`Toy ${savedToy._id} saved successfully`)
                navigate('/toy')
            })
            .catch(() => showErrorMsg('Cannot save toy'))
    }

    return (
        <section className="toy-edit">
            <h2>{toyId ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input id="name" {...register('name')} />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input id="price" type="number" {...register('price')} />
                    {errors.price && <p className="error">{errors.price.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="labels">Labels:</label>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="labels-select-label">Labels</InputLabel>
                        <Select
                            labelId="labels-select-label"
                            id="labels"
                            label="Labels"
                            multiple
                            {...register('labels')}
                            renderValue={(selected) => selected.join(', ')}
                            defaultValue={[]}
                        >
                            {labels.map((label) => (
                                <MenuItem key={label} value={label}>
                                    <Checkbox checked={selectedLabels.includes(label)} />
                                    <ListItemText primary={label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {errors.labels && <p className="error">{errors.labels.message}</p>}
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input type="checkbox" {...register('inStock')} />
                        In Stock
                    </label>
                </div>

                <button type="submit">{toyId ? 'Update Toy' : 'Add Toy'}</button>
            </form>
        </section>
    )
}