import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css'
import { FcClapperboard } from "react-icons/fc";
import { FcFilm } from "react-icons/fc";
import { MdWatchLater } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import ListCustomerComponent from './components/ListCustomerComponent';
import axios from "axios";


class Put extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            review_id: "",
            consumer_review: "",
            updatedAt: null,
        }
    }
    reviewIdChange = (e) => {
        this.setState({
            review_id: e.target.value,
        })
    }
    consumerReviewChange = (e) => {
        this.setState({
            consumer_review: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        axios.put("http://localhost:8080/home/Review/Update/" + this.state.review_id + "?consumer_review=" + this.state.consumer_review)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }
    render() {
        const { errorMessage } = this.state;
        return(
            <div className="post">
                <form className="post" onSubmit={this.handleSubmit}>
                    <input className="reviewIdBox" placeholder="Review ID"
                    value={this.state.review_id}
                    onChange={this.reviewIdChange}
                    required />
                    <input
                    className="postBoxReview"
                    placeholder="Post Review here..."
                    value={this.state.consumer_review}
                    onChange={this.consumerReviewChange}
                    required
                    />
                    <button className="updateButton"type="submit">UPDATE</button>
                    
            </form>

            </div>
        )
    }

}


class Delete extends React.Component{
    state = {
        review_id: "",
    }
    handleChange = (e) => {
        this.setState({review_id: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault();

        axios.delete(`http://localhost:8080/home/Review/Delete/${this.state.review_id}`
        )
        .then((response) => {
            console.log(response)
            console.log(response.data)
        })
    }
    render(){
        return (
            <div className="post">
                <form className="post" onSubmit={this.handleSubmit}>
                    <input className="reviewIdBox" placeholder="Review ID" onChange={this.handleChange} />
                    <button className="deleteButton" type="submit">DELETE</button>
                </form>
            </div>
        );
    }
}


class Post extends React.Component {
    state = {
        review_id: "",
        consumer_review: "",
    }

    filmIdChange = (e) => {
        this.setState({
            film_id: e.target.value,
        })
    }

    consumerReviewChange = (e) => {
        this.setState({
            consumer_review: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/home/Review/Add/?film_id=" + this.state.film_id + "&consumer_review="  + this.state.consumer_review)
    
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
    }
    render() {
        return (
            <div className="post">
                <form className="post" onSubmit={this.handleSubmit}>
                    <input className="postBoxFilmId" placeholder="Film ID"
                    value={this.state.film_id}
                    onChange={this.filmIdChange}
                        required />
    
                    <input className="postBoxReview" placeholder="Post Review here..."
                    value={this.state.consumer_review}
                    onChange={this.consumerReviewChange}
                    required/>
                    
                    <button className="postButton" onSubmit={this.handleSubmit} type="submit">POST</button>
                </form>
                <br></br>

            </div>
        )
    }
}


class MovieRow extends React.Component{
    render(){
        const movieData = this.props.filmInformation;
       
        return(
            <tr>
            <td>{movieData.film_id + ": " + movieData.title}</td>
            <td>{movieData.description}</td>
            <td>{movieData.rental_rate}</td>
                <td>{movieData.length}</td>
                <td>{movieData.reviews.map((filmReview) => (
                    <div className="reviews">
                        {filmReview.review_id + ": " + filmReview.consumer_review}<br></br>
                    </div>
                ))}</td>
                <td> <p className="filmDataBottom">
            {" "}
            {movieData.actors.map((filmActor) => (
              <div>
                <ul>
                  {filmActor.first_name + " " + filmActor.last_name}
                </ul>
              </div>
            ))}
          </p></td>
               
                
        </tr>
        )
    }
}


class MovieTable extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            totalMovies: []
        }
    }
    
    componentDidMount() {  
            axios.get('http://localhost:8080/home/AllFilm')
                .then (response => this.setState({totalMovies: response.data}))
        
    }

    render() {
        const film = this.state.totalMovies;
        const filterText = this.props.filterText.toLowerCase();

        const rows = [];

        this.state.totalMovies.forEach((film) => {
            console.log(film);
            if (film.title.toLowerCase().indexOf(filterText) === -1) {
                return;
            }
            rows.push(<MovieRow filmInformation={film} key={film.title}/>)
        })
        
        return (
            <table className='filmTable'>
                <thead className='tableHeadings'>
                    <tr>
                        <th>Title <FcFilm/> </th>
                        <th>Description</th>
                        <th>Rental Price <MdAttachMoney/></th>
                        <th>Length <MdWatchLater/> </th>
                        <th>Review</th>
                        <th>Actors <MdPerson/></th>
                    </tr>
                </thead>
                 <tbody>{rows}</tbody> 
            </table>
        )
    }
}


class SearchBar extends React.Component{
    render(){
        const filterText = this.props.filterText;
        return(
            <form>
                <input
                    className='searchInput'
                    type="text"
                    placeholder="Search film title......."
                    value={filterText}
                    onChange={(e) => this.props.onFilterTextChange(e.target.value)} 
                    />
                
                    Choose category: <select
                        name="category"
                        id="category">
                        <option value="" selected="selected">Category</option>
                        <option value="" selected="selected">Action</option>
                        <option value="" selected="selected">Comedy</option>
                        <option value="" selected="selected">Drama</option>
                        <option value="" selected="selected">Documentary</option>
                        <option value="" selected="selected">Sports</option>
                        <option value="" selected="selected">Romance</option> 
                    </select>
                    
                    {/* <input type="checkbox" checked={inStockOnly} 
                        onChange={(e) => this.props.onInStockChange(e.target.checked)}
                  />
                  only show films in stock  */}
                  
                 
            </form>
        )
    }
}

class NavigationBar extends React.Component {
    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">BLOCKBUSTER <FcClapperboard/> </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li class="nav-item">
                                <a className="nav-link" href="#">Reviews</a>
                            </li>
                            <li class="nav-item">
                                <a className="nav-link" href="#">Customer</a>
                            </li>
                        </ul>
                        <span className='navbar-text'>
                            THE NUMBER <span className="one">ONE</span> MOVIE DATABASE
                        </span>
                    </div>
                </div>
            </nav>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            
            
        
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        
    }


    handleFilterTextChange(FT) {
        this.setState({
            filterText: FT
        })
    }
    
    
    render() {
            return (
                <div>
                    <NavigationBar />
                    <SearchBar filterText={this.state.filterText}
                        onFilterTextChange={this.handleFilterTextChange}
                        
                    />
                    <br></br>
                    <Post />
                    <Delete />
                    <br></br>
                    <Put />
                     
                    <MovieTable
                        films={this.props.films}
                        filterText={this.state.filterText}
                    />
                    {/* <div><ListCustomerComponent /></div> */}
                    {/* <MovieTable films={this.props.films}
                        filterText={this.state.filterText}
                        inStockOnly={this.state.inStockOnly}
                    /> */}
                </div>
            );
        }
    }


const FILMS = [
    {
        "film_id": 1, "title": "ACADEMY DINOSAUR", "description": "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
        "release_year": 2006, "rental_duration": 6, "rental_rate": 0.99, "length": 86, "replacement_cost": 20.99, "rating": "PG"
    },
    {
        "film_id": 2, "title": "ACE GOLDFINGER", "description": "A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China",
        "release_year": 2006, "rental_duration": 3, "rental_rate": 4.99, "length": 48, "replacement_cost": 12.99, "rating": "G"
    },
    {
        "film_id": 3, "title": "ADAPTATION HOLES", "description": "A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon Factory",
        "release_year": 2006, "rental_duration": 7, "rental_rate": 2.99, "length": 50, "replacement_cost": 18.99, "rating": "NC-17"
    },
    {
        "film_id": 4, "title": "AFFAIR PREJUDICE", "description": "A Fanciful Documentary of a Frisbee And a Lumberjack who must Chase a Monkey in A Shark Tank",
        "release_year": 2006, "rental_duration": 5, "rental_rate": 2.99, "length": 117, "replacement_cost": 26.99, "rating": "G"
    },
    {
        "film_id": 5, "title": "AFRICAN EGG", "description": "A Fast-Paced Documentary of a Pastry Chef And a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico",
        "release_year": 2006, "rental_duration": 6, "rental_rate": 2.99, "length": 130, "replacement_cost": 22.99, "rating": "G"
    },
    {
        "film_id": 6, "title": "AGENT TRUMAN", "description": "A Intrepid Panorama of a Robot And a Boy who must Escape a Sumo Wrestler in Ancient China",
        "release_year": 2006, "rental_duration": 3, "rental_rate": 2.99, "length": 169, "replacement_cost": 17.99, "rating": "PG"
    },
    {
        "film_id": 7, "title": "AIRPLANE SIERRA", "description": "A Touching Saga of a Hunter And a Butler who must Discover a Butler in A Jet Boat",
        "release_year": 2006, "rental_duration": 6, "rental_rate": 4.99, "length": 62, "replacement_cost": 28.99, "rating": "PG-13"
    },
    {
        "film_id": 8, "title": "AIRPORT POLLOCK", "description": "A Epic Tale of a Moose And a Girl who must Confront a Monkey in Ancient India",
        "release_year": 2006, "rental_duration": 6, "rental_rate": 4.99, "length": 54, "replacement_cost": 15.99, "rating": "R"
    },
]


ReactDOM.render(
    <App films = {FILMS}/>,
    document.getElementById('root')
  );