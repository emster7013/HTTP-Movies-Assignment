import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
    title: '',
    director: '',
    metascore: ''
}


const UpdateMovie = props => {
    const [update, setUpdate] = useState(initialItem);

    useEffect(() => {
        if (props.movies) {
        const selectedMovie = props.movies.find(movie => {
            return `${movie.id}` === props.match.params.id
        });
        console.log(selectedMovie);
        if (selectedMovie) {
            setUpdate(selectedMovie)
        }
    }
    }, [props.movies, props.match.params.id]);

    const handleChanges = e => {
        setUpdate({
            ...update, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        axios
            .put(`http://localhost:5000/api/movies/${update.id}`, update)
            .then(res => {
                props.updateMovies(res.data);
            })
            .catch(err => {
                console.log('Update Error: ', err)
            })
    }

    return (
        <div className='formContainer'>
            <form className='formBox' onSubmit={handleSubmit}>
                <input 
                type='text'
                name='title'
                placeholder='Movie Title'
                onChange={handleChanges}
                value={update.title}
                />
                <input 
                type='text'
                name='director'
                placeholder='Director'
                onChange={handleChanges}
                value={update.director}
                />
                <input 
                type='text'
                name='metascore'
                placeholder='MetaScore'
                onChange={handleChanges}
                value={update.metascore}
                />
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie;