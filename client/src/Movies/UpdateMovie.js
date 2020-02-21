import React, {useEffect, useState} from 'react';
import axios from 'axios';

const UpdateMovie = props => {
  const { id } = props.match.params;
  const moviez = {
    title: '',
    director: '',
    metascore: '',
  };
const [updateMovie, setUpdateMovie] = useState(moviez);
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then(res => {
      console.log(res.data);
      setUpdateMovie(res.data);
    });
  }, [id]);

 const handleChange = event => {
    console.log("changes were handled");
    setUpdateMovie({ ...updateMovie, [event.target.name]: event.target.value });
  };


  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
      .then(res => {
        console.log(res);
        setUpdateMovie(moviez);
        props.history.push(`/movies/${id}`);
      })
      .catch(err => {
        console.log("Err");
      });
  };

  return (
    <div>
      <h2>Update</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Director"
          name="director"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Meta-score"
          name="metascore"
          onChange={handleChange}
        />

        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;